document.addEventListener("nav", async () => {
  const viewCountEl = document.querySelector(".view-count") as HTMLElement | null
  if (!viewCountEl) return

  const apiBaseUrl = viewCountEl.getAttribute("data-api-url")
  if (!apiBaseUrl) return

  const countEl = viewCountEl.querySelector("[data-view-count]")
  const labelEl = viewCountEl.querySelector(".view-count-label")
  if (!countEl) return

  // Hide initially until we have data
  viewCountEl.style.display = "none"

  // Get the current page slug from the URL
  const slug = window.location.pathname.replace(/^\/+|\/+$/g, "") || "index"

  try {
    // Increment and get the view count
    const response = await fetch(`${apiBaseUrl}/api/views/${encodeURIComponent(slug)}?increment=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    // Only show if count > 0
    if (data.count > 0) {
      countEl.textContent = formatCount(data.count)
      // Fix singular/plural
      if (labelEl) {
        labelEl.textContent = data.count === 1 ? "view" : "views"
      }
      viewCountEl.style.display = "inline-flex"
    }
  } catch (error) {
    console.error("Failed to fetch view count:", error)
    // Keep hidden on error
  }
})

function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  }
  return count.toString()
}
