import {
compactSearchText,
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

const preparedCache = new WeakMap<SearchDocument, PreparedDocument>();

function prepareDocument(document: SearchDocument): PreparedDocument {
const cached = preparedCache.get(document);
if (cached) return cached;

const text = [
document.title,
document.text,
document.arabic,
document.urdu,
document.hindi,
document.english,
document.roman,
document.keywords?.join(" "),
document.surahNumber?.toString(),
document.ayahNumber?.toString(),
document.day?.toString(),
]
.filter(Boolean)
.join(" ");

const prepared: PreparedDocument = {
document,
normalizedTitle: normalizeSearchText(document.title),
normalizedText: normalizeSearchText(text),
compactText: compactSearchText(text),
tokens: tokenizeSearchText(text),
};

preparedCache.set(document, prepared);
return prepared;
}

function levenshtein(a: string, b: string): number {
if (a === b) return 0;
if (!a.length) return b.length;
if (!b.length) return a.length;

if (Math.abs(a.length - b.length) > 3) {
return Math.max(a.length, b.length);
}

let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

for (let i = 1; i <= a.length; i++) {
const current = [i];

for (let j = 1; j <= b.length; j++) {
  const cost = a[i - 1] === b[j - 1] ? 0 : 1;

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

function getScore(
prepared: PreparedDocument,
query: string,
compactQuery: string,
queryTokens: string[]
): { score: number; matchType: SearchResult["matchType"] } {
const {
normalizedTitle,
normalizedText,
compactText,
tokens,
} = prepared;

if (normalizedTitle === query) {
return { score: 1000, matchType: "exact" };
}

if (normalizedText === query) {
return { score: 980, matchType: "exact" };
}

if (compactQuery && compactText.includes(compactQuery)) {
return { score: 950, matchType: "exact" };
}

if (normalizedTitle.includes(query)) {
return { score: 900, matchType: "strong" };
}

if (normalizedText.includes(query)) {
return { score: 850, matchType: "strong" };
}

let matchedTokens = 0;

for (const queryToken of queryTokens) {
if (tokens.some((token) => token.includes(queryToken))) {
matchedTokens++;
}
}

if (queryTokens.length && matchedTokens) {
const ratio = matchedTokens / queryTokens.length;

if (ratio >= 0.75) {
  return { score: 750 + ratio * 50, matchType: "strong" };
}

if (ratio >= 0.5) {
  return { score: 650 + ratio * 50, matchType: "strong" };
}

}

let bestSimilarity = 0;

for (const queryToken of queryTokens) {
if (queryToken.length < 4) continue;

for (const token of tokens) {
  if (token.length < 4) continue;
  if (Math.abs(queryToken.length - token.length) > 2) continue;

  const distance = levenshtein(queryToken, token);
  const similarity =
    1 - distance / Math.max(queryToken.length, token.length);

  bestSimilarity = Math.max(bestSimilarity, similarity);
}

}

if (bestSimilarity >= 0.65) {
return {
score: 400 + bestSimilarity * 100,
matchType: "similar",
};
}

return { score: 0, matchType: "similar" };
}

function getUniqueKey(document: SearchDocument): string {
if (document.type === "quran") {
return "quran:${document.surahNumber ?? document.title}";
}

const normalizedTitle = compactSearchText(document.title);

const normalizedHref = document.href
.split("#")[0]
.split("?")[0]
.replace(/\/+$/, "")
.toLowerCase();

return `${document.type}:${normalizedHref || normalizedTitle}`;
}

export function searchContent(
documents: SearchDocument[],
query: string
): SearchResult[] {
const trimmed = query.trim();
if (!trimmed) return [];

const normalizedQuery = normalizeSearchText(trimmed);
const compactQuery = compactSearchText(trimmed);
const queryTokens = tokenizeSearchText(trimmed);

if (!normalizedQuery) return [];

const results: SearchResult[] = [];

for (const document of documents) {
const result = getScore(
prepareDocument(document),
normalizedQuery,
compactQuery,
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

results.sort((a, b) => b.score - a.score);

const uniqueResults: SearchResult[] = [];
const seen = new Set<string>();

for (const result of results) {
const key = getUniqueKey(result.document);

if (seen.has(key)) continue;

seen.add(key);
uniqueResults.push(result);

}

return uniqueResults;
}
