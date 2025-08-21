/**
 * Standard Page Header Component
 * Unified header design for all DES-BOMS pages
 */

import React from 'react';
import { Title, Text, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import theme from '../../theme';

interface StandardPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  showBackButton?: boolean;
  backUrl?: string;
  accentColor?: string;
}

export const StandardPageHeader: React.FC<StandardPageHeaderProps> = ({
  title,
  subtitle,
  icon,
  showBackButton = true,
  backUrl = '/',
  accentColor = theme.colors.primary,
}) => (
  <div
    style={{
      marginBottom: theme.spacing.md, // Reduced from xl
      paddingTop: theme.spacing.xs, // Reduced from sm
      position: 'relative',
    }}
  >
    {/* Header accent line - thinner */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${accentColor}, transparent 40%)`,
        borderRadius: theme.borderRadius.sm,
      }}
    />

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm, // Reduced from md
        paddingTop: theme.spacing.xs, // Reduced further
      }}
    >
      {/* Left side - Icon and Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm, // Reduced from md
        }}
      >
        {icon && (
          <div
            style={{
              width: '32px', // Reduced from 40px
              height: '32px', // Reduced from 40px
              borderRadius: theme.borderRadius.md, // Reduced from lg
              background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)`,
              border: `1px solid ${accentColor}25`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px', // Reduced from 20px
              boxShadow: `0 1px 4px ${accentColor}10`, // Reduced shadow
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <Title
            order={1}
            style={{
              ...theme.components.headerTitle,
              fontSize: theme.typography.fontSizeXl, // Reduced from fontSize2xl
              lineHeight: theme.typography.lineHeightTight,
              marginBottom: '2px', // Very small margin
              fontWeight: theme.typography.fontWeightSemiBold,
            }}
          >
            {title}
          </Title>
          {subtitle && (
            <Text
              style={{
                ...theme.components.headerSubtitle,
                fontSize: theme.typography.fontSizeSm, // Reduced from fontSizeMd
                color: theme.colors.textMuted,
                lineHeight: theme.typography.lineHeightNormal,
                marginTop: '1px', // Minimal margin
              }}
            >
              {subtitle}
            </Text>
          )}
        </div>
      </div>

      {/* Right side - Back button */}
      {showBackButton && (
        <Button
          variant='light'
          color='gray'
          size='sm'
          leftSection={<IconArrowLeft size={16} />}
          component='a'
          href={backUrl}
          style={{
            background: theme.colors.cardPrimary,
            border: `1px solid ${theme.colors.borderSecondary}`,
            color: theme.colors.textSecondary,
            backdropFilter: 'blur(8px)',
            transition: theme.transitions.normal,
            fontWeight: theme.typography.fontWeightMedium,
            boxShadow: theme.shadows.sm,
          }}
          styles={{
            root: {
              '&:hover': {
                background: theme.colors.cardHover,
                borderColor: theme.colors.borderAccent,
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows.md,
              },
            },
          }}
        >
          Back to Dashboard
        </Button>
      )}
    </div>
  </div>
);

export default StandardPageHeader;
