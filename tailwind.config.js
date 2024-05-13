/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#ffc600',
        lightBrown: '#c06722',
        brown: '#582f0e',
        white: '#fff',
        gray: '#e9ecef',
        semiGray: '#adb5bd',
        darkGray: '#6c757d',
        babyYellow: '#ffee9d',
      },
    },
  },
  plugins: [],
};
