import {
  compactSearchText,
  containsNormalizedText,
  normalizeSearchText,
  tokenizeSearchText,
} from "./normalize";

import type {
  SearchDocument,
  SearchResult,
} from "./types";

type PreparedDocument = {
  document: SearchDocument;
  normalizedTitle: string;
  normalizedText: string;
  compactText: string;
  tokens: string[];
};

const preparedCache = new WeakMap<
  SearchDocument,
  PreparedDocument
>();

function prepareDocument(
  document: SearchDocument
): PreparedDocument {
  const cached = preparedCache.get(document);

  if (cached) {
    return cached;
  }

  const text = [
    document.title,
    document.text,
    document.arabic,
    document.urdu,
    document.hindi,
    document.english,
    document.roman,
    document.surahNumber?.toString(),
    document.ayahNumber?.toString(),
    document.day?.toString(),
  ]
    .filter(Boolean)
    .join(" ");

  const prepared: PreparedDocument = {
    document,
    normalizedTitle: normalizeSearchText(
      document.title
    ),
    normalizedText: normalizeSearchText(text),
    compactText: compactSearchText(text),
    tokens: tokenizeSearchText(text),
  };

  preparedCache.set(document, prepared);

  return prepared;
}

function levenshtein(
  a: string,
  b: string
): number {
  if (a === b) return 0;

  if (!a.length) return b.length;
  if (!b.length) return a.length;

  // Avoid expensive calculations for very different lengths.
  if (Math.abs(a.length - b.length) > 3) {
    return Math.max(a.length, b.length);
  }

  let previous = Array.from(
    { length: b.length + 1 },
    (_, i) => i
  );

  for (let i = 1; i <= a.length; i++) {
    const current = [i];

    for (let j = 1; j <= b.length; j++) {
      const cost =
        a[i - 1] === b[j - 1] ? 0 : 1;

      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost
      );
    }

    previous = current;
  }

  return previous[b.length];
}

function similarity(
  a: string,
  b: string
): number {
  if (!a || !b) return 0;

  if (a === b) return 1;

  if (Math.abs(a.length - b.length) > 3) {
    return 0;
  }

  const distance = levenshtein(a, b);

  return (
    1 -
    distance / Math.max(a.length, b.length)
  );
}

function getScore(
  prepared: PreparedDocument,
  normalizedQuery: string,
  queryCompact: string,
  queryTokens: string[]
): {
  score: number;
  matchType: SearchResult["matchType"];
} {
  const {
    document,
    normalizedTitle,
    normalizedText,
    compactText,
    tokens,
  } = prepared;

  // Exact title match.
  if (normalizedTitle === normalizedQuery) {
    return {
      score: 1000,
      matchType: "exact",
    };
  }

  // Exact full-text match.
  if (normalizedText === normalizedQuery) {
    return {
      score: 980,
      matchType: "exact",
    };
  }

  // Match text without spaces.
  if (
    queryCompact &&
    compactText.includes(queryCompact)
  ) {
    return {
      score: 950,
      matchType: "exact",
    };
  }

  // Strong title match.
  if (
    normalizedTitle.includes(normalizedQuery)
  ) {
    return {
      score: 900,
      matchType: "strong",
    };
  }

  // Strong text match.
  if (
    containsNormalizedText(
      document.text,
      normalizedQuery
    )
  ) {
    return {
      score: 850,
      matchType: "strong",
    };
  }

  // Token matching.
  let matchedTokens = 0;

  for (const queryToken of queryTokens) {
    if (
      tokens.some((token) =>
        token.includes(queryToken)
      )
    ) {
      matchedTokens++;
    }
  }

  if (queryTokens.length > 0 && matchedTokens > 0) {
    const ratio =
      matchedTokens / queryTokens.length;

    if (ratio >= 0.75) {
      return {
        score: 750 + ratio * 50,
        matchType: "strong",
      };
    }

    if (ratio >= 0.5) {
      return {
        score: 650 + ratio * 50,
        matchType: "strong",
      };
    }
  }

  // Fuzzy matching is reserved for unmatched documents.
  // This keeps expensive comparisons out of common matches.
  let bestSimilarity = 0;

  for (const queryToken of queryTokens) {
    if (queryToken.length < 4) continue;

    for (const documentToken of tokens) {
      if (documentToken.length < 4) continue;

      // Ignore comparisons with substantially different lengths.
      if (
        Math.abs(
          queryToken.length - documentToken.length
        ) > 2
      ) {
        continue;
      }

      const value = similarity(
        queryToken,
        documentToken
      );

      if (value > bestSimilarity) {
        bestSimilarity = value;
      }

      if (bestSimilarity >= 0.9) {
        break;
      }
    }

    if (bestSimilarity >= 0.9) {
      break;
    }
  }

  if (bestSimilarity >= 0.65) {
    return {
      score: 400 + bestSimilarity * 100,
      matchType: "similar",
    };
  }

  return {
    score: 0,
    matchType: "similar",
  };
}

export function searchContent(
  documents: SearchDocument[],
  query: string
): SearchResult[] {
  const trimmed = query.trim();

  if (!trimmed) {
    return [];
  }

  const normalizedQuery =
    normalizeSearchText(trimmed);

  const queryCompact =
    compactSearchText(trimmed);

  const queryTokens =
    tokenizeSearchText(trimmed);

  if (!normalizedQuery) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const document of documents) {
    const prepared = prepareDocument(document);

    const result = getScore(
      prepared,
      normalizedQuery,
      queryCompact,
      queryTokens
    );

    if (result.score > 0) {
      results.push({
        document,
        score: result.score,
        matchType: result.matchType,
      });
    }
  }

    results.sort((a, b) => {
    if (a.matchType !== b.matchType) {
      const order = {
        exact: 0,
        strong: 1,
        similar: 2,
      };

      return order[a.matchType] - order[b.matchType];
    }

    return b.score - a.score;
  });

  // Qur'an ke alag-alag Ayah results ko alag rakho.
  // Baaki content mein ek hi page ke duplicate results hatao.
  const uniqueResults: SearchResult[] = [];
  const seen = new Set<string>();

  for (const result of results) {
    const document = result.document;

    const uniqueKey =
      document.type === "quran"
        ? `quran:${document.id}`
        : `${document.type}:${document.href}`;

    if (seen.has(uniqueKey)) {
      continue;
    }

    seen.add(uniqueKey);
    uniqueResults.push(result);
  }

  return uniqueResults;
}
