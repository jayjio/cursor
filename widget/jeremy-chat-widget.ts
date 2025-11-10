import { createApp } from 'vue'
import JeremyChatWidget from './JeremyChatWidget.vue'

// Inject CSS if not already loaded
function injectCSS(cssUrl?: string) {
  if (typeof document === 'undefined') return
  
  // Check if CSS is already injected
  const existingLink = document.querySelector('link[data-jeremy-chat-widget-css]')
  if (existingLink) return
  
  // If CSS URL is provided, load it via link tag
  if (cssUrl) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = cssUrl
    link.setAttribute('data-jeremy-chat-widget-css', 'true')
    document.head.appendChild(link)
  }
}

// Widget initialization function
export function initJeremyChatWidget(containerId: string, options: {
  apiUrl?: string
  cssUrl?: string
  theme?: {
    bgColor?: string
    panelBgColor?: string
    textColor?: string
    borderColor?: string
  }
} = {}) {
  const container = document.getElementById(containerId)
  if (!container) {
    console.error(`Container with id "${containerId}" not found`)
    return
  }

  // Inject CSS if URL is provided
  if (options.cssUrl) {
    injectCSS(options.cssUrl)
  }
  
  // Also check for data attribute
  const cssUrlAttr = container.getAttribute('data-css-url')
  if (cssUrlAttr) {
    injectCSS(cssUrlAttr)
  }

  // Get API URL from data attribute, options, or use a sensible default
  const containerApiUrl = container.getAttribute('data-api-url')
  const apiUrl = options.apiUrl || containerApiUrl || '/api/chat'
  
  // Create and mount the app
  const app = createApp(JeremyChatWidget, {
    apiUrl: apiUrl,
    theme: options.theme
  })

  app.mount(container)
  
  return app
}

// Auto-initialize if data attribute is present
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('[data-jeremy-chat-widget]')
    widgets.forEach((el) => {
      const containerId = el.id || `jeremy-chat-widget-${Math.random().toString(36).substr(2, 9)}`
      if (!el.id) {
        el.id = containerId
      }
      
      const apiUrl = el.getAttribute('data-api-url') || undefined
      const cssUrl = el.getAttribute('data-css-url') || undefined
      const themeAttr = el.getAttribute('data-theme')
      let theme = undefined
      
      if (themeAttr) {
        try {
          theme = JSON.parse(themeAttr)
        } catch (e) {
          console.warn('Invalid theme JSON, using defaults')
        }
      }
      
      initJeremyChatWidget(containerId, { apiUrl, cssUrl, theme })
    })
  })
}

// Make it available globally
if (typeof window !== 'undefined') {
  (window as any).JeremyChatWidget = {
    init: initJeremyChatWidget
  }
}
