/**
 * Bulk Actions Toolbar for batch management
 */

import React, { useState } from 'react';
import {
  Group,
  Button,
  Badge,
  ActionIcon,
  Text,
  Modal,
  Stack,
  Select,
  Alert,
  Loader,
} from '@mantine/core';
import {
  IconTrash,
  IconDownload,
  IconX,
  IconAlertTriangle,
} from '@tabler/icons-react';
import type { BulkActions } from '../hooks/useBulkSelection';

interface BulkActionsToolbarProps {
  selectedCount: number;
  bulkActions: BulkActions;
  isProcessing: boolean;
}

export const BulkActionsToolbar: React.FC<BulkActionsToolbarProps> = ({
  selectedCount,
  bulkActions,
  isProcessing,
}) => {
  const [priorityModalOpen, setPriorityModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (selectedCount === 0) {
    return null;
  }

  const handlePriorityUpdate = async () => {
    if (!selectedPriority) return;
    
    try {
      setError(null);
      await bulkActions.updatePriority(selectedPriority as 'RUSH' | 'STANDARD' | 'HOLD');
      setPriorityModalOpen(false);
      setSelectedPriority('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update priority');
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;
    
    try {
      setError(null);
      await bulkActions.updateStatus(selectedStatus);
      setStatusModalOpen(false);
      setSelectedStatus('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);
      await bulkActions.deleteBatches();
      setDeleteModalOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete batches');
    }
  };

  const handleExport = () => {
    bulkActions.exportBatches();
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
          border: '1px solid rgba(51, 65, 85, 0.4)',
          borderRadius: '16px',
          padding: '16px 24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          minWidth: '400px',
        }}
      >
        <Group justify="space-between" align="center">
          <Group gap="md">
            <Badge
              color="blue"
              variant="filled"
              size="lg"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                fontSize: '0.9rem',
                padding: '8px 12px',
              }}
            >
              {selectedCount} selected
            </Badge>
            
            <Group gap="xs">
              {/* Priority Update */}
              <Button
                size="sm"
                variant="light"
                onClick={() => setPriorityModalOpen(true)}
                disabled={isProcessing}
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#93c5fd',
                }}
              >
                Update Priority
              </Button>

              {/* Status Update */}
              <Button
                size="sm"
                variant="light"
                onClick={() => setStatusModalOpen(true)}
                disabled={isProcessing}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#6ee7b7',
                }}
              >
                Update Status
              </Button>

              {/* Export */}
              <Button
                size="sm"
                variant="light"
                leftSection={<IconDownload size={16} />}
                onClick={handleExport}
                disabled={isProcessing}
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#fbbf24',
                }}
              >
                Export
              </Button>

              {/* Delete */}
              <Button
                size="sm"
                variant="light"
                leftSection={<IconTrash size={16} />}
                onClick={() => setDeleteModalOpen(true)}
                disabled={isProcessing}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                }}
              >
                Delete
              </Button>
            </Group>
          </Group>

          <Group gap="xs">
            {isProcessing && <Loader size="sm" color="blue" />}
            
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={bulkActions.clearSelection}
              disabled={isProcessing}
              style={{ color: '#94a3b8' }}
            >
              <IconX size={16} />
            </ActionIcon>
          </Group>
        </Group>

        {error && (
          <Alert
            color="red"
            title="Error"
            style={{ 
              marginTop: 12,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <Text style={{ color: '#fca5a5' }}>{error}</Text>
          </Alert>
        )}
      </div>

      {/* Priority Update Modal */}
      <Modal
        opened={priorityModalOpen}
        onClose={() => setPriorityModalOpen(false)}
        title="Update Priority"
        centered
      >
        <Stack gap="md">
          <Text size="sm" style={{ color: '#6b7280' }}>
            Update priority for {selectedCount} selected batches
          </Text>
          
          <Select
            label="New Priority"
            placeholder="Select priority"
            value={selectedPriority}
            onChange={(value) => setSelectedPriority(value || '')}
            data={[
              { value: 'RUSH', label: 'Rush' },
              { value: 'STANDARD', label: 'Standard' },
              { value: 'HOLD', label: 'Hold' },
            ]}
          />

          <Group justify="flex-end" gap="sm">
            <Button
              variant="subtle"
              onClick={() => setPriorityModalOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePriorityUpdate}
              disabled={!selectedPriority || isProcessing}
              loading={isProcessing}
            >
              Update Priority
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Status Update Modal */}
      <Modal
        opened={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        title="Update Status"
        centered
      >
        <Stack gap="md">
          <Text size="sm" style={{ color: '#6b7280' }}>
            Update status for {selectedCount} selected batches
          </Text>
          
          <Select
            label="New Status"
            placeholder="Select status"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value || '')}
            data={[
              { value: 'QUEUED', label: 'Queued' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'ON_HOLD', label: 'On Hold' },
              { value: 'CANCELLED', label: 'Cancelled' },
            ]}
          />

          <Group justify="flex-end" gap="sm">
            <Button
              variant="subtle"
              onClick={() => setStatusModalOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              disabled={!selectedStatus || isProcessing}
              loading={isProcessing}
            >
              Update Status
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Batches"
        centered
      >
        <Stack gap="md">
          <Alert color="red" icon={<IconAlertTriangle size={16} />}>
            <Text size="sm">
              Are you sure you want to delete {selectedCount} selected batches? 
              This action cannot be undone.
            </Text>
          </Alert>

          <Group justify="flex-end" gap="sm">
            <Button
              variant="subtle"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDelete}
              disabled={isProcessing}
              loading={isProcessing}
            >
              Delete Batches
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
