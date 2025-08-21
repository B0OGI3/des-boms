/**
 * DES-BOMS Styled Components
 * Reusable UI components with consistent theming
 */

import React from 'react';
import { Card, Title, Text, Button, Loader, Alert } from '@mantine/core';
import theme from '../../theme';

// Types
type TrendDirection = 'up' | 'down' | 'neutral';

// Helper functions for trend styling
const getTrendBackground = (trend: TrendDirection) => {
  switch (trend) {
    case 'up':
      return 'rgba(16, 185, 129, 0.1)';
    case 'down':
      return 'rgba(239, 68, 68, 0.1)';
    default:
      return 'rgba(107, 114, 128, 0.1)';
  }
};

const getTrendColor = (trend: TrendDirection) => {
  switch (trend) {
    case 'up':
      return theme.colors.success;
    case 'down':
      return theme.colors.error;
    default:
      return theme.colors.textMuted;
  }
};

const getTrendIcon = (trend: TrendDirection) => {
  switch (trend) {
    case 'up':
      return '↗';
    case 'down':
      return '↘';
    default:
      return '→';
  }
};

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = '1400px',
}) => (
  <main style={theme.components.page}>
    <div style={{ ...theme.components.container, maxWidth }}>{children}</div>
  </main>
);

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  accentColor?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  accentColor = theme.colors.primary,
  children,
}) => (
  <div style={theme.components.pageHeader}>
    {/* Header accent */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        borderRadius: theme.borderRadius.sm,
      }}
    />

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
      }}
    >
      {icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: theme.borderRadius.lg,
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: `0 4px 16px ${accentColor}40`,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {icon}
        </div>
      )}
      <div>
        <Title order={1} style={theme.components.headerTitle}>
          {title}
        </Title>
        {subtitle && (
          <Text style={theme.components.headerSubtitle}>{subtitle}</Text>
        )}
      </div>
    </div>

    {children}
  </div>
);

interface ThemedCardProps {
  children: React.ReactNode;
  padding?: string;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  padding = 'xl',
  hover = false,
  className,
  style = {},
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyle = {
    ...theme.components.card,
    ...(hover && isHovered ? theme.components.cardHover : {}),
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  return (
    <Card
      padding={padding}
      style={cardStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
    >
      {children}
    </Card>
  );
};

interface ThemedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  style = {},
}) => {
  const baseStyle =
    variant === 'primary'
      ? theme.components.buttonPrimary
      : theme.components.buttonSecondary;

  const sizeStyles = {
    sm: {
      height: '32px',
      fontSize: theme.typography.fontSizeSm,
      padding: '0 12px',
    },
    md: {
      height: '40px',
      fontSize: theme.typography.fontSizeMd,
      padding: '0 16px',
    },
    lg: {
      height: '48px',
      fontSize: theme.typography.fontSizeLg,
      padding: '0 24px',
    },
  };

  return (
    <Button
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...style,
        opacity: disabled ? 0.6 : 1,
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};

interface LoadingStateProps {
  title?: string;
  description?: string;
  icon?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'Loading...',
  description,
  icon,
}) => (
  <div style={theme.components.loadingContainer}>
    {icon && (
      <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>
        {icon}
      </div>
    )}
    <Loader size='xl' color={theme.colors.primary} />
    <Text
      size='lg'
      style={{
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.lg,
        fontWeight: theme.typography.fontWeightMedium,
      }}
    >
      {title}
    </Text>
    {description && (
      <Text
        size='sm'
        style={{
          color: theme.colors.textMuted,
          marginTop: theme.spacing.sm,
        }}
      >
        {description}
      </Text>
    )}
  </div>
);

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Error',
  message,
  onRetry,
  retryLabel = 'Try Again',
}) => (
  <Alert
    color='red'
    title={title}
    style={{
      marginBottom: theme.spacing.xl,
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <Text
      style={{ color: '#fca5a5', marginBottom: onRetry ? theme.spacing.md : 0 }}
    >
      {message}
    </Text>
    {onRetry && (
      <ThemedButton variant='secondary' size='sm' onClick={onRetry}>
        {retryLabel}
      </ThemedButton>
    )}
  </Alert>
);

interface StatsGridProps {
  children: React.ReactNode;
  columns?: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  children,
  columns = 4,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${Math.floor((220 / columns) * 4)}px, 1fr))`,
      gap: theme.spacing.lg,
      marginBottom: theme.spacing.xl,
    }}
  >
    {children}
  </div>
);

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: string;
  color?: string;
  trend?: TrendDirection;
  trendValue?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color: _color = theme.colors.primary,
  trend,
  trendValue,
  onClick,
}) => (
  <ThemedCard hover={!!onClick} onClick={onClick}>
    <div style={{ textAlign: 'center', padding: theme.spacing.md }}>
      {icon && (
        <div style={{ fontSize: '32px', marginBottom: theme.spacing.md }}>
          {icon}
        </div>
      )}
      <Text
        size='xl'
        fw={700}
        style={{
          color: theme.colors.textPrimary,
          marginBottom: theme.spacing.xs,
          fontSize: theme.typography.fontSize2xl,
        }}
      >
        {value}
      </Text>
      <Text
        size='sm'
        style={{
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.xs,
          fontWeight: theme.typography.fontWeightMedium,
        }}
      >
        {title}
      </Text>
      {trend && trendValue && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            borderRadius: theme.borderRadius.sm,
            background: getTrendBackground(trend),
            color: getTrendColor(trend),
            fontSize: theme.typography.fontSizeXs,
            fontWeight: theme.typography.fontWeightSemiBold,
          }}
        >
          {getTrendIcon(trend)}
          {trendValue}
        </div>
      )}
    </div>
  </ThemedCard>
);

interface NavigationCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  size?: 'small' | 'medium' | 'large';
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  icon,
  href,
  color,
  size = 'medium',
}) => {
  const sizes = {
    small: {
      height: '120px',
      iconSize: '24px',
      titleSize: theme.typography.fontSizeMd,
    },
    medium: {
      height: '160px',
      iconSize: '32px',
      titleSize: theme.typography.fontSizeLg,
    },
    large: {
      height: '200px',
      iconSize: '40px',
      titleSize: theme.typography.fontSizeXl,
    },
  };

  return (
    <a href={href} style={{ textDecoration: 'none' }}>
      <ThemedCard
        hover
        style={{
          height: sizes[size].height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontSize: sizes[size].iconSize,
            marginBottom: theme.spacing.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizes[size].iconSize,
            height: sizes[size].iconSize,
            lineHeight: 1,
            position: 'relative',
          }}
        >
          <span
            style={{
              display: 'block',
              transform: 'translateY(1px)', // Fine-tune vertical position
            }}
          >
            {icon}
          </span>
        </div>
        <Text
          fw={600}
          style={{
            color: theme.colors.textPrimary,
            marginBottom: theme.spacing.sm,
            fontSize: sizes[size].titleSize,
          }}
        >
          {title}
        </Text>
        <Text
          size='sm'
          style={{
            color: theme.colors.textMuted,
            lineHeight: theme.typography.lineHeightNormal,
            maxWidth: '90%',
          }}
        >
          {description}
        </Text>
        {/* Accent border at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity: 0.8,
          }}
        />
      </ThemedCard>
    </a>
  );
};
