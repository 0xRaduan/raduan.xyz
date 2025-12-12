# View Counter - Cloudflare Worker Setup

This worker tracks unique page views for your Quartz blog using Cloudflare Workers + KV.

## Prerequisites

1. A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)
2. [Node.js](https://nodejs.org/) installed locally
3. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

## Setup Steps

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

### 3. Create the KV Namespace

```bash
cd cloudflare-worker
wrangler kv:namespace create "VIEW_COUNTS"
```

This will output something like:
```
🌀 Creating namespace with title "raduan-view-counter-VIEW_COUNTS"
✨ Success!
Add the following to your wrangler.toml:
[[kv_namespaces]]
binding = "VIEW_COUNTS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 4. Update wrangler.toml

Copy the `id` from the output and paste it into `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "VIEW_COUNTS"
id = "YOUR_ACTUAL_KV_NAMESPACE_ID"  # Replace this!
```

### 5. Deploy the Worker

```bash
wrangler deploy
```

This will output your worker URL, something like:
```
https://raduan-view-counter.YOUR_SUBDOMAIN.workers.dev
```

### 6. Update Quartz Layout

Open `quartz.layout.ts` and update the API URL:

```typescript
const VIEW_COUNT_API_URL = "https://raduan-view-counter.YOUR_SUBDOMAIN.workers.dev"
```

### 7. (Optional) Custom Domain

If you want a cleaner URL like `views.raduan.xyz`:

1. Go to Cloudflare Dashboard → Workers & Pages → your worker
2. Click "Settings" → "Triggers"
3. Add a custom domain

Then update `wrangler.toml`:
```toml
routes = [
  { pattern = "views.raduan.xyz/*", zone_name = "raduan.xyz" }
]
```

And update `worker.js` CORS header:
```javascript
'Access-Control-Allow-Origin': 'https://raduan.xyz',
```

## Testing

After deployment, test the API:

```bash
# Get view count (without incrementing)
curl "https://your-worker.workers.dev/api/views/blog/my-post"

# Increment and get view count
curl "https://your-worker.workers.dev/api/views/blog/my-post?increment=true"
```

## How It Works

1. When a page loads, the inline script calls the worker with `?increment=true`
2. The worker hashes the visitor's IP + User-Agent
3. If this hash hasn't visited this page in 30 days, increment the count
4. Return the current count
5. The script updates the DOM with the count

## Privacy

- No personal data is stored
- IP addresses are hashed (one-way, not reversible)
- Visitor hashes expire after 30 days
- Only page slugs and counts are stored

## Cost

Cloudflare Workers free tier includes:
- 100,000 requests/day
- 1GB KV storage
- 1,000 KV writes/day

This is more than enough for most blogs.
