import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import ImageZoom from "./quartz/components/ImageZoom"

// Configure the view count API URL
// After deploying your Cloudflare Worker, update this URL
const VIEW_COUNT_API_URL = "https://raduan-view-counter.raduan.workers.dev"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [ImageZoom()],
  footer: Component.Footer({
    links: {
      X: "https://x.com/0xRaduan",
      Github: "https://github.com/0xRaduan",
      LinkedIn: "https://linkedin.com/in/0xRaduan",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.ViewCount({ apiBaseUrl: VIEW_COUNT_API_URL }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({ 
        title: "Recent Notes",
        limit: 5,
        showTags: false,
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
