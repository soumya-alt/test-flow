/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        secondary: {
          light: '#f472b6',
          DEFAULT: '#ec4899',
          dark: '#db2777',
        },
        accent: {
          light: '#34d399',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
        'gradient-green': 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
        'gradient-orange': 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
        'gradient-pink': 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
        'gradient-cyber': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #c084fc 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #a855f7 100%)',
        'gradient-forest': 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'widget': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'widget-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
      },
    },
  },
  plugins: [],
} 