import type { SearchItem } from "./search-index";

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchSiteContent(
  items: SearchItem[],
  query: string
) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const queryWords = normalizedQuery
    .split(" ")
    .filter(Boolean);

  return items
    .map((item) => {
      const searchableText = normalizeText(
        [
          item.title,
          item.description || "",
          ...(item.keywords || []),
        ].join(" ")
      );

      let score = 0;

      if (searchableText.includes(normalizedQuery)) {
        score += 100;
      }

      if (
        normalizeText(item.title).includes(
          normalizedQuery
        )
      ) {
        score += 50;
      }

      for (const word of queryWords) {
        if (searchableText.includes(word)) {
          score += 10;
        }
      }

      return {
        item,
        score,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}
