import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
         rootDir: fileURLToPath(new URL('./', import.meta.url)),
         domEnvironment: 'happy-dom' // veya 'jsdom' seçebilirsin
      }
    },
     include: [
      'components/**/__tests__/**/*.spec.ts',
      'composables/**/__tests__/**/*.spec.ts',
      'utils/**/__tests__/**/*.spec.ts'
    ]
  }
})