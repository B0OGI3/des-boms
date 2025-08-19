/**
 * DES-BOMS Theme Configuration
 * Centralized theming system for consistent styling across all pages
 */

// Color palette
export const colors = {
  // Background gradients
  backgroundPrimary: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  backgroundSecondary: 'rgba(15, 23, 42, 0.95)',
  backgroundTertiary: 'rgba(30, 41, 59, 0.85)',
  
  // Card backgrounds
  cardPrimary: 'rgba(30, 41, 59, 0.9)',
  cardSecondary: 'rgba(15, 23, 42, 0.95)',
  cardTertiary: 'rgba(30, 41, 59, 0.8)',
  cardHover: 'rgba(51, 65, 85, 0.9)',
  
  // Text colors
  textPrimary: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textSubtle: '#64748b',
  
  // Accent colors
  primary: '#3b82f6',
  primaryDark: '#1e40af',
  secondary: '#14b8a6',
  secondaryDark: '#0d9488',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Border colors
  borderPrimary: 'rgba(51, 65, 85, 0.8)',
  borderSecondary: 'rgba(51, 65, 85, 0.4)',
  borderAccent: 'rgba(59, 130, 246, 0.5)',
  
  // Form elements
  inputBackground: 'rgba(30, 41, 59, 0.7)',
  inputBorder: 'rgba(51, 65, 85, 0.4)',
  inputFocus: 'rgba(59, 130, 246, 0.5)',
} as const;

// Typography
export const typography = {
  // Font sizes
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSize2xl: '1.5rem',
  fontSize3xl: '1.875rem',
  fontSize4xl: '2.25rem',
  
  // Font weights
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  
  // Line heights
  lineHeightTight: 1.25,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.625,
} as const;

// Spacing
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

// Border radius
export const borderRadius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.2)',
  lg: '0 8px 20px rgba(0, 0, 0, 0.3)',
  xl: '0 12px 28px rgba(0, 0, 0, 0.4)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
} as const;

// Transitions
export const transitions = {
  fast: 'all 0.15s ease',
  normal: 'all 0.2s ease',
  slow: 'all 0.3s ease',
  transform: 'transform 0.2s ease',
} as const;

// Component styles
export const components = {
  // Page layout
  page: {
    background: colors.backgroundPrimary,
    minHeight: '100vh',
    padding: spacing.lg,
  },
  
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative' as const,
  },
  
  // Headers
  pageHeader: {
    marginBottom: spacing['2xl'],
    paddingTop: spacing.lg,
    position: 'relative' as const,
  },
  
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize3xl,
    fontWeight: typography.fontWeightBold,
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSizeLg,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeightNormal,
  },
  
  // Cards
  card: {
    background: colors.cardPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderPrimary,
    borderRadius: borderRadius.lg,
    backdropFilter: 'blur(16px)',
    boxShadow: shadows.md,
    transition: transitions.normal,
  },
  
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: shadows.lg,
    borderColor: colors.borderAccent,
  },
  
  // Buttons
  buttonPrimary: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    border: 'none',
    borderRadius: borderRadius.md,
    fontWeight: typography.fontWeightSemiBold,
    boxShadow: `0 2px 8px rgba(59, 130, 246, 0.15)`,
    transition: transitions.normal,
  },
  
  buttonSecondary: {
    background: colors.cardPrimary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderSecondary,
    borderRadius: borderRadius.md,
    color: colors.textSecondary,
    fontWeight: typography.fontWeightSemiBold,
    transition: transitions.normal,
  },
  
  // Forms
  input: {
    background: colors.inputBackground,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.inputBorder,
    color: colors.textSecondary,
    borderRadius: borderRadius.md,
    transition: transitions.normal,
    backdropFilter: 'blur(8px)',
    fontWeight: typography.fontWeightMedium,
    boxShadow: shadows.sm,
  },
  
  inputFocus: {
    borderColor: colors.inputFocus,
    boxShadow: `0 0 0 2px rgba(59, 130, 246, 0.2)`,
  },
  
  // Loading states
  loadingContainer: {
    textAlign: 'center' as const,
    padding: `${spacing['3xl']} ${spacing.lg}`,
    background: colors.cardSecondary,
    borderRadius: borderRadius.xl,
    margin: `${spacing.lg} auto`,
    maxWidth: '400px',
    backdropFilter: 'blur(12px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderSecondary,
  },
  
  // Tables
  table: {
    background: colors.cardSecondary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderPrimary,
    borderRadius: borderRadius.lg,
    backdropFilter: 'blur(16px)',
    overflow: 'hidden',
    boxShadow: shadows.md,
  },
  
  tableHeader: {
    background: colors.cardTertiary,
    color: colors.textSecondary,
    fontWeight: typography.fontWeightSemiBold,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderPrimary,
    fontSize: typography.fontSizeSm,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    backdropFilter: 'blur(8px)',
    boxShadow: shadows.sm,
  },
  
  tableCell: {
    color: colors.textMuted,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderSecondary,
    background: colors.cardSecondary,
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightMedium,
    transition: transitions.normal,
  },
} as const;

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Page-specific accent colors
export const pageAccents = {
  home: colors.primary,
  orders: colors.primary,
  batches: colors.secondary,
  workstations: colors.success,
  qc: colors.warning,
  reports: '#8b5cf6',
  settings: colors.textSubtle,
} as const;

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  components,
  breakpoints,
  pageAccents,
};
