const colors = require("tailwindcss/colors");

module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: colors.coolGray
            },
            gridTemplateRows: {
                layout: "auto 1fr auto"
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
