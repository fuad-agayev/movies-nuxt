export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  // Add a default API key for demo purposes, normally you would get this from environment variables
  if (!config.apiKey) {
    console.warn(
      'No API key found. Using a demo API key for development purposes.'
    )
  }

  if (process.client) {
    // Global error handling for API requests - only in browser
    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        // Handle unhandled promise rejections (likely from API calls)
        console.error('Unhandled API error:', event.reason)
        // You could implement a global notification system here
        // For example, showing a toast or notification to the user
        // Örneğin burada bir toast gösterebilirsin
      }
    )
  }
})
