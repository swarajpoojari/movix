module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', "react"],
  rules: {
    'react-refresh/only-export-components': 'warn',
    "react/prop-types": "off",
    "react/jsx-uses-react": "error",   
    "react/jsx-uses-vars": "error" ,
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  },
}
