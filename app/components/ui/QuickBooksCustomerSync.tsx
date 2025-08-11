'use client';

/**
 * QuickBooks Customer Sync Component
 * 
 * Provides manual customer synchronization controls and displays sync status.
 */

import { useState } from 'react';
import { Button, Group, Text, Alert, Progress, Loader } from '@mantine/core';
import { IconDownload, IconUpload, IconCheck, IconX } from '@tabler/icons-react';

interface SyncResult {
  imported?: number;
  deleted?: string[];
  error?: string;
}

interface QuickBooksCustomerSyncProps {
  readonly onSyncComplete?: (result: SyncResult) => void;
}

export function QuickBooksCustomerSync({ onSyncComplete }: QuickBooksCustomerSyncProps) {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/quickbooks/sync-customers', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const syncResult: SyncResult = await response.json();
      setResult(syncResult);
      
      if (onSyncComplete) {
        onSyncComplete(syncResult);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sync failed';
      setError(errorMessage);
      setResult({ error: errorMessage });
    } finally {
      setSyncing(false);
    }
  };

  const handleImportCustomers = async () => {
    setSyncing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/quickbooks/import-customers', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Import failed');
      }

      const importResult = await response.json();
      setResult({ imported: importResult.imported });
      
      if (onSyncComplete) {
        onSyncComplete({ imported: importResult.imported });
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Import failed';
      setError(errorMessage);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div>
      <Group gap="md" align="center" style={{ marginBottom: 16 }}>
        <Button
          leftSection={<IconDownload size={16} />}
          onClick={handleSync}
          loading={syncing}
          disabled={syncing}
          color="blue"
          variant="filled"
        >
          Sync Customers
        </Button>
        
        <Button
          leftSection={<IconUpload size={16} />}
          onClick={handleImportCustomers}
          loading={syncing}
          disabled={syncing}
          color="green"
          variant="light"
        >
          Import Only
        </Button>

        {syncing && (
          <Group gap="xs" align="center">
            <Loader size="sm" />
            <Text size="sm" c="dimmed">Syncing...</Text>
          </Group>
        )}
      </Group>

      {/* Sync Progress */}
      {syncing && (
        <Progress
          value={100}
          animated
          color="blue"
          size="sm"
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Success Result */}
      {result && !result.error && (
        <Alert
          color="green"
          variant="light"
          icon={<IconCheck size={16} />}
          style={{ marginBottom: 16 }}
        >
          <div>
            <Text fw={500} size="sm">Sync Completed Successfully</Text>
            {result.imported !== undefined && (
              <Text size="xs" c="dimmed">
                Imported {result.imported} customers from QuickBooks
              </Text>
            )}
            {result.deleted && result.deleted.length > 0 && (
              <Text size="xs" c="dimmed">
                Removed {result.deleted.length} customers no longer in QuickBooks
              </Text>
            )}
          </div>
        </Alert>
      )}

      {/* Error Result */}
      {(error || result?.error) && (
        <Alert
          color="red"
          variant="light"
          icon={<IconX size={16} />}
          style={{ marginBottom: 16 }}
        >
          <div>
            <Text fw={500} size="sm">Sync Failed</Text>
            <Text size="xs" c="dimmed">
              {error || result?.error}
            </Text>
          </div>
        </Alert>
      )}

      {/* Help Text */}
      <Text size="xs" c="dimmed">
        • <strong>Sync Customers:</strong> Full sync - imports new customers and removes deleted ones<br/>
        • <strong>Import Only:</strong> Import customers from QuickBooks without removing any local data
      </Text>
    </div>
  );
}
