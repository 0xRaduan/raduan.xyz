document.addEventListener("nav", () => {
  // Remove any existing zoom overlay
  const existingOverlay = document.querySelector('.image-zoom-overlay')
  if (existingOverlay) {
    existingOverlay.remove()
  }

  const isMobile = () => window.innerWidth <= 800

  // Create zoom overlay
  const overlay = document.createElement('div')
  overlay.className = 'image-zoom-overlay'
  document.body.appendChild(overlay)

  // Drawer state for mobile
  let startY = 0
  let currentY = 0
  let isDragging = false
  let drawer: HTMLElement | null = null

  const closeOverlay = () => {
    overlay.classList.remove('active')
    if (drawer) {
      drawer.style.transform = ''
    }
    document.body.style.overflow = ''
  }

  const openOverlay = () => {
    requestAnimationFrame(() => {
      overlay.classList.add('active')
      document.body.style.overflow = 'hidden'
    })
  }

  // Add click handlers to all images in articles
  const images = document.querySelectorAll('article img')

  images.forEach((img) => {
    img.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      // Clone the image for the overlay
      const clonedImg = img.cloneNode(true) as HTMLImageElement
      overlay.innerHTML = ''

      if (isMobile()) {
        // Mobile: Drawer/bottom sheet style
        overlay.classList.add('mobile-drawer')

        // Create drawer container
        drawer = document.createElement('div')
        drawer.className = 'image-drawer'

        // Drag handle
        const handle = document.createElement('div')
        handle.className = 'drawer-handle'
        const handleBar = document.createElement('div')
        handleBar.className = 'drawer-handle-bar'
        handle.appendChild(handleBar)
        drawer.appendChild(handle)

        // Image container
        const imgContainer = document.createElement('div')
        imgContainer.className = 'drawer-image-container'
        imgContainer.appendChild(clonedImg)
        drawer.appendChild(imgContainer)

        // Check for caption
        const nextElement = img.nextElementSibling
        if (nextElement && nextElement.tagName === 'EM') {
          const caption = document.createElement('div')
          caption.className = 'drawer-caption'
          caption.textContent = nextElement.textContent || ''
          drawer.appendChild(caption)
        }

        overlay.appendChild(drawer)

        // Touch handlers for drag-to-dismiss
        drawer.addEventListener('touchstart', (e) => {
          startY = e.touches[0].clientY
          isDragging = true
          drawer!.style.transition = 'none'
        }, { passive: true })

        drawer.addEventListener('touchmove', (e) => {
          if (!isDragging) return
          currentY = e.touches[0].clientY
          const deltaY = currentY - startY

          // Only allow dragging down
          if (deltaY > 0) {
            drawer!.style.transform = `translateY(${deltaY}px)`
            // Fade overlay based on drag distance
            const opacity = Math.max(0, 1 - deltaY / 300)
            overlay.style.setProperty('--overlay-opacity', String(opacity))
          }
        }, { passive: true })

        drawer.addEventListener('touchend', () => {
          if (!isDragging) return
          isDragging = false
          drawer!.style.transition = ''

          const deltaY = currentY - startY
          // If dragged more than 100px or fast swipe, close
          if (deltaY > 100) {
            closeOverlay()
          } else {
            drawer!.style.transform = 'translateY(0)'
            overlay.style.setProperty('--overlay-opacity', '1')
          }
          startY = 0
          currentY = 0
        })

      } else {
        // Desktop: Modal overlay style
        overlay.classList.remove('mobile-drawer')

        const container = document.createElement('div')
        container.className = 'image-zoom-container'
        container.appendChild(clonedImg)

        // Check for caption
        const nextElement = img.nextElementSibling
        if (nextElement && nextElement.tagName === 'EM') {
          const caption = document.createElement('div')
          caption.className = 'image-zoom-caption'
          caption.textContent = nextElement.textContent || ''
          container.appendChild(caption)
        }

        overlay.appendChild(container)
      }

      openOverlay()
    })
  })

  // Close overlay when backdrop clicked
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay()
    }
  })

  // Close overlay with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeOverlay()
    }
  })
})