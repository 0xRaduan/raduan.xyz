// @ts-ignore
import viewCountScript from "./scripts/viewcount.inline"
import styles from "./styles/viewcount.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface ViewCountOptions {
  /** The base URL of your view count API */
  apiBaseUrl: string
}

const defaultOptions: ViewCountOptions = {
  apiBaseUrl: "https://raduan-view-counter.YOUR_SUBDOMAIN.workers.dev",
}

export default ((opts?: Partial<ViewCountOptions>) => {
  const options: ViewCountOptions = { ...defaultOptions, ...opts }

  const ViewCount: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <span class={classNames(displayClass, "view-count")} data-api-url={options.apiBaseUrl}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="view-count-icon"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span class="view-count-number" data-view-count></span>
        <span class="view-count-label">views</span>
      </span>
    )
  }

  ViewCount.afterDOMLoaded = viewCountScript
  ViewCount.css = styles

  return ViewCount
}) satisfies QuartzComponentConstructor
