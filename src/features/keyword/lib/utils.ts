import type { Suggestion } from "./types";

export const getIntentColor = (intent?: string) => {
  switch (intent?.toLowerCase()) {
    case "informational":
      return "bg-blue-100 text-blue-800";
    case "commercial":
      return "bg-green-100 text-green-800";
    case "transactional":
      return "bg-purple-100 text-purple-800";
    case "navigational":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getDifficultyColor = (difficulty?: number) => {
  if (!difficulty) return "bg-gray-100 text-gray-800";
  if (difficulty <= 30) return "bg-green-100 text-green-800";
  if (difficulty <= 60) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

export const copyKeywordsToClipboard = (suggestions: Suggestion[]) => {
  const keywordsText = suggestions.map((s) => s.keyword).join("\n");
  navigator.clipboard.writeText(keywordsText);
};

export const exportKeywordsToCSV = (
  suggestions: Suggestion[],
  siteName?: string,
) => {
  const headers = [
    "Keyword",
    "Search Volume",
    "Difficulty",
    "Intent",
    "Title Idea",
  ];
  const csvContent = [
    headers.join(","),
    ...suggestions.map((s) =>
      [
        `"${s.keyword}"`,
        s.volume,
        s.difficulty,
        s.intent,
        `"${s.titleIdea}"`,
      ].join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `keywords-${siteName || "website"}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
