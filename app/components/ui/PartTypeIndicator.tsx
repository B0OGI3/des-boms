/**
 * Enhanced Part Type Indicator Component
 * Shows part type with BOM structure indicators to make it clear
 * if a FG or SF are made up of other parts
 */

import React from 'react';
import { Badge, Tooltip, Group, Text } from '@mantine/core';
import { IconComponents, IconCube, IconPackage } from '@tabler/icons-react';

interface PartTypeIndicatorProps {
  partType: string; // Support both naming conventions
  partNumber: string;
  hasComponents?: boolean; // Does this part have a BOM structure?
  componentCount?: number; // Number of direct components
  bomLevels?: number; // Number of BOM levels
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showDetails?: boolean; // Show additional BOM details
}

export function PartTypeIndicator({
  partType,
  partNumber: _partNumber,
  hasComponents = false,
  componentCount = 0,
  bomLevels = 0,
  className = '',
  size = 'sm',
  showDetails = true,
}: Readonly<PartTypeIndicatorProps>) {
  const getPartTypeConfig = () => {
    // Normalize part type to handle both naming conventions
    const normalizedType = partType.toUpperCase();

    if (normalizedType === 'FINISHED' || normalizedType === 'FINISHED_GOOD') {
      return {
        label: 'FG',
        fullLabel: 'Finished Good',
        color: 'green',
        bgClass: 'bg-green-100 text-green-800',
        icon: <IconPackage size={14} />,
        description: 'Complete assembly ready for delivery',
      };
    }

    if (normalizedType === 'SEMI_FINISHED') {
      return {
        label: 'SF',
        fullLabel: 'Semi-Finished',
        color: 'yellow',
        bgClass: 'bg-yellow-100 text-yellow-800',
        icon: <IconCube size={14} />,
        description: 'Work-in-process part or sub-assembly',
      };
    }

    if (normalizedType === 'RAW_MATERIAL') {
      return {
        label: 'RM',
        fullLabel: 'Raw Material',
        color: 'blue',
        bgClass: 'bg-blue-100 text-blue-800',
        icon: <IconComponents size={14} />,
        description: 'Base material or stock item',
      };
    }

    // Default for unknown types
    return {
      label: 'UK',
      fullLabel: 'Unknown',
      color: 'gray',
      bgClass: 'bg-gray-100 text-gray-800',
      icon: <IconCube size={14} />,
      description: 'Unknown part type',
    };
  };

  const config = getPartTypeConfig();

  const getBomIndicator = () => {
    if (partType === 'RAW_MATERIAL') {
      return null; // Raw materials don't have components
    }

    if (!hasComponents || componentCount === 0) {
      return (
        <Tooltip label='No BOM structure defined'>
          <Badge
            size='xs'
            color='gray'
            variant='outline'
            style={{ marginLeft: 4 }}
          >
            No BOM
          </Badge>
        </Tooltip>
      );
    }

    const componentText = `${componentCount} component${componentCount !== 1 ? 's' : ''}`;
    const levelText = bomLevels > 1 ? `, ${bomLevels} levels` : '';
    const bomDescription = componentText + levelText;

    return (
      <Tooltip label={`BOM Structure: ${bomDescription}`}>
        <Badge
          size='xs'
          color='purple'
          variant='filled'
          style={{ marginLeft: 4 }}
        >
          <Group gap={4} align='center'>
            <IconComponents size={10} />
            <Text size='xs'>{componentCount}</Text>
          </Group>
        </Badge>
      </Tooltip>
    );
  };

  const tooltipContent = (
    <div>
      <Text fw={600} size='sm'>
        {config.fullLabel}
      </Text>
      <Text size='xs' style={{ opacity: 0.9 }}>
        {config.description}
      </Text>
      {hasComponents && componentCount > 0 && (
        <Text size='xs' style={{ opacity: 0.9, marginTop: 4 }}>
          Contains {componentCount} component{componentCount !== 1 ? 's' : ''}
          {bomLevels > 1 && ` across ${bomLevels} levels`}
        </Text>
      )}
      {partType !== 'RAW_MATERIAL' && !hasComponents && (
        <Text size='xs' style={{ opacity: 0.7, marginTop: 4 }}>
          ⚠️ No BOM structure defined
        </Text>
      )}
    </div>
  );

  return (
    <Group gap={4} align='center' className={className}>
      <Tooltip label={tooltipContent} multiline>
        <Badge
          size={size}
          color={config.color}
          variant='filled'
          leftSection={config.icon}
          style={{ cursor: 'help' }}
        >
          {config.label}
        </Badge>
      </Tooltip>

      {showDetails && getBomIndicator()}
    </Group>
  );
}

/**
 * Simplified version for use in tables and compact displays
 */
export function PartTypeIndicatorCompact({
  partType,
  hasComponents = false,
  componentCount = 0,
  className = '',
}: Readonly<
  Pick<
    PartTypeIndicatorProps,
    'partType' | 'hasComponents' | 'componentCount' | 'className'
  >
>) {
  const normalizedType = partType.toUpperCase();
  const config = (() => {
    if (normalizedType === 'FINISHED' || normalizedType === 'FINISHED_GOOD') {
      return { label: 'FG', color: 'green' };
    }
    if (normalizedType === 'SEMI_FINISHED') {
      return { label: 'SF', color: 'yellow' };
    }
    if (normalizedType === 'RAW_MATERIAL') {
      return { label: 'RM', color: 'blue' };
    }
    return { label: 'UK', color: 'gray' };
  })();

  const bomIndicator =
    hasComponents && componentCount > 0 ? (
      <span style={{ fontSize: '10px', opacity: 0.7, marginLeft: 2 }}>
        +{componentCount}
      </span>
    ) : null;

  const getBackgroundClass = () => {
    if (normalizedType === 'FINISHED' || normalizedType === 'FINISHED_GOOD') {
      return 'bg-green-100 text-green-800';
    }
    if (normalizedType === 'SEMI_FINISHED') {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBackgroundClass()} ${className}`}
    >
      {config.label}
      {bomIndicator}
    </span>
  );
}
