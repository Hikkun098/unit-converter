/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Reactのコンポーネントファイルを監視
  ],
  theme: {
    extend: {
      // ここにカスタムテーマを追加できます（必要に応じて）
      colors: {
        'primary': '#2563eb',  // メインカラー（青）
        'secondary': '#0ea5e9', // セカンダリカラー（水色）
      }
    },
  },
  plugins: [],
}