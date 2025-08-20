"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${process.env.NEXT_PUBLIC_GITHUB_REPO}`,
        );
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();
  }, []);

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Button asChild variant="outline">
      <Link
        href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO}`}
        target="_blank"
        rel="noreferrer"
        aria-label="View on GitHub"
        className="flex items-center gap-2"
      >
        <Github className="h-3.5 w-3.5" />
        {!loading && stars !== null ? (
          <span className="font-medium tabular-nums">{formatStars(stars)}</span>
        ) : (
          <span className="text-foreground/60">--</span>
        )}
      </Link>
    </Button>
  );
}
