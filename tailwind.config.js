/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts,scss}", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            margin: {
                0: "0",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};

