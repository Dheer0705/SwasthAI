/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F3F6F4",
        ink: "#1B2420",
        teal: {
          DEFAULT: "#145C54",
          dark: "#0D423C",
          light: "#DCEAE7"
        },
        amber: {
          DEFAULT: "#C98A2C",
          light: "#F6E7CE"
        },
        brick: {
          DEFAULT: "#B23A2E",
          light: "#F5DAD6"
        },
        sage: {
          DEFAULT: "#4C7A5E",
          light: "#DEEAE1"
        },
        line: "#E4E1D8"
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      }
    }
  },
  plugins: []
};
