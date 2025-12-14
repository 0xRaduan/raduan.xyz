import { registerEscapeHandler, removeAllChildren } from "./util"

document.addEventListener("nav", () => {
  const sections = document.querySelectorAll<HTMLDivElement>(".collapsible-section")

  for (const section of sections) {
    const header = section.querySelector<HTMLButtonElement>(".collapsible-header")
    const content = section.querySelector<HTMLDivElement>(".collapsible-content")

    if (!header || !content) continue

    header.addEventListener("click", () => {
      const isCollapsed = header.classList.contains("collapsed")

      if (isCollapsed) {
        // Expand
        header.classList.remove("collapsed")
        header.setAttribute("aria-expanded", "true")
        content.classList.remove("collapsed")
      } else {
        // Collapse
        header.classList.add("collapsed")
        header.setAttribute("aria-expanded", "false")
        content.classList.add("collapsed")
      }
    })
  }
})
