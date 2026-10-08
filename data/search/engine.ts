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

function levenshtein(
  a: string,
  b: string
): number {
  if (a === b) return 0;

  if (!a.length) return b.length;
  if (!b.length) return a.length;

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

  const distance = levenshtein(a, b);

  return (
    1 -
    distance /
      Math.max(a.length, b.length)
  );
}

function getDocumentText(
  document: SearchDocument
): string {
  return [
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
}

function getScore(
  document: SearchDocument,
  query: string
): {
  score: number;
  matchType: SearchResult["matchType"];
} {
  const normalizedQuery =
    normalizeSearchText(query);

  const queryCompact =
    compactSearchText(query);

  const documentText =
    getDocumentText(document);

  const normalizedDocument =
    normalizeSearchText(documentText);

  const compactDocument =
    compactSearchText(documentText);

  // -------------------------
  // EXACT
  // -------------------------

  if (
    normalizeSearchText(
      document.title
    ) === normalizedQuery
  ) {
    return {
      score: 1000,
      matchType: "exact",
    };
  }

  if (
    normalizedDocument ===
    normalizedQuery
  ) {
    return {
      score: 980,
      matchType: "exact",
    };
  }

  if (
    queryCompact &&
    compactDocument.includes(queryCompact)
  ) {
    return {
      score: 950,
      matchType: "exact",
    };
  }

  // -------------------------
  // STRONG
  // -------------------------

  const normalizedTitle =
    normalizeSearchText(document.title);

  if (
    normalizedTitle.includes(
      normalizedQuery
    )
  ) {
    return {
      score: 900,
      matchType: "strong",
    };
  }

  if (
    containsNormalizedText(
      document.text,
      query
    )
  ) {
    return {
      score: 850,
      matchType: "strong",
    };
  }

  const queryTokens =
    tokenizeSearchText(query);

  const documentTokens =
    tokenizeSearchText(documentText);

  let matchedTokens = 0;

  for (const queryToken of queryTokens) {
    if (
      documentTokens.some((token) =>
        token.includes(queryToken)
      )
    ) {
      matchedTokens++;
    }
  }

  if (
    queryTokens.length > 0 &&
    matchedTokens > 0
  ) {
    const ratio =
      matchedTokens /
      queryTokens.length;

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

  // -------------------------
  // SIMILAR / FUZZY
  // -------------------------

  const compactTokens =
    tokenizeSearchText(query);

  let bestSimilarity = 0;

  for (const queryToken of compactTokens) {
    if (queryToken.length < 3) {
      continue;
    }

    for (const documentToken of documentTokens) {
      if (documentToken.length < 3) {
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

  const results: SearchResult[] = [];

  for (const document of documents) {
    const result = getScore(
      document,
      trimmed
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
    if (
      a.matchType !== b.matchType
    ) {
      const order = {
        exact: 0,
        strong: 1,
        similar: 2,
      };

      return (
        order[a.matchType] -
        order[b.matchType]
      );
    }

    return b.score - a.score;
  });

  return results;
}
