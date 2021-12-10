module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateRows: {
                layout: "auto 1fr auto"
            },
            maxWidth: {
                layout: "1200px"
            }
        }
    },
    plugins: []
};
