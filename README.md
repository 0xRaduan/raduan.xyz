# raduan.xyz

Personal website and digital garden built with Quartz v4.

## Stack

- **Static Site Generator**: Quartz v4.5.1
- **Hosting**: GitHub Pages
- **Domain**: raduan.xyz
- **Analytics**: Custom Cloudflare Worker + KV (privacy-friendly view counter)

## Quick Start

```bash
# Install dependencies
bun install

# Start local development server
bun run quartz build --serve

# Build for production
bun run quartz build
```

## Project Structure

- `content/` - All markdown content
  - `content/blog/` - Blog posts
  - `content/main/` - Main pages (about, projects)
  - `content/private/` - Ignored in builds
- `quartz/` - Quartz framework and custom components
- `quartz.config.ts` - Site configuration
- `quartz.layout.ts` - Layout configuration
- `cloudflare-worker/` - View counter worker

## View Counter

See [CLAUDE.md](./CLAUDE.md) for detailed documentation on the view counter architecture.

## Documentation

- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [Join Quartz Discord](https://discord.gg/cRFFHYye7t)
