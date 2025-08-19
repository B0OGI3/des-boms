import { useState, useCallback } from 'react';
import {
  Stack,
  Group,
  Text,
  Button,
  Card,
  Badge,
  ActionIcon,
  FileInput,
  Textarea,
  Alert,
  Tooltip,
} from '@mantine/core';
import {
  IconUpload,
  IconDownload,
  IconTrash,
  IconFile,
  IconFileText,
  IconPhoto,
  IconSettings,
  IconInfoCircle,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface FileAttachment {
  id: string;
  fileName: string;
  storedFileName: string;
  filePath: string;
  fileType: string;
  mimeType: string;
  fileSize: number;
  uploadedBy: string;
  description?: string;
  createdAt: string;
}

interface FileAttachmentManagerProps {
  readonly lineItemId: string;
  readonly attachments: FileAttachment[];
  readonly onAttachmentsChange: () => void;
  readonly readonly?: boolean;
}

export function FileAttachmentManager({
  lineItemId,
  attachments,
  onAttachmentsChange,
  readonly = false,
}: FileAttachmentManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');

  const getFileIcon = (mimeType: string, fileType: string) => {
    if (mimeType.startsWith('image/')) return <IconPhoto size={16} />;
    if (mimeType === 'application/pdf') return <IconFile size={16} color="red" />;
    if (fileType.toLowerCase().includes('dwg')) return <IconSettings size={16} color="blue" />;
    if (mimeType.startsWith('text/')) return <IconFileText size={16} />;
    return <IconFile size={16} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) {
      notifications.show({
        title: 'No files selected',
        message: 'Please select files to upload',
        color: 'orange',
      });
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('lineItemId', lineItemId);
        formData.append('uploadedBy', 'System User'); // Default user until auth context is implemented
        if (description.trim()) {
          formData.append('description', description.trim());
        }

        const response = await fetch('/api/uploads', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        return response.json();
      });

      await Promise.all(uploadPromises);

      notifications.show({
        title: 'Upload successful',
        message: `${selectedFiles.length} file(s) uploaded successfully`,
        color: 'green',
      });

      setSelectedFiles([]);
      setDescription('');
      onAttachmentsChange();
    } catch (error) {
      console.error('Upload error:', error);
      notifications.show({
        title: 'Upload failed',
        message: error instanceof Error ? error.message : 'Failed to upload files',
        color: 'red',
      });
    } finally {
      setUploading(false);
    }
  }, [selectedFiles, lineItemId, description, onAttachmentsChange]);

  const handleDelete = useCallback(async (fileId: string, fileName: string) => {
    if (!confirm(`Delete file "${fileName}"?`)) return;

    try {
      const response = await fetch(`/api/uploads?fileId=${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch {
          // If response isn't JSON, use status text
          error = { error: response.statusText || 'Delete failed' };
        }
        console.error('Delete file error response:', error);
        throw new Error(error.error || 'Delete failed');
      }

      // Try to consume response if successful
      try {
        await response.json();
      } catch {
        // Response might be empty, which is fine for a successful delete
        console.log('Delete file successful (empty response)');
      }

      notifications.show({
        title: 'File deleted',
        message: `"${fileName}" has been deleted`,
        color: 'green',
      });

      onAttachmentsChange();
    } catch (error) {
      console.error('Delete error:', error);
      notifications.show({
        title: 'Delete failed',
        message: error instanceof Error ? error.message : 'Failed to delete file',
        color: 'red',
      });
    }
  }, [onAttachmentsChange]);

  const handleDownload = useCallback((attachment: FileAttachment) => {
    // Open in new tab for download
    window.open(`/api/uploads/file/${attachment.id}`, '_blank');
  }, []);

  return (
    <Stack gap="md">
      {!readonly && (
        <Card withBorder p="md">
          <Stack gap="sm">
            <Text fw={600} size="sm">Upload Files</Text>
            <Text size="xs" c="dimmed">
              Supported: PDF, DWG, STEP, IGES, Images, Text files
            </Text>
            
            <FileInput
              multiple
              accept=".pdf,.dwg,.step,.stp,.iges,.igs,.jpg,.jpeg,.png,.txt,.doc,.docx"
              value={selectedFiles}
              onChange={setSelectedFiles}
              placeholder="Select files to upload..."
              leftSection={<IconUpload size={16} />}
            />

            {selectedFiles.length > 0 && (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description for all uploaded files..."
                rows={2}
                maxLength={500}
              />
            )}

            <Group justify="flex-end">
              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || uploading}
                loading={uploading}
                leftSection={<IconUpload size={16} />}
              >
                Upload {selectedFiles.length > 0 ? `${selectedFiles.length} file(s)` : ''}
              </Button>
            </Group>
          </Stack>
        </Card>
      )}

      {attachments.length === 0 ? (
        <Alert icon={<IconInfoCircle size={16} />} title="No files attached">
          {readonly 
            ? "No files have been attached to this line item."
            : "Upload drawings, CAD models, specifications, or other relevant files for this line item."
          }
        </Alert>
      ) : (
        <Stack gap="xs">
          <Text fw={600} size="sm">{attachments.length} Attached File(s)</Text>
          {attachments.map((attachment) => (
            <Card key={attachment.id} withBorder p="sm">
              <Group justify="space-between" wrap="nowrap">
                <Group gap="xs" style={{ flex: 1, minWidth: 0 }}>
                  {getFileIcon(attachment.mimeType, attachment.fileType)}
                  <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                    <Text size="sm" fw={500} truncate>
                      {attachment.fileName}
                    </Text>
                    <Group gap="xs">
                      <Badge size="xs" variant="light">
                        {attachment.fileType.toUpperCase()}
                      </Badge>
                      <Text size="xs" c="dimmed">
                        {formatFileSize(attachment.fileSize)}
                      </Text>
                      <Text size="xs" c="dimmed">
                        by {attachment.uploadedBy}
                      </Text>
                    </Group>
                    {attachment.description && (
                      <Text size="xs" c="dimmed" lineClamp={1}>
                        {attachment.description}
                      </Text>
                    )}
                  </Stack>
                </Group>

                <Group gap="xs">
                  <Tooltip label="Download">
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      onClick={() => handleDownload(attachment)}
                    >
                      <IconDownload size={16} />
                    </ActionIcon>
                  </Tooltip>
                  
                  {!readonly && (
                    <Tooltip label="Delete">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() => handleDelete(attachment.id, attachment.fileName)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
