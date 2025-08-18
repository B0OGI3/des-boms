/**
 * OrderDetailsModal - View detailed information about an order
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Text,
  Group,
  Badge,
  Stack,
  Card,
  Divider,
  Grid,
  Button,
  ScrollArea,
  Collapse,
  ActionIcon,
  Box,
  LoadingOverlay
} from '@mantine/core';
import { IconCalendar, IconUser, IconFileText, IconPackage, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import type { Order } from '../hooks/useOrderSearch';
import { FileAttachmentManager } from './FileAttachmentManager';

// Type aliases for union types
type PartType = 'FINISHED_GOOD' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
type OrderOrNull = Order | null;
type EnhancedOrderOrNull = EnhancedOrder | null;

// Enhanced interface for full order data with line item IDs and file attachments
interface EnhancedLineItem {
  id: string;
  part: {
    id: string;
    partNumber: string;
    partName: string;
    partType: PartType;
    drawingNumber?: string;
    revisionLevel?: string;
    description?: string;
  };
  quantity: number;
  unitPrice?: number;
  notes?: string;
  fileAttachments?: Array<{
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
  }>;
}

interface EnhancedOrder extends Order {
  lineItems?: EnhancedLineItem[];
}

interface OrderDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  order: OrderOrNull;
  onEdit?: (order: Order) => void;
}

// Status badge colors
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING': return 'gray';
    case 'IN_PROGRESS': return 'blue';
    case 'COMPLETED': return 'green';
    case 'ON_HOLD': return 'yellow';
    case 'CANCELLED': return 'red';
    default: return 'gray';
  }
};

// Priority badge colors (aligned with DES-BOMS spec: Rush / Standard / Hold)
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'RUSH': return 'red';        // Urgent priority - red
    case 'STANDARD': return 'blue';   // Normal priority - blue
    case 'HOLD': return 'gray';       // On hold - gray
    // Legacy support for old priority values
    case 'HIGH': return 'orange';
    case 'NORMAL': return 'blue';
    case 'LOW': return 'gray';
    default: return 'gray';
  }
};

// Format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  opened,
  onClose,
  order,
  onEdit
}) => {
  const [enhancedOrder, setEnhancedOrder] = useState<EnhancedOrderOrNull>(null);
  const [loading, setLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Fetch full order data when modal opens
  useEffect(() => {
    const fetchEnhancedOrder = async () => {
      if (!order || !opened) {
        setEnhancedOrder(null);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/orders/${order.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const result = await response.json();
        if (result.success) {
          // Convert the Prisma result to our enhanced format
          const enhanced: EnhancedOrder = {
            ...order,
            lineItems: result.data.lineItems?.map((item: {
              id: string;
              part: {
                partNumber: string;
                partName: string;
                partType: string;
                drawingNumber?: string;
                revisionLevel?: string;
                description?: string;
              };
              quantity: number;
              unitPrice?: number;
              notes?: string;
              fileAttachments?: Array<{
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
              }>;
            }) => ({
              id: item.id,
              part: {
                id: '', // Placeholder since part ID not needed for display
                partNumber: item.part.partNumber,
                partName: item.part.partName,
                partType: item.part.partType as PartType,
                drawingNumber: item.part.drawingNumber,
                revisionLevel: item.part.revisionLevel,
                description: item.part.description,
              },
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              notes: item.notes,
              fileAttachments: item.fileAttachments || []
            })) || []
          };
          setEnhancedOrder(enhanced);
        }
      } catch (error) {
        console.error('Error fetching enhanced order data:', error);
        // Fallback to basic order data - transform to match interface
        setEnhancedOrder({
          ...order,
          lineItems: order.lineItems?.map((item, index) => ({
            id: `temp-${index}`, // Temporary ID for display only
            ...item,
            fileAttachments: []
          })) || []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnhancedOrder();
  }, [order, opened]);

  const refreshOrderData = useCallback(async () => {
    if (!order || !opened) return;
    
    try {
      const response = await fetch(`/api/orders/${order.id}`);
      if (!response.ok) return;
      
      const result = await response.json();
      if (result.success) {
        const enhanced: EnhancedOrder = {
          ...order,
          lineItems: result.data.lineItems?.map((apiItem: {
            id: string;
            part: {
              partNumber: string;
              partName: string;
              partType: string;
              drawingNumber?: string;
              revisionLevel?: string;
              description?: string;
            };
            quantity: number;
            unitPrice?: number;
            notes?: string;
            fileAttachments?: Array<{
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
            }>;
          }) => ({
            id: apiItem.id,
            part: {
              id: '', // Placeholder since part ID not needed for display
              partNumber: apiItem.part.partNumber,
              partName: apiItem.part.partName,
              partType: apiItem.part.partType as 'FINISHED_GOOD' | 'SEMI_FINISHED' | 'RAW_MATERIAL',
              drawingNumber: apiItem.part.drawingNumber,
              revisionLevel: apiItem.part.revisionLevel,
              description: apiItem.part.description,
            },
            quantity: apiItem.quantity,
            unitPrice: apiItem.unitPrice,
            notes: apiItem.notes,
            fileAttachments: apiItem.fileAttachments || []
          })) || []
        };
        setEnhancedOrder(enhanced);
      }
    } catch (error) {
      console.error('Error refreshing order data:', error);
    }
  }, [order, opened]);

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  if (!order) return null;

  // Use enhanced order data if available, fall back to basic order
  const displayOrder = enhancedOrder || order;

  const progressPercentage = displayOrder.assignedBatches > 0 
    ? Math.round((displayOrder.completedBatches / displayOrder.assignedBatches) * 100) 
    : 0;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconFileText size={20} />
          <Text fw={600} size="lg">Order Details</Text>
        </Group>
      }
      size="xl"
      scrollAreaComponent={ScrollArea.Autosize}
      styles={{
        content: { position: 'relative' }
      }}
    >
      <LoadingOverlay visible={loading} />
      <Stack gap="lg">
        {/* Order Header */}
        <Card withBorder>
          <Grid>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Order ID</Text>
                <Text fw={600} size="lg">{displayOrder.orderId}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">PO Number</Text>
                <Text fw={500}>{displayOrder.orderNumber}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Customer</Text>
                <Group gap="xs">
                  <IconUser size={16} />
                  <Text fw={500}>{displayOrder.customerName}</Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Status & Priority</Text>
                <Group gap="xs">
                  <Badge color={getStatusColor(displayOrder.status)} variant="filled">
                    {displayOrder.status.replace('_', ' ')}
                  </Badge>
                  <Badge color={getPriorityColor(displayOrder.priority)} variant="outline">
                    {displayOrder.priority}
                  </Badge>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Dates and Financial Info */}
        <Grid>
          <Grid.Col span={6}>
            <Card withBorder>
              <Stack gap="md">
                <Group gap="xs">
                  <IconCalendar size={18} />
                  <Text fw={500}>Important Dates</Text>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Order Date:</Text>
                    <Text size="sm">{formatDate(displayOrder.orderDate)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Due Date:</Text>
                    <Text size="sm" fw={500}>{formatDate(displayOrder.dueDate)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Days Until Due:</Text>
                    <Text size="sm" c={
                      (() => {
                        const daysUntilDue = Math.ceil((new Date(displayOrder.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                        if (daysUntilDue < 0) return 'red';
                        if (daysUntilDue < 7) return 'orange';
                        return 'green';
                      })()
                    }>
                      {Math.ceil((new Date(displayOrder.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder>
              <Stack gap="md">
                <Group gap="xs">
                  <IconPackage size={18} />
                  <Text fw={500}>Order Summary</Text>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Total Value:</Text>
                    <Text size="sm" fw={600} c="green">{formatCurrency(displayOrder.totalValue)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Line Items:</Text>
                    <Text size="sm">{displayOrder.itemCount}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Production Progress:</Text>
                    <Text size="sm">{displayOrder.completedBatches} / {displayOrder.assignedBatches} batches ({progressPercentage}%)</Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Line Items */}
        {displayOrder.lineItems && displayOrder.lineItems.length > 0 && (
          <Card withBorder>
            <Stack gap="md">
              <Text fw={500} size="md">Line Items</Text>
              <Divider />
              <ScrollArea>
                <Stack gap="md">
                  {displayOrder.lineItems.map((item, index) => {
                    // Check if this is an enhanced line item with ID
                    const isEnhanced = enhancedOrder && 'id' in item;
                    const enhancedItem = item as EnhancedLineItem;
                    const itemId = isEnhanced ? enhancedItem.id : `temp-${index}`;
                    const hasFileAttachments = isEnhanced && enhancedItem.fileAttachments;
                    
                    return (
                      <Card key={itemId} withBorder padding="md">
                        <Stack gap="sm">
                          {/* Line Item Header */}
                          <Group justify="space-between" align="flex-start">
                            <Stack gap="xs" style={{ flex: 1 }}>
                              <Group gap="md">
                                <Text fw={600} size="md">{item.part.partNumber}</Text>
                                <Text c="dimmed">-</Text>
                                <Text>{item.part.partName}</Text>
                              </Group>
                              <Group gap="md">
                                {item.part.drawingNumber && (
                                  <Text size="sm" c="dimmed">
                                    Drawing: {item.part.drawingNumber}
                                    {item.part.revisionLevel && ` (Rev. ${item.part.revisionLevel})`}
                                  </Text>
                                )}
                                <Text size="sm" fw={500} c="blue">
                                  Qty: {item.quantity.toLocaleString()}
                                </Text>
                              </Group>
                            </Stack>
                            
                            {isEnhanced && (
                              <ActionIcon
                                variant="subtle"
                                onClick={() => toggleItemExpansion(itemId)}
                                size="sm"
                              >
                                {expandedItems.has(itemId) ? (
                                  <IconChevronDown size={16} />
                                ) : (
                                  <IconChevronRight size={16} />
                                )}
                              </ActionIcon>
                            )}
                          </Group>
                          
                          {/* File Attachments - Only show if we have enhanced data and item is expanded */}
                          {isEnhanced && (
                            <Collapse in={expandedItems.has(itemId)}>
                              <Box pt="md">
                                <Divider mb="md" />
                                <Text fw={500} size="sm" mb="sm">File Attachments</Text>
                                <FileAttachmentManager
                                  lineItemId={itemId}
                                  attachments={hasFileAttachments ? enhancedItem.fileAttachments || [] : []}
                                  onAttachmentsChange={refreshOrderData}
                                />
                              </Box>
                            </Collapse>
                          )}
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              </ScrollArea>
            </Stack>
          </Card>
        )}

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
          {onEdit && (
            <Button 
              variant="filled" 
              onClick={() => {
                onEdit(displayOrder);
                onClose();
              }}
            >
              Edit Order
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
};
