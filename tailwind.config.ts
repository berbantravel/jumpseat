import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'

import typographyStyles from './typography'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'selector',
  plugins: [typographyPlugin],
  theme: {
    extend: {
      maxHeight: {
        'notifications': '650px',
      },
      fontFamily: {
        poppinsRegular: 'PoppinsRegular',
        poppinsBlack: 'PoppinsBlack',
        poppinsBold: 'PoppinsBold',
        poppinsMedium: 'PoppinsMedium',
        poppinsSemiBold: 'PoppinsSemiBold',
        poppinsLight: 'PoppinsLight'
      },
      colors: {
        primary: {
          DEFAULT: '#CCE2F1',
          background: '#CCE2F1',
          50: '#80B7DC',
          base: '#016FB9',
          hover: '#015C9A',
          pressed: '#01436F'
        },
        secondary: {
          background: '#D9D9D9',
          base: '#404040',
          hover: '#262626',
          pressed: '#1A1A1A'
        },
        text: {
          black: {
            primary: '#1D2433',
            secondary: '#4A505C',
            disabled: '#6C707A'
          },
          white: {
            primary: '#FFFFFF',
            secondary: '#DBDBDC',
            disabled: '#B6B7B9'
          }
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
          950: '#450A0A'
        },
        warning: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407'
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22'
        },
        neutral: {
          inputFieldBackground: '#FDFDFD',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617'
        },
        page: {
          main: '#FAFAFA',
          container: '#FCFCFC',
          content: '#FCFCFC',
          selected: '#EFEFEF'
        },
        neutralBlack: {
          DEFAULT: '#404040',
          75: '#4A505C',
          50: '#6C707A',
          25: '#E2E8F0',
          10: '#8F8F8F'
        },
        neutralGray: {
          DEFAULT: '#414758',
          50: '#616161',
          75: '#64748B',
          45: '#A1A7BA',
        },
        neutralWhite: {
          DEFAULT: '#fafafa',
          75: '#FBFBFB',
          50: '#FCFCFC',
          25: '#FDFDFD',
          pure: '#FFFFFF',
          hovered: '#F8FAFC',
          primaryBorder: '#DBDBDC',
          clicked: '#F8FAFC',
          border: '#64748B'
        },
      },
    },
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    typography: typographyStyles,
  },
} satisfies Config
