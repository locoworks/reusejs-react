/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../components/slider-carousel/**/*.{js,jsx.ts.tsx,mdx}",
    "../../components/code-preview/**/*.{js,jsx.ts.tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideRightToLeft: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        // You can define other keyframes here if needed
      },
      animation: {
        'slide-right-to-left': 'slideRightToLeft 0.5s ease', // Use your custom keyframes here
        // Define other custom animations if needed
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
