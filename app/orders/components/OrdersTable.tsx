'use client';

/**
 * OrdersTable component for displaying customer orders
 */

import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Text, 
  Badge, 
  Group, 
  ActionIcon,
  Tooltip,
  Collapse,
  Stack,
  Divider,
  Box
} from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import type { BaseEntity, StatusType } from '../../../types/shared';

// Order interface for table display (aligned with DES-BOMS spec)
export interface OrderTableItem extends BaseEntity {
  orderId: string;
  customerName: string;
  orderNumber: string;
  status: StatusType;
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  orderDate: string;
  dueDate: string;
  totalValue: number;
  itemCount: number;
  assignedBatches: number;
  completedBatches: number;
  lineItems?: Array<{
    part: {
      id: string;
      partNumber: string;
      partName: string;
      partType: 'FINISHED_GOOD' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
      drawingNumber?: string;
      revisionLevel?: string;
      description?: string;
    };
    quantity: number;
    unitPrice?: number;
    notes?: string;
  }>;
}

export interface OrdersTableProps {
  orders: OrderTableItem[];
  onViewOrder?: (order: OrderTableItem) => void;
  onEditOrder?: (order: OrderTableItem) => void;
  onDeleteOrder?: (order: OrderTableItem) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// Status badge colors
const getStatusColor = (status: StatusType): string => {
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
    month: 'short',
    day: 'numeric',
  });
};

// Individual row component
interface OrderRowProps {
  order: OrderTableItem;
  onViewOrder?: (order: OrderTableItem) => void;
  onEditOrder?: (order: OrderTableItem) => void;
  onDeleteOrder?: (order: OrderTableItem) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ 
  order, 
  onViewOrder, 
  onEditOrder, 
  onDeleteOrder 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const isOverdue = new Date(order.dueDate) < new Date() && order.status !== 'COMPLETED';
  const completionPercentage = order.assignedBatches > 0 
    ? Math.round((order.completedBatches / order.assignedBatches) * 100) 
    : 0;

  return (
    <>
      <Table.Tr
        style={{
          background: isOverdue 
            ? 'rgba(239, 68, 68, 0.1)' 
            : 'rgba(248, 250, 252, 0.8)',
          borderLeft: isOverdue 
            ? '3px solid #ef4444' 
            : '3px solid transparent',
          borderBottom: '1px solid rgba(203, 213, 225, 0.3)',
        }}
      >
        <Table.Td>
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            style={{ color: '#475569' }}
          >
            {expanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
          </ActionIcon>
        </Table.Td>
        
        <Table.Td>
          <div>
            <Text size="sm" fw={600} style={{ color: '#0f172a' }}>
              {order.orderId}
            </Text>
            <Text size="xs" style={{ color: '#475569' }}>
              {order.orderNumber}
            </Text>
          </div>
        </Table.Td>
        
        <Table.Td>
          <Text size="sm" style={{ color: '#0f172a' }}>
            {order.customerName}
          </Text>
        </Table.Td>
        
        <Table.Td>
          <Group gap="xs">
            <Badge color={getStatusColor(order.status)} size="sm">
              {order.status.replace('_', ' ')}
            </Badge>
            <Badge color={getPriorityColor(order.priority)} size="sm" variant="outline">
              {order.priority}
            </Badge>
          </Group>
        </Table.Td>
        
        <Table.Td>
          <div>
            <Text size="sm" style={{ color: '#0f172a' }}>
              {formatDate(order.dueDate)}
            </Text>
            {isOverdue && (
              <Text size="xs" style={{ color: '#dc2626', fontWeight: 600 }}>
                Overdue
              </Text>
            )}
          </div>
        </Table.Td>
        
        <Table.Td>
          <Text size="sm" fw={600} style={{ color: '#0f172a' }}>
            {formatCurrency(order.totalValue)}
          </Text>
        </Table.Td>
        
        <Table.Td>
          <div>
            <Text size="sm" style={{ color: '#0f172a' }}>
              {order.itemCount} items
            </Text>
            <Text size="xs" style={{ color: '#475569' }}>
              {completionPercentage}% complete
            </Text>
          </div>
        </Table.Td>
        
        <Table.Td>
          <Group gap="xs">
            {onViewOrder && (
              <Tooltip label="View Details">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={() => onViewOrder(order)}
                  style={{ color: '#2563eb' }}
                >
                  <IconEye size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {onEditOrder && (
              <Tooltip label="Edit Order">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={() => onEditOrder(order)}
                  style={{ color: '#475569' }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {onDeleteOrder && (
              <Tooltip label="Delete Order">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={() => onDeleteOrder(order)}
                  style={{ color: '#dc2626' }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Table.Td>
      </Table.Tr>
      
      {/* Expanded details row */}
      <Table.Tr>
        <Table.Td colSpan={8} style={{ padding: 0 }}>
          <Collapse in={expanded}>
            <Box style={{ 
              padding: '20px 24px',
              background: 'rgba(248, 250, 252, 0.6)',
              borderTop: '1px solid rgba(203, 213, 225, 0.4)',
              borderLeft: '3px solid #3b82f6',
            }}>
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="sm" fw={600} style={{ color: '#0f172a', marginBottom: 8 }}>
                      Order Details
                    </Text>
                    <Group gap="xl">
                      <div>
                        <Text size="xs" style={{ color: '#475569', fontWeight: 500 }}>Order Date</Text>
                        <Text size="sm" style={{ color: '#0f172a' }}>
                          {formatDate(order.orderDate)}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" style={{ color: '#475569', fontWeight: 500 }}>Batches</Text>
                        <Text size="sm" style={{ color: '#0f172a' }}>
                          {order.completedBatches} of {order.assignedBatches}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" style={{ color: '#475569', fontWeight: 500 }}>Progress</Text>
                        <Text size="sm" style={{ color: '#0f172a' }}>
                          {completionPercentage}%
                        </Text>
                      </div>
                    </Group>
                  </div>
                </Group>
                
                {order.lineItems && order.lineItems.length > 0 && (
                  <>
                    <Divider />
                    <div>
                      <Text size="sm" fw={600} style={{ color: '#0f172a', marginBottom: 8 }}>
                        Line Items ({order.lineItems.length})
                      </Text>
                      <Table striped>
                        <Table.Thead style={{ background: 'rgba(241, 245, 249, 0.8)' }}>
                          <Table.Tr>
                            <Table.Th style={{ color: '#374151', fontWeight: 600 }}>Part Number</Table.Th>
                            <Table.Th style={{ color: '#374151', fontWeight: 600 }}>Part Name</Table.Th>
                            <Table.Th style={{ color: '#374151', fontWeight: 600 }}>Drawing</Table.Th>
                            <Table.Th style={{ color: '#374151', fontWeight: 600 }}>Revision</Table.Th>
                            <Table.Th style={{ color: '#374151', fontWeight: 600 }}>Quantity</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {order.lineItems.map((item, index) => (
                            <Table.Tr key={`${item.part.partNumber}-${index}`}>
                              <Table.Td>
                                <Text size="sm" fw={500} style={{ color: '#0f172a' }}>
                                  {item.part.partNumber}
                                </Text>
                              </Table.Td>
                              <Table.Td>
                                <Text size="sm" style={{ color: '#0f172a' }}>
                                  {item.part.partName}
                                </Text>
                              </Table.Td>
                              <Table.Td>
                                <Text size="sm" style={{ color: '#475569' }}>
                                  {item.part.drawingNumber || '—'}
                                </Text>
                              </Table.Td>
                              <Table.Td>
                                <Text size="sm" style={{ color: '#475569' }}>
                                  {item.part.revisionLevel || '—'}
                                </Text>
                              </Table.Td>
                              <Table.Td>
                                <Text size="sm" style={{ color: '#0f172a' }}>
                                  {item.quantity}
                                </Text>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </div>
                  </>
                )}
              </Stack>
            </Box>
          </Collapse>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

// Main OrdersTable component
export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onViewOrder,
  onEditOrder,
  onDeleteOrder,
  loading = false,
  emptyMessage = "No orders found"
}) => {
  if (loading) {
    return (
      <Card 
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(203, 213, 225, 0.6)",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <Text style={{ color: "#374151", fontSize: "1rem" }}>Loading orders...</Text>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card 
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(203, 213, 225, 0.6)",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <Text style={{ color: "#374151", fontSize: "1rem" }}>{emptyMessage}</Text>
      </Card>
    );
  }

  return (
    <Card
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        border: "1px solid rgba(203, 213, 225, 0.6)",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Table.ScrollContainer minWidth={1000}>
        <Table
          striped
          highlightOnHover
          style={{
            background: "transparent",
          }}
        >
          <Table.Thead
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
              borderBottom: "1px solid rgba(30, 64, 175, 0.2)",
            }}
          >
            <Table.Tr>
              <Table.Th style={{ width: "40px" }}></Table.Th>
              <Table.Th style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>Order ID</Table.Th>
              <Table.Th style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>Customer</Table.Th>
              <Table.Th style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>Status</Table.Th>
              <Table.Th style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>Due Date</Table.Th>
              <Table.Th style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>Value</Table.Th>
              <Table.Th style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>Items</Table.Th>
              <Table.Th style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem", width: "120px" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onViewOrder={onViewOrder}
                onEditOrder={onEditOrder}
                onDeleteOrder={onDeleteOrder}
              />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );
};
