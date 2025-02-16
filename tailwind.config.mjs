/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2563eb", // Blue
        secondary: "#7dd3fc", // Light Blue
        accent: "#3b82f6", // Bright Blue
        neutral: "#1e293b", // Dark Slate
        success: "#10b981", // Green
        warning: "#f59e0b", // Amber
        error: "#ef4444", // Red
      },
      // Custom Fonts
      fontFamily: {
        display: ["Poppins", "sans-serif"], // For headings
        body: ["Open Sans", "sans-serif"], // For body text
      },
      // Gradient Colors
      backgroundImage: {
        "gradient-primary": "linear-gradient(45deg, #1a365d, #2563eb)",
        "gradient-secondary": "linear-gradient(45deg, #2563eb, #1a365d)",
        "gradient-accent": "linear-gradient(45deg, #3b82f6, #7dd3fc)",
      },
      // Custom Animations
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};
