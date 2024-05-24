const { Jacquard_24 } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        jacquard: ["Jacquard 24", "system-ui"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bgdark: "#1a1b1e",
        lightblack: "#222",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        rotate: "rotate 10s linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        rotate: {
          from: {
            transform: "translate(-50%, -50%) rotate(0deg) translate(200px) rotate(0deg)",
          },
          to: {
            transform: "translate(-50%, -50%) rotate(360deg) translate(200px) rotate(-360deg)",
          }
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
