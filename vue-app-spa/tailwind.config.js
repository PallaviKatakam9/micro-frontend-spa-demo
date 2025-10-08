/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts}",  // scan all Vue and JS/TS files
    "./index.html",             // if you have classes in your HTML
    "../shared/**/*.{js,ts,vue}", // optional: shared components across MF
  ],
  theme: { extend: {} },
  plugins: [],
};