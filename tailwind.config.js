/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ["Unbounded-Regular", "sans-serif"],
        "unbounded-light": ["Unbounded-Light", "sans-serif"],
        "unbounded-medium": ["Unbounded-Medium", "sans-serif"],
        "unbounded-semiBold": ["Unbounded-SemiBold", "sans-serif"],
        "unbounded-bold": ["Unbounded-Bold", "sans-serif"],
      },
      colors: {},
    },
  },
  plugins: [],
};
