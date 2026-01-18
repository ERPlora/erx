/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ERPlora brand colors (aligned with Hub globals.css)
        primary: {
          DEFAULT: 'var(--erx-color-primary, #667eea)',
          dark: 'var(--erx-color-primary-dark, #5a6fce)',
          light: 'var(--erx-color-primary-light, #758bec)',
          contrast: 'var(--erx-color-primary-contrast, #ffffff)',
        },
        // Semantic colors
        success: {
          DEFAULT: 'var(--erx-color-success, #22c55e)',
          light: 'var(--erx-color-success-light, #86efac)',
        },
        warning: {
          DEFAULT: 'var(--erx-color-warning, #eab308)',
          light: 'var(--erx-color-warning-light, #fde047)',
        },
        danger: {
          DEFAULT: 'var(--erx-color-danger, #ef4444)',
          light: 'var(--erx-color-danger-light, #fca5a5)',
        },
        // Surface colors
        surface: {
          DEFAULT: 'var(--erx-surface, #ffffff)',
          secondary: 'var(--erx-surface-secondary, #f9fafb)',
          tertiary: 'var(--erx-surface-tertiary, #f3f4f6)',
        },
      },
      spacing: {
        // Ionic-compatible touch targets
        touch: '44px',
        'touch-sm': '36px',
        'touch-lg': '52px',
        // Safe areas for mobile
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      borderRadius: {
        ios: '10px',
        'ios-lg': '16px',
      },
      fontSize: {
        'ios-body': ['17px', '22px'],
        'ios-callout': ['16px', '21px'],
        'ios-caption': ['12px', '16px'],
      },
      boxShadow: {
        'ios-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'ios-md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'ios-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      transitionTimingFunction: {
        ios: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ios-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
