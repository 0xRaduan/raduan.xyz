import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = baseDir === "." ? "static/icon.png" : `${baseDir}/static/icon.png`
  
  // Split the title into first and last name
  const titleParts = title.split(" ")
  const firstName = titleParts[0]
  const lastName = titleParts.slice(1).join(" ")
  
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={iconPath} alt="Site icon" class="page-title-icon" />
        <span class="page-title-text">
          <span class="page-title-first">{firstName}</span>
          <span class="page-title-last">{lastName}</span>
        </span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.page-title-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
}

.page-title-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.page-title-first,
.page-title-last {
  display: block;
}

@media (max-width: 750px) {
  .page-title {
    font-size: 1.25rem;
  }
  
  .page-title-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .page-title a {
    gap: 0.375rem;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
