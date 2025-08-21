'use client';

import { Text, Card } from '@mantine/core';
import { LoadingScreen } from '../components/LoadingScreen';
import { usePageInitialization } from '@/hooks/usePageInitialization';
import { StandardPage } from '../components/ui/StandardPage';
import theme from '../theme';

export default function ReportsPage() {
  const { isPageReady, pageInitialization, getProgress } =
    usePageInitialization({
      initialTasks: ['interface'],
      autoStart: true,
    });

  if (!isPageReady) {
    return (
      <LoadingScreen
        title='Loading Reports'
        description='Initializing reporting interface...'
        icon='📊'
        pageInitialization={pageInitialization}
        progress={getProgress()}
      />
    );
  }
  return (
    <StandardPage
      title='Reports'
      subtitle='Manufacturing reports and analytics'
      icon='📈'
      accentColor={theme.pageAccents.reports}
      showBackButton={true}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Card
          padding='xl'
          style={{
            background: theme.colors.cardPrimary,
            border: `1px solid ${theme.colors.borderPrimary}`,
            borderRadius: theme.borderRadius.xl,
            textAlign: 'center',
            boxShadow: theme.shadows.lg,
            backdropFilter: 'blur(12px)',
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          <Text size='lg' style={{ color: '#f1f5f9', marginBottom: 20 }}>
            Reports functionality coming soon...
          </Text>
          <Text style={{ color: '#94a3b8', marginBottom: 30 }}>
            This page will contain production reports, analytics, and data
            exports.
          </Text>
        </Card>
      </div>
    </StandardPage>
  );
}
