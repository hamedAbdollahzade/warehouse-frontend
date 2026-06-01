/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#0F172A",
                    accent: "#06B6D4",
                    bg: "#F8FAFC",
                },
            },
        },
    },
    plugins: [],
};
