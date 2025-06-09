// ✅ Doğru format (CommonJS)
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', '@nuxt/eslint-config'],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
