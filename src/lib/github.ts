export interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

export async function getGitHubStars(repo: string): Promise<number> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const data: GitHubRepo = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    return 0;
  }
}
