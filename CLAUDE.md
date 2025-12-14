# raduan.xyz Blog Architecture

## Stack
- **Static Site Generator**: Quartz v4.5.1
- **Package Manager**: bun
- **Hosting**: GitHub Pages
- **Domain**: raduan.xyz

## Build Pipeline
1. Content written in Markdown with Obsidian-style wiki links (`[[]]`)
2. Quartz processes markdown files and converts wiki links
3. Static site built with Quartz v4
4. GitHub Actions deploys to GitHub Pages

## Key Directories
- `content/` - All markdown content
- `content/blog/` - Blog posts
- `content/main/` - Main pages (about, projects)
- `content/private/` - Ignored in builds
- `quartz/` - Quartz framework and custom components
- `quartz.config.ts` - Site configuration
- `quartz.layout.ts` - Layout configuration

## Local Development
```bash
bun run quartz build --serve  # Start dev server with hot reload
```

## Deployment
Push to main branch → GitHub Actions → Deploys to GitHub Pages

## View Counter (Cloudflare Worker + KV)

### Motivation
Track unique page views without third-party analytics. Privacy-friendly (no cookies, hashed IPs).

### Architecture
```
Browser (raduan.xyz)
    │ fetch with ?increment=true
    ▼
Cloudflare Worker (raduan-view-counter.raduan.workers.dev)
    │ hash(IP + User-Agent) → check/store in KV
    ▼
Cloudflare KV (VIEW_COUNTS namespace)
```

### Key Files
- `cloudflare-worker/worker.js` - Worker logic (CORS, hashing, KV ops)
- `cloudflare-worker/wrangler.toml` - Worker config (KV namespace ID is not secret)
- `quartz/components/ViewCount.tsx` - React component
- `quartz/components/scripts/viewcount.inline.ts` - Client-side fetch logic
- `quartz/components/styles/viewcount.scss` - Styling

### How It Works
1. Page loads → JS calls worker with `?increment=true`
2. Worker hashes `IP:User-Agent` → checks if seen in last 7 days
3. If new visitor: increment count, store hash with 7-day TTL
4. Return count → displayed next to read time

### Deploy Worker Changes
```bash
cd cloudflare-worker
wrangler deploy
```

### Security
- CORS restricts browser requests to allowed origins
- Visitor hash prevents same person inflating counts
- KV namespace ID is public (auth required to actually access data)