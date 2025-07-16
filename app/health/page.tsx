'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Badge, Stack, Group, Loader, Alert } from '@mantine/core';
import { IconCheck, IconX, IconDatabase, IconServer, IconClock } from '@tabler/icons-react';

/**
 * Health Data Interface
 * Defines the structure of the health check response from the API
 */
interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  database: {
    status: string;
    responseTime?: string;
    error?: string;
  };
  version: string;
  platform: {
    os: string;
    arch: string;
    node: string;
  };
}

/**
 * System Health Dashboard Page
 * 
 * Provides a visual, user-friendly interface for monitoring system health.
 * Features:
 * - Real-time health status display
 * - Database connectivity monitoring
 * - System information overview
 * - Auto-refresh functionality
 * - Error handling and display
 * 
 * This page consumes the /api/health endpoint and presents the data
 * in an easy-to-read format for system administrators and stakeholders.
 */
export default function HealthPage() {
  // State management for health data and UI state
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetches health data from the API endpoint
     * Handles errors gracefully and updates state accordingly
     */
    const fetchHealthData = async () => {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setHealthData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch health data');
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    fetchHealthData();
    
    // Set up automatic refresh every 30 seconds
    // This ensures the dashboard stays current with system status
    const interval = setInterval(fetchHealthData, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  /**
   * Formats uptime seconds into human-readable format
   * @param seconds - Uptime in seconds
   * @returns Formatted string (e.g., "2d 3h 45m" or "30m 15s")
   */
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  // Loading state display
  if (loading) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading health status...</Text>
        </Stack>
      </Container>
    );
  }

  // Error state display
  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert variant="light" color="red" title="Error" icon={<IconX size="1rem" />}>
          Failed to load health status: {error}
        </Alert>
      </Container>
    );
  }

  // No data state (should rarely occur)
  if (!healthData) {
    return (
      <Container size="md" py="xl">
        <Text>No health data available</Text>
      </Container>
    );
  }

  // Determine health status for conditional styling
  const isHealthy = healthData.status === 'ok';
  const isDatabaseHealthy = healthData.database.status === 'connected';

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>System Health Status</Title>
          <Badge 
            size="lg" 
            color={isHealthy ? 'green' : 'red'} 
            leftSection={isHealthy ? <IconCheck size="1rem" /> : <IconX size="1rem" />}
          >
            {isHealthy ? 'Healthy' : 'Unhealthy'}
          </Badge>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={500} size="lg">Overall Status</Text>
              <Badge color={isHealthy ? 'green' : 'red'}>
                {healthData.status.toUpperCase()}
              </Badge>
            </Group>
            
            <Group>
              <IconClock size="1rem" />
              <Text size="sm" c="dimmed">
                Last checked: {new Date(healthData.timestamp).toLocaleString()}
              </Text>
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={500} size="lg">Database</Text>
              <Badge color={isDatabaseHealthy ? 'green' : 'red'}>
                {healthData.database.status.toUpperCase()}
              </Badge>
            </Group>
            
            <Group>
              <IconDatabase size="1rem" />
              <Text size="sm">
                Status: {healthData.database.status}
                {healthData.database.responseTime && (
                  <Text span c="dimmed" ml="xs">
                    ({healthData.database.responseTime})
                  </Text>
                )}
              </Text>
            </Group>

            {healthData.database.error && (
              <Alert variant="light" color="red">
                {healthData.database.error}
              </Alert>
            )}
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={500} size="lg">System Information</Text>
              <IconServer size="1.2rem" />
            </Group>
            
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Uptime:</Text>
                <Text size="sm">{formatUptime(healthData.uptime)}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Environment:</Text>
                <Badge variant="light" size="sm">
                  {healthData.environment}
                </Badge>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Version:</Text>
                <Text size="sm">{healthData.version}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Platform:</Text>
                <Text size="sm">
                  {healthData.platform.os} {healthData.platform.arch}
                </Text>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Node.js:</Text>
                <Text size="sm">{healthData.platform.node}</Text>
              </Group>
            </Stack>
          </Stack>
        </Card>

        <Text size="xs" c="dimmed" ta="center">
          This page refreshes automatically every 30 seconds
        </Text>
      </Stack>
    </Container>
  );
}
