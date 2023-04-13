/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                "2xl": "1440px"
            }
        },
        extend: {}
    },
    plugins: []
};
