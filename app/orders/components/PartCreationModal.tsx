'use client';

/**
 * PartCreationModal component for creating new parts with auto-generated unique IDs
 * Integrated with the DES-BOMS part management system
 */

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Stack,
  Group,
  Button,
  TextInput,
  Select,
  Textarea,
  NumberInput,
  Card,
  Text,
  Alert,
  Divider,
  Badge,
  ActionIcon,
  Tooltip,
  Loader,
  Switch,
} from '@mantine/core';
import {
  IconPlus,
  IconCheck,
  IconAlertCircle,
  IconInfoCircle,
  IconRefresh,
} from '@tabler/icons-react';

// Types
type PartType = 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';

interface Part {
  id: string;
  partNumber: string;
  partName: string;
  partType: PartType;
  drawingNumber?: string;
  revisionLevel?: string;
  description?: string;
  materialSpec?: string;
  unitOfMeasure?: string;
  standardCost?: number;
  leadTime?: number;
  active?: boolean;
  notes?: string;
}

interface PartCreationModalProps {
  opened: boolean;
  onClose: () => void;
  onPartCreated: (part: Part) => void;
  initialPartNumber?: string; // Pre-fill part number if provided
  title?: string;
}

// Part type options with descriptions
const partTypeOptions = [
  {
    value: 'FINISHED',
    label: 'Finished Goods',
    description: 'Complete assemblies ready for delivery',
    prefix: 'FG-'
  },
  {
    value: 'SEMI_FINISHED',
    label: 'Semi-Finished',
    description: 'Work-in-process parts or sub-assemblies',
    prefix: 'SF-'
  },
  {
    value: 'RAW_MATERIAL',
    label: 'Raw Material',
    description: 'Base materials and stock items',
    prefix: 'RM-'
  },
];

// Common unit of measure options
const unitOptions = [
  { value: 'EA', label: 'Each' },
  { value: 'LB', label: 'Pounds' },
  { value: 'KG', label: 'Kilograms' },
  { value: 'FT', label: 'Feet' },
  { value: 'IN', label: 'Inches' },
  { value: 'M', label: 'Meters' },
  { value: 'CM', label: 'Centimeters' },
  { value: 'L', label: 'Liters' },
  { value: 'GAL', label: 'Gallons' },
  { value: 'SET', label: 'Set' },
  { value: 'LOT', label: 'Lot' },
];

export const PartCreationModal: React.FC<PartCreationModalProps> = ({
  opened,
  onClose,
  onPartCreated,
  initialPartNumber = '',
  title = 'Create New Part',
}) => {
  // Form state
  const [formData, setFormData] = useState<Partial<Part>>({
    partNumber: initialPartNumber,
    partName: '',
    partType: 'FINISHED',
    drawingNumber: '',
    revisionLevel: '',
    description: '',
    materialSpec: '',
    unitOfMeasure: 'EA',
    standardCost: undefined,
    leadTime: undefined,
    active: true,
    notes: '',
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [autoGeneratePN, setAutoGeneratePN] = useState(!initialPartNumber);
  const [generatedPartNumber, setGeneratedPartNumber] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (opened) {
      setFormData({
        partNumber: initialPartNumber,
        partName: '',
        partType: 'FINISHED',
        drawingNumber: '',
        revisionLevel: '',
        description: '',
        materialSpec: '',
        unitOfMeasure: 'EA',
        standardCost: undefined,
        leadTime: undefined,
        active: true,
        notes: '',
      });
      setErrors({});
      setSuccess(false);
      setAutoGeneratePN(!initialPartNumber);
      setGeneratedPartNumber('');
    }
  }, [opened, initialPartNumber]);

  // Generate part number when part type changes
  useEffect(() => {
    if (autoGeneratePN && formData.partType) {
      generatePartNumber(formData.partType);
    }
  }, [formData.partType, autoGeneratePN]);

  const generatePartNumber = async (partType: PartType) => {
    try {
      setLoading(true);
      const response = await fetch('/api/parts/generate-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partType }),
      });

      if (response.ok) {
        const data = await response.json();
        const partNumber = data.partNumber;
        setGeneratedPartNumber(partNumber);
        setFormData(prev => ({ ...prev, partNumber }));
      } else {
        throw new Error('Failed to generate part number');
      }
    } catch (error) {
      console.error('Error generating part number:', error);
      // Fallback to manual generation
      const prefix = partTypeOptions.find(opt => opt.value === partType)?.prefix || 'PT-';
      const timestamp = Date.now().toString().slice(-6);
      const fallbackPN = `${prefix}${timestamp}`;
      setGeneratedPartNumber(fallbackPN);
      setFormData(prev => ({ ...prev, partNumber: fallbackPN }));
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.partNumber?.trim()) {
      newErrors.partNumber = 'Part number is required';
    }
    if (!formData.partName?.trim()) {
      newErrors.partName = 'Part name is required';
    }
    if (!formData.partType) {
      newErrors.partType = 'Part type is required';
    }

    // Validation rules
    if (formData.standardCost !== undefined && formData.standardCost < 0) {
      newErrors.standardCost = 'Standard cost cannot be negative';
    }
    if (formData.leadTime !== undefined && formData.leadTime < 0) {
      newErrors.leadTime = 'Lead time cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          standardCost: formData.standardCost || null,
          leadTime: formData.leadTime || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create part');
      }

      const newPart = await response.json();
      setSuccess(true);

      // Wait a moment to show success, then close
      setTimeout(() => {
        onPartCreated(newPart);
        onClose();
      }, 1500);

    } catch (error) {
      console.error('Error creating part:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to create part'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const updateFormData = (field: keyof Part, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const selectedPartType = partTypeOptions.find(opt => opt.value === formData.partType);
  
  const getBadgeColor = () => {
    if (selectedPartType?.value === 'FINISHED') return 'green';
    if (selectedPartType?.value === 'SEMI_FINISHED') return 'orange';
    return 'blue';
  };
  
  const getButtonText = () => {
    if (loading) return 'Creating Part...';
    if (success) return 'Created!';
    return 'Create Part';
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="sm">
          <IconPlus size={20} />
          <Text fw={600}>{title}</Text>
          {autoGeneratePN && generatedPartNumber && (
            <Badge color="blue" variant="light">
              Auto-Generated: {generatedPartNumber}
            </Badge>
          )}
        </Group>
      }
      size="lg"
      centered
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <Stack gap="md">
        {success && (
          <Alert color="green" icon={<IconCheck size={16} />}>
            Part created successfully! Closing modal...
          </Alert>
        )}

        {errors.submit && (
          <Alert color="red" icon={<IconAlertCircle size={16} />}>
            {errors.submit}
          </Alert>
        )}

        {/* Part Type Selection */}
        <Card withBorder p="md">
          <Stack gap="sm">
            <Group justify="space-between" align="center">
              <Text fw={500}>Part Classification</Text>
              <Badge color={getBadgeColor()}>
                {selectedPartType?.prefix}
              </Badge>
            </Group>
            <Select
              label="Part Type"
              placeholder="Select part type"
              required
              data={partTypeOptions.map(opt => ({
                value: opt.value,
                label: opt.label,
              }))}
              value={formData.partType}
              onChange={(value) => updateFormData('partType', value)}
              error={errors.partType}
              description={selectedPartType?.description}
            />
          </Stack>
        </Card>

        {/* Part Number */}
        <Group align="end" gap="sm">
          <div style={{ flex: 1 }}>
            <TextInput
              label="Part Number"
              placeholder="Enter part number or auto-generate"
              required
              value={formData.partNumber || ''}
              onChange={(e) => updateFormData('partNumber', e.target.value)}
              error={errors.partNumber}
              disabled={autoGeneratePN}
              description={autoGeneratePN ? "Auto-generated based on part type" : "Unique identifier for this part"}
            />
          </div>
          <Group gap="xs">
            <Switch
              label="Auto-generate"
              checked={autoGeneratePN}
              onChange={(e) => {
                setAutoGeneratePN(e.currentTarget.checked);
                if (e.currentTarget.checked && formData.partType) {
                  generatePartNumber(formData.partType);
                }
              }}
              size="sm"
            />
            {autoGeneratePN && (
              <Tooltip label="Regenerate part number">
                <ActionIcon
                  variant="light"
                  onClick={() => formData.partType && generatePartNumber(formData.partType)}
                  disabled={loading}
                >
                  <IconRefresh size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Group>

        {/* Basic Information */}
        <Stack gap="sm">
          <TextInput
            label="Part Name"
            placeholder="Descriptive name for the part"
            required
            value={formData.partName || ''}
            onChange={(e) => updateFormData('partName', e.target.value)}
            error={errors.partName}
          />

          <Textarea
            label="Description"
            placeholder="Detailed description of the part"
            value={formData.description || ''}
            onChange={(e) => updateFormData('description', e.target.value)}
            error={errors.description}
            autosize
            minRows={2}
            maxRows={4}
          />
        </Stack>

        <Divider label="Engineering Details" labelPosition="left" />

        {/* Engineering Information */}
        <Group grow>
          <TextInput
            label="Drawing Number"
            placeholder="Engineering drawing number"
            value={formData.drawingNumber || ''}
            onChange={(e) => updateFormData('drawingNumber', e.target.value)}
            error={errors.drawingNumber}
          />
          <TextInput
            label="Revision Level"
            placeholder="Rev (A, B, C, etc.)"
            value={formData.revisionLevel || ''}
            onChange={(e) => updateFormData('revisionLevel', e.target.value)}
            error={errors.revisionLevel}
          />
        </Group>

        <TextInput
          label="Material Specification"
          placeholder="Material spec (e.g., Ti-6Al-4V, 6061-T6)"
          value={formData.materialSpec || ''}
          onChange={(e) => updateFormData('materialSpec', e.target.value)}
          error={errors.materialSpec}
        />

        <Divider label="Operational Details" labelPosition="left" />

        {/* Operational Information */}
        <Group grow>
          <Select
            label="Unit of Measure"
            placeholder="Select unit"
            data={unitOptions}
            value={formData.unitOfMeasure || ''}
            onChange={(value) => updateFormData('unitOfMeasure', value)}
            error={errors.unitOfMeasure}
            searchable
          />
          <NumberInput
            label="Standard Cost"
            placeholder="Cost per unit"
            value={formData.standardCost}
            onChange={(value) => updateFormData('standardCost', value)}
            error={errors.standardCost}
            min={0}
            decimalScale={4}
            fixedDecimalScale={false}
            prefix="$"
          />
        </Group>

        <NumberInput
          label="Lead Time (Days)"
          placeholder="Manufacturing/procurement lead time"
          value={formData.leadTime}
          onChange={(value) => updateFormData('leadTime', value)}
          error={errors.leadTime}
          min={0}
        />

        <Textarea
          label="Notes"
          placeholder="Additional notes about this part"
          value={formData.notes || ''}
          onChange={(e) => updateFormData('notes', e.target.value)}
          error={errors.notes}
          autosize
          minRows={2}
          maxRows={3}
        />

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm" mt="md">
          <Button
            variant="subtle"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            leftSection={loading ? <Loader size="xs" /> : <IconCheck size={16} />}
            disabled={success}
          >
            {getButtonText()}
          </Button>
        </Group>

        {/* Help Text */}
        <Alert color="blue" icon={<IconInfoCircle size={16} />}>
          <Text size="sm">
            <strong>Part numbering:</strong> Parts are automatically assigned unique IDs based on type.
            Finished goods (FG-), Semi-finished (SF-), and Raw materials (RM-).
          </Text>
        </Alert>
      </Stack>
    </Modal>
  );
};
