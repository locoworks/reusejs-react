/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../components/button/**/*.{js,jsx.ts.tsx,mdx}",
    "../../components/code-preview/**/*.{js,jsx.ts.tsx,mdx}",
    "../../components/input/**/*.{js,jsx.ts.tsx,mdx}",
    "../../components/input-group/**/*.{js,jsx.ts.tsx,mdx}",
    "../../components/otp-input/**/*.{js,jsx.ts.tsx,mdx}",
    "../node_modules/@locoworks/**/*.{js,jsx.ts.tsx,mdx}",
    "../**/*/reusejs-react-code-preview/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
