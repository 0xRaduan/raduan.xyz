document.addEventListener("nav", async () => {
  const viewCountEl = document.querySelector(".view-count")
  if (!viewCountEl) return

  const apiBaseUrl = viewCountEl.getAttribute("data-api-url")
  if (!apiBaseUrl) return

  const countEl = viewCountEl.querySelector("[data-view-count]")
  if (!countEl) return

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
    countEl.textContent = formatCount(data.count)
  } catch (error) {
    console.error("Failed to fetch view count:", error)
    // Keep the placeholder or show error state
    countEl.textContent = "—"
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
