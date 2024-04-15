/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#128F51",
        lighter_primary: "#4AAE70",
        darker_primary: "#0E6C38",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
