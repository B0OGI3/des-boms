/**
 * Loading Skeleton Components for Batch Management
 */

import React from 'react';
import { Skeleton, Stack, Group, Card } from '@mantine/core';

// Table loading skeleton
export const BatchTableSkeleton = () => (
  <Card p="md" style={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(51, 65, 85, 0.4)" }}>
    <Stack gap="md">
      {/* Table header skeleton */}
      <Group justify="space-between">
        <Skeleton height={20} width="15%" />
        <Skeleton height={20} width="20%" />
        <Skeleton height={20} width="15%" />
        <Skeleton height={20} width="10%" />
        <Skeleton height={20} width="15%" />
        <Skeleton height={20} width="10%" />
      </Group>
      
      {/* Table rows skeleton */}
      {Array.from({ length: 8 }, (_, i) => (
        <Group key={`table-row-${i + 1}`} justify="space-between" p="md" style={{ borderBottom: "1px solid rgba(51, 65, 85, 0.3)" }}>
          <Skeleton height={16} width="15%" />
          <Skeleton height={16} width="20%" />
          <Skeleton height={16} width="15%" />
          <Skeleton height={16} width="10%" />
          <Skeleton height={16} width="15%" />
          <Skeleton height={16} width="10%" />
        </Group>
      ))}
    </Stack>
  </Card>
);

// Statistics cards loading skeleton
export const StatsSkeleton = () => (
  <Group gap="lg" mb="xl">
    {Array.from({ length: 6 }, (_, i) => (
      <Card key={`stats-card-${i + 1}`} p="lg" style={{ 
        flex: 1, 
        minWidth: 200,
        background: "rgba(15, 23, 42, 0.95)", 
        border: "1px solid rgba(51, 65, 85, 0.4)" 
      }}>
        <Stack gap="xs">
          <Skeleton height={14} width="60%" />
          <Skeleton height={28} width="40%" />
          <Skeleton height={12} width="80%" />
        </Stack>
      </Card>
    ))}
  </Group>
);

// Modal content loading skeleton
export const ModalContentSkeleton = () => (
  <Stack gap="md" p="md">
    <Skeleton height={20} width="30%" />
    <Skeleton height={40} width="100%" />
    
    <Skeleton height={20} width="25%" />
    <Skeleton height={40} width="100%" />
    
    <Skeleton height={20} width="35%" />
    <Skeleton height={40} width="100%" />
    
    <Skeleton height={20} width="20%" />
    <Skeleton height={80} width="100%" />
    
    <Group justify="flex-end" mt="xl">
      <Skeleton height={36} width={80} />
      <Skeleton height={36} width={120} />
    </Group>
  </Stack>
);

// Filter bar loading skeleton
export const FilterBarSkeleton = () => (
  <Card p="xl" mb="xl" style={{ 
    background: "rgba(15, 23, 42, 0.95)", 
    border: "1px solid rgba(51, 65, 85, 0.4)" 
  }}>
    <Group gap="lg" align="flex-end">
      <Stack gap="xs" style={{ flex: 1 }}>
        <Skeleton height={14} width={80} />
        <Skeleton height={44} width="100%" />
      </Stack>
      
      <Stack gap="xs" style={{ minWidth: 160 }}>
        <Skeleton height={14} width={60} />
        <Skeleton height={44} width="100%" />
      </Stack>
      
      <Stack gap="xs" style={{ minWidth: 140 }}>
        <Skeleton height={14} width={50} />
        <Skeleton height={44} width="100%" />
      </Stack>
      
      <Skeleton height={44} width={120} />
    </Group>
  </Card>
);
