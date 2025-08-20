import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  keyword_generations: defineTable({
    url: v.string(),
    suggestions: v.array(
      v.object({
        keyword: v.string(),
        intent: v.string(),
        titleIdea: v.string(),
        difficulty: v.number(),
        volume: v.number(),
      }),
    ),
  }).index("by_url", ["url"]),
});
