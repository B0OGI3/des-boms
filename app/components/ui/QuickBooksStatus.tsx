'use client';

/**
 * QuickBooks Connection Status Component
 * 
 * Displays the current QuickBooks integration status with real-time updates.
 * Shows connection status, provides connection/reconnection actions.
 */

import { useEffect, useState } from 'react';
import { Badge, Button, Group, Loader, Text, Tooltip, Alert } from '@mantine/core';
import { IconRefresh, IconPlugConnected, IconPlugConnectedX, IconAlertTriangle } from '@tabler/icons-react';

interface QuickBooksStatusData {
  isConfigured: boolean;
  hasValidTokens: boolean;
  hasTokensInEnv: boolean;
  isSandbox: boolean;
  status: 'connected' | 'configured' | 'not_configured' | 'token_expired' | 'error';
  message: string;
  connectionTestError?: string;
}

interface QuickBooksStatusProps {
  readonly compact?: boolean;
  readonly showActions?: boolean;
  readonly onConnectionChange?: (connected: boolean) => void;
}

export function QuickBooksStatus({ 
  compact = false, 
  showActions = true,
  onConnectionChange 
}: QuickBooksStatusProps) {
  const [status, setStatus] = useState<QuickBooksStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setError(null);
      const response = await fetch('/api/quickbooks/status');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data: QuickBooksStatusData = await response.json();
      setStatus(data);
      
      // Notify parent component of connection status
      if (onConnectionChange) {
        onConnectionChange(data.status === 'connected');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch status';
      setError(errorMessage);
      console.error('Error fetching QuickBooks status:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Refresh status every 30 seconds to detect token changes
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStatus();
  };

  const handleConnect = () => {
    // For development, use ngrok URL; for production, use current origin
    const isDev = window.location.hostname === 'localhost';
    const baseUrl = isDev 
      ? 'https://noticeably-full-llama.ngrok-free.app'
      : window.location.origin;
    
    // Open QuickBooks OAuth in new window
    window.open(`${baseUrl}/api/quickbooks/auth`, '_blank', 'width=600,height=700');
    
    // Listen for the OAuth completion
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from either localhost or ngrok
      const validOrigins = [window.location.origin, baseUrl];
      if (!validOrigins.includes(event.origin)) return;
      
      if (event.data.type === 'quickbooks-oauth-complete') {
        // Refresh status after OAuth completion
        setTimeout(() => {
          fetchStatus();
        }, 2000);
        window.removeEventListener('message', handleMessage);
      }
    };
    
    window.addEventListener('message', handleMessage);
  };

  const handleTestConnection = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/quickbooks/sync-customers', { method: 'POST' });
      if (response.ok) {
        await fetchStatus();
      } else {
        throw new Error('Connection test failed');
      }
    } catch (err) {
      console.error('Connection test error:', err);
      setError('Connection test failed');
      setTimeout(() => setError(null), 5000);
    } finally {
      setRefreshing(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Group gap="xs">
        <Loader size="xs" />
        <Text size="sm" c="dimmed">Checking QuickBooks...</Text>
      </Group>
    );
  }

  // Error state
  if (error) {
    return (
      <Group gap="xs">
        <IconAlertTriangle size={16} color="red" />
        <Text size="sm" c="red">QB Status Error</Text>
        {showActions && (
          <Button
            size="xs"
            variant="subtle"
            color="red"
            onClick={handleRefresh}
            loading={refreshing}
          >
            Retry
          </Button>
        )}
      </Group>
    );
  }

  if (!status) return null;

  // Get badge props based on status
  const getBadgeProps = () => {
    switch (status.status) {
      case 'connected':
        return {
          color: 'green',
          variant: 'filled' as const,
          icon: <IconPlugConnected size={12} />,
          text: compact ? 'QB Connected' : 'QuickBooks Connected'
        };
      case 'token_expired':
        return {
          color: 'orange',
          variant: 'filled' as const,
          icon: <IconAlertTriangle size={12} />,
          text: compact ? 'QB Expired' : 'QuickBooks Token Expired'
        };
      case 'configured':
        return {
          color: 'yellow',
          variant: 'filled' as const,
          icon: <IconPlugConnectedX size={12} />,
          text: compact ? 'QB Ready' : 'QuickBooks Ready (Not Connected)'
        };
      case 'not_configured':
        return {
          color: 'gray',
          variant: 'outline' as const,
          icon: <IconPlugConnectedX size={12} />,
          text: compact ? 'QB Not Setup' : 'QuickBooks Not Configured'
        };
      case 'error':
        return {
          color: 'red',
          variant: 'filled' as const,
          icon: <IconAlertTriangle size={12} />,
          text: compact ? 'QB Error' : 'QuickBooks Error'
        };
      default:
        return {
          color: 'gray',
          variant: 'outline' as const,
          icon: <IconPlugConnectedX size={12} />,
          text: 'Unknown Status'
        };
    }
  };

  const badgeProps = getBadgeProps();

  // Compact view - badge with optional action button
  if (compact) {
    return (
      <Group gap="xs" align="center">
        <Tooltip label={status.message} position="bottom">
          <Badge
            color={badgeProps.color}
            variant={badgeProps.variant}
            leftSection={badgeProps.icon}
            size="sm"
          >
            {badgeProps.text}
          </Badge>
        </Tooltip>
        
        {showActions && (status.status === 'configured' || status.status === 'token_expired') && (
          <Button
            size="xs"
            variant="light"
            color="blue"
            onClick={handleConnect}
            disabled={refreshing}
          >
            {status.status === 'token_expired' ? 'Reconnect' : 'Connect'}
          </Button>
        )}
      </Group>
    );
  }

  // Full view with actions
  return (
    <Group gap="md" align="center">
      <Tooltip label={status.message} position="bottom">
        <Badge
          color={badgeProps.color}
          variant={badgeProps.variant}
          leftSection={badgeProps.icon}
          size="md"
        >
          {badgeProps.text}
          {status.isSandbox && ' (Sandbox)'}
        </Badge>
      </Tooltip>

      {showActions && (
        <Group gap="xs">
          {(status.status === 'configured' || status.status === 'token_expired') && (
            <Button
              size="xs"
              variant="light"
              color="blue"
              onClick={handleConnect}
              disabled={refreshing}
            >
              {status.status === 'token_expired' ? 'Reconnect' : 'Connect'}
            </Button>
          )}
          
          {status.status === 'connected' && (
            <Button
              size="xs"
              variant="subtle"
              color="green"
              onClick={handleTestConnection}
              loading={refreshing}
            >
              Test
            </Button>
          )}
          
          <Button
            size="xs"
            variant="subtle"
            color="gray"
            onClick={handleRefresh}
            loading={refreshing}
          >
            <IconRefresh size={12} />
          </Button>
        </Group>
      )}

      {/* Show error alert if there's a connection issue */}
      {(status.status === 'error' || status.status === 'token_expired') && !compact && (
        <Alert
          color={status.status === 'token_expired' ? 'orange' : 'red'}
          variant="light"
          style={{ marginTop: 8 }}
        >
          <Text size="xs">{status.message}</Text>
          {status.status === 'token_expired' && (
            <Text size="xs" c="dimmed" style={{ marginTop: 4 }}>
              Click &quot;Reconnect&quot; to renew your QuickBooks authorization.
            </Text>
          )}
        </Alert>
      )}
    </Group>
  );
}
