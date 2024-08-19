import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        "cal-sans" : ["Cal Sans"]
      } ,
      colors: {
        'blue-900': '#003366',
        'blue-600': '#1e40af',
        'blue-700': '#1e3a8a',
      },
    },
  },
  plugins: [],
};
export default config;
