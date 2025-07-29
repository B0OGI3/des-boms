/**
 * Enhanced Error Handling Components with Retry Logic
 */

import React from 'react';
import { Alert, Button, Stack, Text, Group, ThemeIcon } from '@mantine/core';
import { IconAlertCircle, IconRefresh, IconWifi, IconDatabase } from '@tabler/icons-react';

interface ErrorWithRetryProps {
  error: string | Error;
  onRetry?: () => void;
  title?: string;
  type?: 'network' | 'database' | 'general';
  showDetails?: boolean;
}

export const ErrorWithRetry: React.FC<ErrorWithRetryProps> = ({
  error,
  onRetry,
  title = "Something went wrong",
  type = 'general',
  showDetails = false
}) => {
  const errorMessage = error instanceof Error ? error.message : error;
  
  const getIcon = () => {
    switch (type) {
      case 'network':
        return <IconWifi size={20} />;
      case 'database':
        return <IconDatabase size={20} />;
      default:
        return <IconAlertCircle size={20} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'network':
        return 'orange';
      case 'database':
        return 'grape';
      default:
        return 'red';
    }
  };

  return (
    <Alert
      color={getColor()}
      title={
        <Group gap="xs">
          <ThemeIcon size="sm" color={getColor()} variant="light">
            {getIcon()}
          </ThemeIcon>
          <Text fw={600}>{title}</Text>
        </Group>
      }
      styles={{
        root: {
          background: "rgba(15, 23, 42, 0.95)",
          border: `1px solid rgba(239, 68, 68, 0.3)`,
          backdropFilter: "blur(16px)",
        },
        title: {
          color: "#f1f5f9",
        },
        body: {
          color: "#cbd5e1",
        }
      }}
    >
      <Stack gap="md">
        <Text size="sm">
          {errorMessage}
        </Text>
        
        {showDetails && error instanceof Error && error.stack && (
          <details>
            <summary style={{ cursor: 'pointer', color: '#94a3b8' }}>
              Technical Details
            </summary>
            <Text size="xs" c="dimmed" mt="xs" style={{ fontFamily: 'monospace' }}>
              {error.stack}
            </Text>
          </details>
        )}
        
        {onRetry && (
          <Group gap="sm">
            <Button
              size="sm"
              variant="outline"
              leftSection={<IconRefresh size={16} />}
              onClick={onRetry}
              style={{
                borderColor: "rgba(59, 130, 246, 0.5)",
                color: "#3b82f6",
              }}
            >
              Try Again
            </Button>
          </Group>
        )}
      </Stack>
    </Alert>
  );
};

// Specific error components for common scenarios
export const NetworkError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorWithRetry
    error="Unable to connect to the server. Please check your internet connection."
    onRetry={onRetry}
    title="Connection Error"
    type="network"
  />
);

export const DatabaseError: React.FC<{ onRetry?: () => void; details?: string }> = ({ onRetry, details }) => (
  <ErrorWithRetry
    error={details || "Database operation failed. This might be temporary."}
    onRetry={onRetry}
    title="Database Error"
    type="database"
  />
);

export const ValidationError: React.FC<{ message: string }> = ({ message }) => (
  <Alert
    color="yellow"
    title="Validation Error"
    styles={{
      root: {
        background: "rgba(15, 23, 42, 0.95)",
        border: "1px solid rgba(245, 158, 11, 0.3)",
      },
      title: { color: "#f1f5f9" },
      body: { color: "#cbd5e1" }
    }}
  >
    {message}
  </Alert>
);

// Loading error with automatic retry
export const LoadingError: React.FC<{
  error: string;
  onRetry: () => void;
  autoRetry?: boolean;
  retryCount?: number;
}> = ({ error, onRetry, autoRetry = false, retryCount = 0 }) => {
  React.useEffect(() => {
    if (autoRetry && retryCount < 3) {
      const timer = setTimeout(() => {
        onRetry();
      }, Math.pow(2, retryCount) * 1000); // Exponential backoff
      
      return () => clearTimeout(timer);
    }
  }, [autoRetry, retryCount, onRetry]);

  return (
    <ErrorWithRetry
      error={error}
      onRetry={onRetry}
      title={`Loading Failed ${retryCount > 0 ? `(Attempt ${retryCount + 1})` : ''}`}
      type="network"
    />
  );
};
