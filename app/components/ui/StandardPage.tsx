/**
 * Standard Page Wrapper Component
 * Unified page layout for all DES-BOMS pages
 */

import React from 'react';
import { StandardPageHeader } from './StandardPageHeader';
import theme from '../../theme';

interface StandardPageProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  backUrl?: string;
  accentColor?: string;
  maxWidth?: string;
}

export const StandardPage: React.FC<StandardPageProps> = ({
  title,
  subtitle,
  icon,
  children,
  showBackButton = true,
  backUrl = '/',
  accentColor = theme.colors.primary,
  maxWidth = '1400px',
}) => (
  <main style={theme.components.page}>
    <div style={{ ...theme.components.container, maxWidth }}>
      <StandardPageHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        showBackButton={showBackButton}
        backUrl={backUrl}
        accentColor={accentColor}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  </main>
);

export default StandardPage;
