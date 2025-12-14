import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Raduan Al-Shedivat",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-1F4HP7KDX8",
    },
    locale: "en-US",
    baseUrl: "raduan.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#F7F7F4",          // Warm off-white background
          lightgray: "#EEEDEA",      // Slightly darker for cards
          gray: "#26251E",           // Dark warm gray for borders
          darkgray: "#26251E",       // Dark warm gray for text
          dark: "#1A1914",           // Near-black for headers
          secondary: "#F54E00",      // Vibrant orange
          tertiary: "#D94400",       // Darker orange for hover
          highlight: "rgba(245, 78, 0, 0.1)",  // Orange tint for highlights
          textHighlight: "rgba(245, 78, 0, 0.15)",
        },
        darkMode: {
          light: "#1B1913",          // Warm dark background
          lightgray: "#2A2820",      // Slightly lighter for cards
          gray: "#666660",           // Medium warm gray
          darkgray: "#CDCCC8",       // Light warm gray for text
          dark: "#EDECEC",           // Off-white for headers
          secondary: "#F54E00",      // Vibrant orange (same as light)
          tertiary: "#FF6A2A",       // Lighter orange for hover
          highlight: "rgba(245, 78, 0, 0.12)", // Orange glow
          textHighlight: "rgba(245, 78, 0, 0.18)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
