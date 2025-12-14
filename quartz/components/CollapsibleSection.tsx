import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/collapsibleSection.scss"
import { classNames } from "../util/lang"
import { simplifySlug } from "../util/path"

// @ts-ignore
import script from "./scripts/collapsibleSection.inline"
import { concatenateResources } from "../util/resources"

interface Options {
  title: string
  showBacklinksCount: boolean
  defaultCollapsed: boolean
}

const defaultOptions: Options = {
  title: "Backlinks",
  showBacklinksCount: true,
  defaultCollapsed: true,
}

export default ((userOpts?: Partial<Options>, ...children: QuartzComponent[]) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  const CollapsibleSection: QuartzComponent = (props: QuartzComponentProps) => {
    const { displayClass, fileData, allFiles } = props

    // Calculate backlinks count
    let backlinksCount = 0
    if (opts.showBacklinksCount && fileData.slug) {
      const slug = simplifySlug(fileData.slug)
      backlinksCount = allFiles.filter((file) => file.links?.includes(slug)).length
    }

    const title = opts.showBacklinksCount
      ? `${opts.title} (${backlinksCount})`
      : opts.title

    return (
      <div class={classNames(displayClass, "collapsible-section")} data-collapsed={opts.defaultCollapsed}>
        <hr class="collapsible-divider" />
        <button
          type="button"
          class={opts.defaultCollapsed ? "collapsible-header collapsed" : "collapsible-header"}
          aria-controls="collapsible-content"
          aria-expanded={!opts.defaultCollapsed}
        >
          <span class="collapsible-title">{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="collapsible-icon"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class={opts.defaultCollapsed ? "collapsible-content collapsed" : "collapsible-content"}>
          {children.map((Child) => (
            <Child {...props} />
          ))}
        </div>
      </div>
    )
  }

  // Collect CSS and afterDOMLoaded from children
  const childCss = children.map((c) => c.css).filter(Boolean).join("\n")
  const childScripts = children.map((c) => c.afterDOMLoaded).filter(Boolean)

  CollapsibleSection.css = style + "\n" + childCss
  CollapsibleSection.afterDOMLoaded = concatenateResources(script, ...childScripts)

  return CollapsibleSection
}) satisfies QuartzComponentConstructor<[Partial<Options>?, ...QuartzComponent[]]>
