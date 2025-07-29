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
      tagId: "G-XVWT99GTED",
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
          light: "#FFFFFF",          // Pure white background
          lightgray: "#F5F5F5",      // Slightly off-white
          gray: "#666666",           // Medium gray for subtle elements
          darkgray: "#1A1A1A",       // Almost black
          dark: "#000000",           // Pure black for text
          secondary: "#FF4500",      // Asiimov orange for links/accents
          tertiary: "#FF6B35",       // Lighter orange for hover states
          highlight: "rgba(255, 69, 0, 0.15)",  // Orange tint for highlights
          textHighlight: "#FF450033", // Orange text highlighting
        },
        darkMode: {
          light: "#0A0A0A",          // Near-black background
          lightgray: "#1A1A1A",      // Dark gray for cards/sections
          gray: "#999999",           // Medium gray for text
          darkgray: "#E0E0E0",       // Light gray for primary text
          dark: "#FFFFFF",           // Pure white for headers
          secondary: "#FF6B35",      // Brighter orange for dark mode
          tertiary: "#FFA500",       // Even brighter orange for hover
          highlight: "rgba(255, 107, 53, 0.2)", // Orange glow for highlights
          textHighlight: "#FF6B3544", // Orange text highlighting
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
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
