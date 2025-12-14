# raduan.xyz Blog Architecture

## Stack
- **Static Site Generator**: Hugo v0.96.0
- **Theme**: Quartz (digital garden/knowledge base)
- **Hosting**: GitHub Pages
- **Domain**: raduan.xyz

## Build Pipeline
1. Content written in Markdown with Obsidian-style wiki links (`[[]]`)
2. `hugo-obsidian` preprocessor converts wiki links to Hugo format
3. Hugo builds static site with Quartz theme
4. GitHub Actions deploys to `master` branch on push to `hugo`

## Key Directories
- `content/` - All markdown content
- `content/blog/` - Blog posts
- `content/main/` - Main pages (about, projects)
- `content/private/` - Ignored in builds
- `data/config.yaml` - Quartz theme configuration
- `config.toml` - Hugo configuration

## Local Development
```bash
make serve  # Runs hugo-obsidian then hugo server
```

## Deployment
Push to `hugo` branch → GitHub Actions → Deploys to GitHub Pages

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
2. Worker hashes `IP:User-Agent` → checks if seen in last 30 days
3. If new visitor: increment count, store hash with 30-day TTL
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