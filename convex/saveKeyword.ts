import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByUrl = query({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("keyword_generations")
      .withIndex("by_url", (q) => q.eq("url", args.url))
      .order("desc")
      .first();
    return doc;
  },
});

export const save = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("keyword_generations", {
      ...args,
    });
  },
});
