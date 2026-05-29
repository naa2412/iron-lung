/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
        },
        accent: '#0EA5E9',
        surface: {
          DEFAULT: '#F0F4FF',
          secondary: '#E8EFFE',
          white: '#FFFFFF',
          footer: '#F8FAFC',
        },
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          placeholder: '#94A3B8',
          body: '#334155',
          label: '#374151',
        },
        success: {
          DEFAULT: '#10B981',
          bg: 'rgba(236, 253, 245, 0.8)',
        },
        warning: {
          DEFAULT: '#F59E0B',
          bg: 'rgba(255, 251, 235, 0.8)',
        },
        danger: {
          DEFAULT: '#EF4444',
          bg: 'rgba(254, 242, 242, 0.8)',
        },
        info: {
          DEFAULT: '#3B82F6',
          bg: 'rgba(239, 246, 255, 0.8)',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        label: ['13px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        glass: '16px',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(37, 99, 235, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 8px 32px rgba(37, 99, 235, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06)',
        card: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease forwards',
        'slide-up': 'slideUp 200ms ease forwards',
        'shimmer': 'shimmer 1.5s infinite linear',
        'wiggle': 'wiggle 500ms ease-in-out',
        'pop-in': 'popIn 300ms ease forwards',
        'count-up': 'countUp 600ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(14deg)' },
          '30%': { transform: 'rotate(-10deg)' },
          '45%': { transform: 'rotate(8deg)' },
          '60%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
