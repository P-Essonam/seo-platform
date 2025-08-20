# The Complete Open-Source SEO Platform

Full-stack SEO toolkit with AI-powered insights, geo-targeting, and LLM optimization. Start with keyword generation — scale to complete SEO mastery.

## Features

- 🤖 AI-powered keyword generation from any website URL
- 🎯 Search intent classification and difficulty scoring
- 💾 Smart caching to avoid redundant generations
- 📱 Responsive design with dark/light mode

## Getting Started

### Prerequisites
- Node.js 18+
- Convex, Hyperbrowser, and Clerk accounts

### Installation

```bash
git clone https://github.com/P-Essonam/seo-platform.git
cd seo
npm install
```

Set up your `.env.local` with:
```env
CONVEX_DEPLOYMENT=your-convex-deployment
NEXT_PUBLIC_CONVEX_URL=your-convex-url
HYPERBROWSER_API_KEY=your-hyperbrowser-api-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_GITHUB_REPO=username/repo-name
```

```bash
npx convex dev
npm run dev
```

## Tech Stack

Next.js 15, TypeScript, Tailwind CSS, Convex, Clerk, Hyperbrowser SDK

## Development

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run lint         # Run linter
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a Pull Request

## License

MIT License