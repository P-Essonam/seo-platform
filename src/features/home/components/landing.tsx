"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Github,
  Sparkles,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";
import { GitHubStars } from "@/components/github-stars";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { KeywordResultsDialog } from "@/features/keyword/components/keyword-results-dialog";
import type { KeywordData } from "@/features/keyword/lib/types";

interface LandingProps {
  totalCount: number;
}
export default function Landing({ totalCount }: LandingProps) {
  const [tryOpen, setTryOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<KeywordData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const generate = useAction(api.generateKeyword.blogKeywords);

  const extractSiteName = (u: string) => {
    try {
      const domain = new URL(u.startsWith("http") ? u : `https://${u}`)
        .hostname;
      return domain.replace("www.", "").split(".")[0];
    } catch {
      return u;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResults(null);
    try {
      const res = (await generate({ url })) as KeywordData;
      setResults(res);
      if (res.suggestions && res.suggestions.length > 0) {
        setTryOpen(false);
        setShowResults(true);
      } else {
        setError("No keywords generated. Please check the URL and try again.");
      }
    } catch (err: any) {
      setError(err?.message ?? "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <section className="relative px-6 md:px-8 py-24 md:py-32 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
          The Complete{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Open-Source
          </span>{" "}
          SEO Platform
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          Full-stack SEO toolkit with AI-powered insights, geo-targeting, and
          LLM optimization. Start with keyword generation — scale to complete
          SEO mastery.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            className="h-12 px-6 text-base"
            onClick={() => setTryOpen(true)}
          >
            <span>Try generate SEO keywords</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <GitHubStars />

          <Button asChild variant="secondary" className="h-12 px-6 text-base">
            <Link href="/waitlist">Join the waitlist ({totalCount})</Link>
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1">
          <Star className="h-3 w-3" />
          Stars help more people discover the project.
        </p>
      </section>

      <Dialog open={tryOpen} onOpenChange={setTryOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Generate SEO keywords</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-url">Website URL</Label>
              <Input
                id="site-url"
                type="url"
                placeholder="https://yourdomain.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={loading}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full sm:w-auto"
              >
                {loading ? "Analyzing…" : "Generate"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {results && (
        <KeywordResultsDialog
          open={showResults}
          onOpenChange={setShowResults}
          suggestions={results.suggestions}
          siteName={extractSiteName(url)}
        />
      )}

      <section id="roadmap" className="px-6 md:px-8 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Platform Roadmap
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            What&apos;s shipping now and what&apos;s coming next
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* NOW */}
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-primary/40 to-accent/40">
            <Card className="rounded-2xl border-0 bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Available Now</h3>
                    <Badge className="uppercase">Live</Badge>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span>AI-powered keyword generation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span>Website content analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span>Search intent classification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span>Keyword difficulty scoring</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild className="h-10 px-4">
                    <Link href="/keyword">Try it now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NEXT */}
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-accent/40 to-primary/40">
            <Card className="rounded-2xl border-0 bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Coming Soon</h3>
                    <Badge className="uppercase">Next</Badge>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>Site audits & technical SEO</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>Backlink analysis & monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>Rank tracking & reporting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>Competitor analysis & research</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>Content marketing & optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>Local SEO & geo-targeting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>LLM optimization (ChatGPT, Claude)</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild className="h-10 px-4">
                    <Link href="/waitlist">Get updates</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
