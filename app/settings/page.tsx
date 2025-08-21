'use client';

import { Title, Text, Card, Stack, Group } from '@mantine/core';
import Link from 'next/link';
import { QuickBooksStatus } from '../components/ui/QuickBooksStatus';
import { QuickBooksCustomerSync } from '../components/ui/QuickBooksCustomerSync';
import { LoadingScreen } from '../components/LoadingScreen';
import { usePageInitialization } from '@/hooks/usePageInitialization';
import { StandardPage } from '../components/ui/StandardPage';
import theme from '../theme';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const { isPageReady, pageInitialization, getProgress } =
    usePageInitialization({
      initialTasks: ['settings', 'quickbooks'],
      autoStart: true,
    });

  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backups, setBackups] = useState<any[]>([]);

  const loadBackups = async () => {
    try {
      const response = await fetch('/api/admin/backup');
      const data = await response.json();
      if (data.success) {
        setBackups(data.backups || []);
      }
    } catch (error) {
      console.error('Failed to load backups:', error);
    }
  };

  const handleManualBackup = async () => {
    setIsBackingUp(true);
    try {
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
      });
      const result = await response.json();

      if (result.success) {
        console.log('Backup created:', result.backup);
        await loadBackups(); // Refresh backup list
      } else {
        console.error('Backup failed:', result.error);
      }
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setIsBackingUp(false);
    }
  };

  useEffect(() => {
    if (isPageReady) {
      loadBackups();
    }
  }, [isPageReady]);

  if (!isPageReady) {
    return (
      <LoadingScreen
        title='Loading Settings'
        description='Initializing system configuration...'
        icon='⚙️'
        pageInitialization={pageInitialization}
        progress={getProgress()}
      />
    );
  }

  return (
    <StandardPage
      title='System Settings'
      subtitle='Configure your Batch Order Management System'
      icon='⚙️'
      accentColor={theme.pageAccents.settings}
      showBackButton={true}
    >
      <Stack gap='xl'>
        {/* QuickBooks Integration Section */}
        <Card
          padding='xl'
          style={{
            background: theme.colors.cardPrimary,
            border: `1px solid ${theme.colors.borderPrimary}`,
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.lg,
            backdropFilter: 'blur(12px)',
          }}
        >
          <Stack gap='md'>
            <Group justify='space-between' align='center'>
              <div>
                <Title order={3} style={{ color: '#f1f5f9', marginBottom: 8 }}>
                  💰 QuickBooks Integration
                </Title>
                <Text style={{ color: '#94a3b8' }}>
                  Manage customer data synchronization with QuickBooks Online
                </Text>
              </div>
            </Group>

            <QuickBooksStatus
              compact={false}
              showActions={true}
              onConnectionChange={connected => {
                if (connected) {
                  console.log('QuickBooks connected successfully');
                }
              }}
            />

            {/* Customer Sync Controls */}
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: '1px solid rgba(51, 65, 85, 0.3)',
              }}
            >
              <Text
                size='sm'
                style={{ color: '#e2e8f0', marginBottom: 12, fontWeight: 500 }}
              >
                Customer Data Synchronization
              </Text>
              <QuickBooksCustomerSync
                onSyncComplete={result => {
                  console.log('Sync completed:', result);
                }}
              />
            </div>
          </Stack>
        </Card>

        {/* System & Security Settings */}
        <Card
          padding='xl'
          style={{
            background: theme.colors.cardPrimary,
            border: `1px solid ${theme.colors.borderPrimary}`,
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.lg,
            backdropFilter: 'blur(12px)',
          }}
        >
          <Stack gap='lg'>
            <Group justify='space-between' align='center'>
              <div>
                <Title order={3} style={{ color: '#f1f5f9', marginBottom: 8 }}>
                  🔒 System & Security
                </Title>
                <Text style={{ color: '#94a3b8' }}>
                  Configure system-wide settings, security, and data management
                  preferences
                </Text>
              </div>
            </Group>

            <Group grow align='flex-start'>
              {/* Database Settings */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(51, 65, 85, 0.4)',
                }}
              >
                <Title
                  order={4}
                  style={{
                    color: '#e2e8f0',
                    marginBottom: 16,
                    fontSize: '1.1rem',
                  }}
                >
                  💾 Database & Backup
                </Title>
                <Stack gap='md'>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Auto-backup Schedule
                    </Text>
                    <div
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      ✓ Daily at 2:00 AM
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Backup Retention
                    </Text>
                    <div
                      style={{
                        background: theme.colors.inputBackground,
                        border: `1px solid ${theme.colors.inputBorder}`,
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: theme.colors.textSecondary,
                        fontSize: '0.875rem',
                      }}
                    >
                      30 days
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Manual Backup
                    </Text>
                    <button
                      onClick={handleManualBackup}
                      disabled={isBackingUp}
                      style={{
                        background: isBackingUp
                          ? 'rgba(59, 130, 246, 0.5)'
                          : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        border: 'none',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 16px',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: isBackingUp ? 'not-allowed' : 'pointer',
                        width: '100%',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isBackingUp
                        ? '⏳ Creating Backup...'
                        : '📁 Create Backup Now'}
                    </button>
                  </div>
                  {backups.length > 0 && (
                    <div>
                      <Text
                        size='sm'
                        style={{ color: '#cbd5e1', marginBottom: 6 }}
                      >
                        Recent Backups ({backups.length})
                      </Text>
                      <div
                        style={{
                          background: theme.colors.inputBackground,
                          border: `1px solid ${theme.colors.inputBorder}`,
                          borderRadius: theme.borderRadius.md,
                          padding: '8px 12px',
                          fontSize: '0.75rem',
                          maxHeight: '100px',
                          overflowY: 'auto',
                        }}
                      >
                        {backups.slice(0, 3).map((backup, index) => (
                          <div
                            key={backup.filename}
                            style={{
                              color: theme.colors.textMuted,
                              marginBottom: index < 2 ? '4px' : '0',
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>
                              {new Date(backup.created).toLocaleDateString()}
                            </span>
                            <span>{backup.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Stack>
              </div>

              {/* Notification Settings */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(51, 65, 85, 0.4)',
                }}
              >
                <Title
                  order={4}
                  style={{
                    color: '#e2e8f0',
                    marginBottom: 16,
                    fontSize: '1.1rem',
                  }}
                >
                  🔔 Notifications & Alerts
                </Title>
                <Stack gap='md'>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Order Due Date Alerts
                    </Text>
                    <div
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      ✓ 3 days before due
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      QC Failure Notifications
                    </Text>
                    <div
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      ✓ Immediate
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Material Low Stock Alerts
                    </Text>
                    <div
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      ✓ Below safety stock
                    </div>
                  </div>
                </Stack>
              </div>
            </Group>
          </Stack>
        </Card>

        {/* User Preferences */}
        <Card
          padding='xl'
          style={{
            background: theme.colors.cardPrimary,
            border: `1px solid ${theme.colors.borderPrimary}`,
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.lg,
            backdropFilter: 'blur(12px)',
          }}
        >
          <Stack gap='lg'>
            <Group justify='space-between' align='center'>
              <div>
                <Title order={3} style={{ color: '#f1f5f9', marginBottom: 8 }}>
                  👤 User Preferences
                </Title>
                <Text style={{ color: '#94a3b8' }}>
                  Customize your interface and workflow preferences
                </Text>
              </div>
            </Group>

            <Group grow align='flex-start'>
              {/* Display Settings */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(51, 65, 85, 0.4)',
                }}
              >
                <Title
                  order={4}
                  style={{
                    color: '#e2e8f0',
                    marginBottom: 16,
                    fontSize: '1.1rem',
                  }}
                >
                  🖥️ Display & Interface
                </Title>
                <Stack gap='md'>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Theme
                    </Text>
                    <div
                      style={{
                        background: theme.colors.inputBackground,
                        border: `1px solid ${theme.colors.inputBorder}`,
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: theme.colors.textSecondary,
                        fontSize: '0.875rem',
                      }}
                    >
                      Dark Manufacturing
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Default Page Size
                    </Text>
                    <div
                      style={{
                        background: theme.colors.inputBackground,
                        border: `1px solid ${theme.colors.inputBorder}`,
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: theme.colors.textSecondary,
                        fontSize: '0.875rem',
                      }}
                    >
                      25 items
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Auto-refresh Dashboard
                    </Text>
                    <div
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      ✓ Every 30 seconds
                    </div>
                  </div>
                </Stack>
              </div>

              {/* Workflow Settings */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(51, 65, 85, 0.4)',
                }}
              >
                <Title
                  order={4}
                  style={{
                    color: '#e2e8f0',
                    marginBottom: 16,
                    fontSize: '1.1rem',
                  }}
                >
                  ⚡ Workflow Preferences
                </Title>
                <Stack gap='md'>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Default Order View
                    </Text>
                    <div
                      style={{
                        background: theme.colors.inputBackground,
                        border: `1px solid ${theme.colors.inputBorder}`,
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: theme.colors.textSecondary,
                        fontSize: '0.875rem',
                      }}
                    >
                      By Due Date
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Show Completed Orders
                    </Text>
                    <div
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: '#ef4444',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      ✗ Hide after 30 days
                    </div>
                  </div>
                  <div>
                    <Text
                      size='sm'
                      style={{ color: '#cbd5e1', marginBottom: 6 }}
                    >
                      Quick Actions Toolbar
                    </Text>
                    <div
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: theme.borderRadius.md,
                        padding: '8px 12px',
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      ✓ Always Visible
                    </div>
                  </div>
                </Stack>
              </div>
            </Group>
          </Stack>
        </Card>

        {/* System Information */}
        <Card
          padding='xl'
          style={{
            background: 'rgba(30, 41, 59, 0.85)',
            border: '1px solid rgba(51, 65, 85, 0.7)',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Stack gap='md'>
            <Title order={3} style={{ color: '#f1f5f9', marginBottom: 8 }}>
              ℹ️ System Information
            </Title>

            <Group grow>
              <div style={{ textAlign: 'center' }}>
                <Text size='sm' style={{ color: '#94a3b8', marginBottom: 4 }}>
                  DES-BOMS Version
                </Text>
                <Text style={{ color: '#f1f5f9', fontWeight: 600 }}>
                  v1.0.0
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Text size='sm' style={{ color: '#94a3b8', marginBottom: 4 }}>
                  Database Status
                </Text>
                <Text style={{ color: '#22c55e', fontWeight: 600 }}>
                  ✓ Connected
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Text size='sm' style={{ color: '#94a3b8', marginBottom: 4 }}>
                  Last Backup
                </Text>
                <Text style={{ color: '#f1f5f9', fontWeight: 600 }}>
                  Today 2:00 AM
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Text size='sm' style={{ color: '#94a3b8', marginBottom: 4 }}>
                  Active Users
                </Text>
                <Text style={{ color: '#f1f5f9', fontWeight: 600 }}>
                  12 online
                </Text>
              </div>
            </Group>

            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(51, 65, 85, 0.3)',
              }}
            >
              <Link href='/' style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  ← Back to Dashboard
                </button>
              </Link>
            </div>
          </Stack>
        </Card>
      </Stack>
    </StandardPage>
  );
}
