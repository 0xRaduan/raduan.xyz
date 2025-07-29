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