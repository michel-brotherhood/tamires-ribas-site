import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#cabfab",
        paper: "#f4f1ea",
        ink: "#1a1712",
        muted: "#5f584e",
        accent: "#827b6f",
        concrete: "#b8ad99",
      },
    },
  },
  plugins: [],
};

export default config;
