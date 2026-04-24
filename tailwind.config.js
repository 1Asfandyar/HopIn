module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#16A34A",
        "primary-dark": "#158D1D",
        secondary: "#2563EB",
        "light-blue": "#EFFFF7",
        accent: "#FF86B6",
        gray: {
          900: "#111827",
          700: "#374151",
          500: "#8F8290",
          300: "#D1D5DB",
          200: "#E5E7EB",
          100: "#F3F4F6",
        },
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        base: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        full: "50%",
      },
    },
  },
  plugins: [],
}
