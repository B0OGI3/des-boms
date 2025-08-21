/**
 * DES-BOMS Homepage Component
 *
 * Main landing page for the Batch Order Management System.
 * Provides an overview of manufacturing order management, batch routing,
 * workstation confirmations, and inspection processes.
 */

'use client';

import { Title, Text, Card, Badge, Group, Stack, Alert } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  LoadingState,
  ErrorState,
  StatsGrid,
  StatCard,
  NavigationCard,
  StandardPage,
} from './components/ui';
import theme from './theme';

interface DashboardData {
  overview: {
    totalOrders: number;
    totalBatches: number;
    activeBatches: number;
    completedBatches: number;
    queuedBatches: number;
    onHoldBatches: number;
    totalWorkstations: number;
    activeWorkstations: number;
    rushOrders: number;
    pendingQC: number;
  };
  workstationEfficiency: Array<{
    workstationId: string;
    name: string;
    status: 'ACTIVE' | 'QUEUED' | 'IDLE';
    activeJobs: number;
    queuedJobs: number;
    currentOperator: string | null;
    currentBatch: string | null;
  }>;
  alerts: {
    flaggedSteps: Array<{
      id: string;
      workstation: string;
      batch: string;
      step: string;
      duration: number;
    }>;
    overdueBatches: Array<{
      id: string;
      batch: string;
      workstation: string;
      due: string;
      overdue: number;
    }>;
  };
}

export default function HomePage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (!showDashboard) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        setDashboardData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection error');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [showDashboard]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'QUEUED':
        return 'yellow';
      case 'IDLE':
        return 'gray';
      case 'RUSH':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <StandardPage
      title='DES-BOMS'
      subtitle='Batch Order Management System'
      icon='🏭'
      accentColor={theme.pageAccents.home}
      showBackButton={false}
    >
      {/* Background Enhancement */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background:
            'linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .nav-card-primary {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }
        .nav-card-secondary {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        .nav-card-primary:nth-child(1) { animation-delay: 0.1s; }
        .nav-card-primary:nth-child(2) { animation-delay: 0.2s; }
        .nav-card-primary:nth-child(3) { animation-delay: 0.3s; }
        .nav-card-primary:nth-child(4) { animation-delay: 0.4s; }
        .nav-card-secondary:nth-child(1) { animation-delay: 0.5s; }
        .nav-card-secondary:nth-child(2) { animation-delay: 0.6s; }
        .nav-card-secondary:nth-child(3) { animation-delay: 0.7s; }
      `}</style>
      {/* Primary Navigation Cards */}
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          margin: '0 auto',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.borderPrimary}`,
          background: theme.colors.cardPrimary,
          boxShadow: theme.shadows.md,
          backdropFilter: 'blur(16px)',
          marginBottom: theme.spacing.xl,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: theme.spacing.md,
          }}
        >
          <div className='nav-card-primary'>
            <NavigationCard
              title='Customer Orders'
              description='Manage customer purchase orders, line items, and due dates.'
              icon='📋'
              href='/orders'
              color={theme.pageAccents.orders}
              size='medium'
            />
          </div>
          <div className='nav-card-primary'>
            <NavigationCard
              title='Batch Routing'
              description='Track batch progress through manufacturing workstations.'
              icon='🔄'
              href='/batches'
              color={theme.pageAccents.batches}
              size='medium'
            />
          </div>
          <div className='nav-card-primary'>
            <NavigationCard
              title='Shop Floor'
              description='Real-time workstation status and operator confirmations.'
              icon='🏭'
              href='/workstations'
              color={theme.pageAccents.workstations}
              size='medium'
            />
          </div>
          <div className='nav-card-primary'>
            <NavigationCard
              title='Quality Control'
              description='Inspection workflows and quality management.'
              icon='🔍'
              href='/qc'
              color={theme.pageAccents.qc}
              size='medium'
            />
          </div>
        </div>
      </div>
      {/* Visual Divider */}
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          margin: '0 auto',
          marginBottom: theme.spacing.sm,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
        }}
      />
      {/* Secondary Navigation */}
      <div
        style={{
          width: '100%',
          maxWidth: 700,
          margin: '0 auto',
          padding: '10px',
          borderRadius: '14px',
          border: '1px solid rgba(147, 51, 234, 0.12)',
          background:
            'linear-gradient(135deg, rgba(147, 51, 234, 0.025), rgba(59, 130, 246, 0.02))',
          boxShadow:
            '0 0 0 1px rgba(255, 255, 255, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
          marginBottom: theme.spacing.sm,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: theme.spacing.sm,
          }}
        >
          <div className='nav-card-secondary'>
            <NavigationCard
              title='Reports'
              description='Analytics and production reports'
              icon='📈'
              href='/reports'
              color={theme.pageAccents.reports}
              size='medium'
            />
          </div>
          <div className='nav-card-secondary'>
            <NavigationCard
              title='System Health'
              description='Monitor system status'
              icon='💚'
              href='/health'
              color={theme.pageAccents.workstations}
              size='medium'
            />
          </div>
          <div className='nav-card-secondary'>
            <NavigationCard
              title='Settings'
              description='System configuration'
              icon='⚙️'
              href='/settings'
              color={theme.pageAccents.settings}
              size='medium'
            />
          </div>
        </div>
      </div>
      {/* Dashboard Toggle Button */}
      <div style={{ textAlign: 'center', margin: '4px 0 12px 0' }}>
        <button
          onClick={() => setShowDashboard(!showDashboard)}
          style={{
            background: showDashboard
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))'
              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
            border: showDashboard
              ? '1px solid rgba(59, 130, 246, 0.4)'
              : '1px solid rgba(71, 85, 105, 0.8)',
            borderRadius: '12px',
            padding: '10px 20px',
            color: '#f1f5f9',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 auto',
            boxShadow: showDashboard
              ? '0 8px 25px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              : '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
          }}
          onMouseOver={e => {
            if (!showDashboard) {
              e.currentTarget.style.background =
                'linear-gradient(135deg, rgba(51, 65, 85, 0.95), rgba(71, 85, 105, 0.9))';
              e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.8)';
            }
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          }}
          onMouseOut={e => {
            if (!showDashboard) {
              e.currentTarget.style.background =
                'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))';
              e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.8)';
            }
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
          onFocus={e => {
            if (!showDashboard) {
              e.currentTarget.style.background =
                'linear-gradient(135deg, rgba(51, 65, 85, 0.95), rgba(71, 85, 105, 0.9))';
              e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.8)';
            }
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          }}
          onBlur={e => {
            if (!showDashboard) {
              e.currentTarget.style.background =
                'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))';
              e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.8)';
            }
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <span
            style={{
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '16px',
              height: '16px',
              lineHeight: 1,
            }}
          >
            📊
          </span>
          <span>{showDashboard ? 'Hide' : 'Show'} Live Dashboard</span>
          <span
            style={{
              fontSize: '12px',
              transform: showDashboard ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '12px',
              height: '12px',
              lineHeight: 1,
            }}
          >
            ▼
          </span>
        </button>
      </div>
      {/* Collapsible Dashboard Content */}
      <div
        style={{
          maxHeight: showDashboard ? '2000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: showDashboard ? 1 : 0,
          transform: showDashboard ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        {/* Loading State */}
        {loading && showDashboard && (
          <LoadingState
            title='Loading manufacturing data...'
            description='Connecting to production systems'
            icon='🏭'
          />
        )}

        {/* Error State */}
        {error && showDashboard && (
          <ErrorState title='Connection Error' message={error} />
        )}

        {/* Real-time Statistics */}
        {dashboardData && showDashboard && !loading && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <Title
                order={2}
                style={{
                  color: theme.colors.textPrimary,
                  marginBottom: 8,
                  fontSize: theme.typography.fontSize2xl,
                  fontWeight: theme.typography.fontWeightSemiBold,
                }}
              >
                Production Overview
              </Title>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontSize: theme.typography.fontSizeMd,
                }}
              >
                Real-time metrics • Updates every 30 seconds
              </Text>
            </div>
            <StatsGrid>
              <StatCard
                title='Active Batches'
                value={dashboardData.overview.activeBatches}
                icon='⚡'
                color={theme.colors.primary}
                trendValue={`${Math.round((dashboardData.overview.activeBatches / dashboardData.overview.totalBatches) * 100)}%`}
                trend='neutral'
              />
              <StatCard
                title='Rush Orders'
                value={dashboardData.overview.rushOrders}
                icon='🚨'
                color={theme.colors.error}
                trendValue={`${Math.round((dashboardData.overview.rushOrders / dashboardData.overview.totalOrders) * 100)}%`}
                trend='up'
              />
              <StatCard
                title='Pending QC'
                value={dashboardData.overview.pendingQC}
                icon='🔍'
                color={theme.colors.warning}
                trendValue={`${Math.round((dashboardData.overview.pendingQC / dashboardData.overview.totalBatches) * 100)}%`}
                trend='neutral'
              />
              <StatCard
                title='Active Stations'
                value={
                  dashboardData.workstationEfficiency.filter(
                    w => w.status === 'ACTIVE'
                  ).length
                }
                icon='🏭'
                color={theme.colors.success}
                trendValue={`${Math.round((dashboardData.workstationEfficiency.filter(w => w.status === 'ACTIVE').length / dashboardData.overview.totalWorkstations) * 100)}%`}
                trend='up'
              />
            </StatsGrid>
          </>
        )}

        {/* Manufacturing Alerts & Critical Information */}
        {dashboardData &&
          showDashboard &&
          !loading &&
          (dashboardData.alerts.flaggedSteps.length > 0 ||
            dashboardData.alerts.overdueBatches.length > 0) && (
            <div
              style={{
                width: '100%',
                maxWidth: 1100,
                margin: '0 auto 32px auto',
              }}
            >
              <Title
                order={3}
                style={{
                  color: '#f1f5f9',
                  marginBottom: 16,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '1.2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.2rem',
                    height: '1.2rem',
                    lineHeight: 1,
                  }}
                >
                  ⚠️
                </span>{' '}
                Manufacturing Alerts
              </Title>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: 20,
                }}
              >
                {/* Overdue Batches Alert */}
                {dashboardData.alerts.overdueBatches.length > 0 && (
                  <Alert
                    icon={
                      <span
                        style={{
                          fontSize: '16px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '16px',
                          height: '16px',
                          lineHeight: 1,
                        }}
                      >
                        🚨
                      </span>
                    }
                    title={`${dashboardData.alerts.overdueBatches.length} Overdue Batches`}
                    color='red'
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {dashboardData.alerts.overdueBatches
                      .slice(0, 3)
                      .map(batch => (
                        <Text
                          key={batch.id}
                          size='sm'
                          style={{ color: '#fca5a5', marginBottom: 4 }}
                        >
                          • Batch {batch.batch} at {batch.workstation} -{' '}
                          {batch.overdue}h overdue
                        </Text>
                      ))}
                    {dashboardData.alerts.overdueBatches.length > 3 && (
                      <Text
                        size='sm'
                        style={{ color: '#fca5a5', fontStyle: 'italic' }}
                      >
                        ... and {dashboardData.alerts.overdueBatches.length - 3}{' '}
                        more
                      </Text>
                    )}
                  </Alert>
                )}
                {/* Flagged Steps Alert */}
                {dashboardData.alerts.flaggedSteps.length > 0 && (
                  <Alert
                    icon={
                      <span
                        style={{
                          fontSize: '16px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '16px',
                          height: '16px',
                          lineHeight: 1,
                        }}
                      >
                        ⏱️
                      </span>
                    }
                    title={`${dashboardData.alerts.flaggedSteps.length} Long-Running Steps`}
                    color='yellow'
                    style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {dashboardData.alerts.flaggedSteps.slice(0, 3).map(step => (
                      <Text
                        key={step.id}
                        size='sm'
                        style={{ color: '#fbbf24', marginBottom: 4 }}
                      >
                        • {step.step} at {step.workstation} -{' '}
                        {Math.round(step.duration)}min
                      </Text>
                    ))}
                    {dashboardData.alerts.flaggedSteps.length > 3 && (
                      <Text
                        size='sm'
                        style={{ color: '#fbbf24', fontStyle: 'italic' }}
                      >
                        ... and {dashboardData.alerts.flaggedSteps.length - 3}{' '}
                        more
                      </Text>
                    )}
                  </Alert>
                )}
              </div>
            </div>
          )}

        {/* Live Workstation Status */}
        {dashboardData &&
          showDashboard &&
          !loading &&
          dashboardData.workstationEfficiency.length > 0 && (
            <div
              style={{
                width: '100%',
                maxWidth: 900,
                margin: '0 auto 32px auto',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title
                  order={3}
                  style={{
                    color: '#f1f5f9',
                    marginBottom: 8,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  Workstation Status
                </Title>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 20,
                }}
              >
                {dashboardData.workstationEfficiency.slice(0, 4).map(ws => (
                  <Card
                    key={ws.workstationId}
                    padding='md'
                    style={{
                      background: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(51, 65, 85, 0.8)',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Stack gap='xs'>
                      <Group justify='space-between' align='center'>
                        <Text fw={600} size='md' style={{ color: '#f1f5f9' }}>
                          {ws.name}
                        </Text>
                        <Badge
                          color={getStatusColor(ws.status)}
                          variant='filled'
                          size='sm'
                        >
                          {ws.status}
                        </Badge>
                      </Group>
                      {ws.currentOperator && (
                        <Text
                          size='sm'
                          style={{
                            color: '#cbd5e1',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '14px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '14px',
                              height: '14px',
                              lineHeight: 1,
                            }}
                          >
                            👤
                          </span>
                          {ws.currentOperator}
                        </Text>
                      )}
                      <Group gap='md'>
                        <div style={{ textAlign: 'center' }}>
                          <Text size='lg' fw={700} style={{ color: '#10b981' }}>
                            {ws.activeJobs}
                          </Text>
                          <Text size='xs' style={{ color: '#94a3b8' }}>
                            Active
                          </Text>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <Text size='lg' fw={700} style={{ color: '#f59e0b' }}>
                            {ws.queuedJobs}
                          </Text>
                          <Text size='xs' style={{ color: '#94a3b8' }}>
                            Queued
                          </Text>
                        </div>
                      </Group>
                    </Stack>
                  </Card>
                ))}
              </div>
            </div>
          )}
      </div>{' '}
      {/* End of Collapsible Dashboard Content */}
    </StandardPage>
  );
}
