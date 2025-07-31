document.addEventListener("nav", () => {
  // Remove any existing zoom overlay
  const existingOverlay = document.querySelector('.image-zoom-overlay')
  if (existingOverlay) {
    existingOverlay.remove()
  }

  // Create zoom overlay
  const overlay = document.createElement('div')
  overlay.className = 'image-zoom-overlay'
  document.body.appendChild(overlay)

  // Add click handlers to all images in articles
  const images = document.querySelectorAll('article img')
  
  images.forEach((img) => {
    img.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      
      // Clone the image for the overlay
      const clonedImg = img.cloneNode(true) as HTMLImageElement
      overlay.innerHTML = ''
      
      // Create a container for image and caption
      const container = document.createElement('div')
      container.className = 'image-zoom-container'
      container.appendChild(clonedImg)
      
      // Check for caption (em element after image)
      const nextElement = img.nextElementSibling
      if (nextElement && nextElement.tagName === 'EM') {
        const caption = document.createElement('div')
        caption.className = 'image-zoom-caption'
        caption.textContent = nextElement.textContent || ''
        container.appendChild(caption)
      }
      
      overlay.appendChild(container)
      
      // Show overlay with animation
      requestAnimationFrame(() => {
        overlay.classList.add('active')
      })
    })
  })

  // Close overlay when clicked
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active')
    }
  })

  // Close overlay with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active')
    }
  })
})