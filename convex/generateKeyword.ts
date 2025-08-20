"use node";

import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { Hyperbrowser } from "@hyperbrowser/sdk";
import * as z from "zod";

const client = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY!,
});

type KeywordResponse = {
  suggestions: Array<{
    keyword: string;
    intent: string;
    titleIdea: string;
    difficulty: number;
    volume: number;
  }>;
};

export const blogKeywords = action({
  args: { url: v.string() },
  handler: async (ctx, args): Promise<KeywordResponse> => {
    try {
      // Keep the user-provided URL; only ensure protocol (no www stripping)
      let inputUrl = args.url.trim();
      if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
        inputUrl = `https://${inputUrl}`;
      }
      if (inputUrl.endsWith("/")) {
        inputUrl = inputUrl.slice(0, -1);
      }

      // Check cache from DB first
      const existing = await ctx.runQuery(api.saveKeyword.getByUrl, {
        url: inputUrl,
      });

      if (existing) {
        return {
          suggestions: existing.suggestions,
        };
      }

      // Schema for SEO keyword data
      const KeywordSchema = z.object({
        keyword: z.string().min(1),
        intent: z.enum([
          "informational",
          "commercial",
          "transactional",
          "navigational",
        ]),
        titleIdea: z.string(),
        difficulty: z.number().min(1).max(100),
        volume: z.number().min(0),
      });

      const ResponseSchema = z.object({
        suggestions: z.array(KeywordSchema).length(6),
      });

      const prompt = `Analyze this website and identify 6 high-value SEO blog topics.

        For each topic, provide:
        - keyword: Primary target keyword (2-4 words, high search potential)
        - intent: Search intent (informational/commercial/transactional/navigational)
        - titleIdea: SEO-optimized blog title (compelling + keyword-rich)
        - difficulty: SEO difficulty score 1-100 (realistic assessment)
        - volume: Estimated monthly search volume

        Focus on:
        ✓ High-traffic, achievable keywords
        ✓ Topics that drive qualified leads
        ✓ Content gaps competitors miss
        ✓ Long-tail opportunities with commercial value
        ✓ Trending industry topics

        Return exactly 6 diverse, high-impact suggestions.`;

      const result = await client.extract.startAndWait({
        urls: [inputUrl],
        prompt,
        schema: ResponseSchema,
      });

      if (result.status !== "completed" || !result.data) {
        return {
          suggestions: [],
        };
      }

      const data = result.data as KeywordResponse;

      // Persist
      await ctx.runMutation(api.saveKeyword.save, {
        url: inputUrl,
        suggestions: data.suggestions,
      });

      return data;
    } catch (error) {
      return {
        suggestions: [],
      };
    }
  },
});
