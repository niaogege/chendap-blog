const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        humanPickColorMain: "#1A4B7C",
        humanPickColorPrimary: "#2F6499",
        humanPickColorPatch: "#678099",
      },
      backgroundColor: {
        homebg: "#F6F6F6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        humanPick:
          "linear-gradient(180deg, #EBF3FA 0%, rgba(240,245,250,0.00) 100%)",
        womanPick:
          "linear-gradient(180deg, #FAF0F5 0%, rgba(250,240,245,0.00) 100%)",
      },
      height: {
        18: "4.5rem",
        85: "22rem",
      },
      textColor: {
        primaryOne: "var(--blog-c-text-1)",
        primaryThree: "var(--blog-c-text-3)",
        primarySix: "var(--blog-c-text-6)",
        primaryNine: "var(--blog-c-text-9)",
        darkPrimary: "rgb(218, 218, 219)",
        little: "#8D8D91",
        secondary: "#ffed4a",
        danger: "#FF4444;",
        bottomSlogan: "#C9CBCD",
        highBlack: "#3D3D3D",
      },
      fontSize: {
        13: "13px",
        18: "18px",
      },
      fontFamily: {
        pingyin: ["PingFangSC-Regular", "ui-monospace", "SFMono-Regular"],
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
