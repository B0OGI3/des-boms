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
  Tabs,
  Table,
  ScrollArea,
} from '@mantine/core';
import {
  IconPlus,
  IconCheck,
  IconAlertCircle,
  IconInfoCircle,
  IconRefresh,
  IconTrash,
  IconEdit,
  IconSearch,
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

interface BOMComponent {
  id: string; // Unique identifier for this component entry
  childPartId: string;
  childPart?: Part; // Populated when part is loaded
  quantity: number;
  unitOfMeasure?: string;
  notes?: string;
}

interface PartCreationModalProps {
  opened: boolean;
  onClose: () => void;
  onPartCreated: (part: Part) => void;
  initialPartNumber?: string; // Pre-fill part number if provided
  title?: string;
  simpleMode?: boolean; // Hide advanced fields when true
}

// Part type options with descriptions
const partTypeOptions = [
  {
    value: 'FINISHED',
    label: 'Finished Goods',
    description: 'Complete assemblies ready for delivery',
    prefix: 'FG-',
  },
  {
    value: 'SEMI_FINISHED',
    label: 'Semi-Finished',
    description: 'Work-in-process parts or sub-assemblies',
    prefix: 'SF-',
  },
  {
    value: 'RAW_MATERIAL',
    label: 'Raw Material',
    description: 'Base materials and stock items',
    prefix: 'RM-',
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
  simpleMode = false,
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

  // BOM composition state
  const [bomComponents, setBomComponents] = useState<BOMComponent[]>([]);
  const [bomEnabled, setBomEnabled] = useState(false);
  const [availableParts, setAvailableParts] = useState<Part[]>([]);
  const [partsLoading, setPartsLoading] = useState(false);
  const [partTypeWarning, setPartTypeWarning] = useState<string>('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [autoGeneratePN, setAutoGeneratePN] = useState(!initialPartNumber);
  const [generatedPartNumber, setGeneratedPartNumber] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('create');

  // Part editor state
  const [allParts, setAllParts] = useState<Part[]>([]);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [partSearchQuery, setPartSearchQuery] = useState('');
  const [editorLoading, setEditorLoading] = useState(false);

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
      // Reset BOM state
      setBomComponents([]);
      setBomEnabled(false);
      setPartTypeWarning('');
      // Load available parts for BOM selection
      loadAvailableParts();
    }
  }, [opened, initialPartNumber]);

  // Generate part number when part type changes
  useEffect(() => {
    if (autoGeneratePN && formData.partType) {
      generatePartNumber(formData.partType);
    }
  }, [formData.partType, autoGeneratePN]);

  // Validate part type against BOM components
  useEffect(() => {
    if (formData.partType) {
      const warning = validatePartTypeForBOM(formData.partType, bomComponents);
      setPartTypeWarning(warning);
    } else {
      setPartTypeWarning('');
    }
  }, [formData.partType, bomComponents, bomEnabled, availableParts]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load available parts for BOM composition
  const loadAvailableParts = async () => {
    setPartsLoading(true);
    try {
      const response = await fetch('/api/parts');
      if (response.ok) {
        const data = await response.json();
        // Handle different response formats
        let partsArray = [];
        if (Array.isArray(data)) {
          partsArray = data;
        } else if (data && Array.isArray(data.data)) {
          partsArray = data.data;
        } else if (data && Array.isArray(data.parts)) {
          partsArray = data.parts;
        }
        setAvailableParts(partsArray);
      }
    } catch (error) {
      console.error('Error loading parts:', error);
    } finally {
      setPartsLoading(false);
    }
  };

  // Validate part type based on BOM components
  const validatePartTypeForBOM = (
    partType: PartType,
    components: BOMComponent[]
  ): string => {
    if (!bomEnabled || components.length === 0) {
      return '';
    }

    // Raw materials cannot have components
    if (partType === 'RAW_MATERIAL') {
      return 'Raw Materials cannot contain other components. Consider changing to Semi-Finished or Finished.';
    }

    // Check component types
    const componentTypes = components
      .map(comp => {
        const part = availableParts.find(p => p.id === comp.childPartId);
        return part?.partType;
      })
      .filter(Boolean);

    const hasSemiFinished = componentTypes.includes('SEMI_FINISHED');

    if (partType === 'SEMI_FINISHED' && hasSemiFinished) {
      return 'Semi-Finished parts can only contain Raw Materials. Consider changing to Finished Goods.';
    }

    // Suggest optimal part type
    if (hasSemiFinished && partType !== 'FINISHED') {
      return 'Parts containing Semi-Finished components should typically be Finished Goods.';
    }

    return '';
  };

  // BOM composition helper functions
  const addBOMComponent = () => {
    const newComponent: BOMComponent = {
      id: Date.now().toString(),
      childPartId: '',
      quantity: 1,
      unitOfMeasure: 'EA',
      notes: '',
    };
    setBomComponents(prev => [...prev, newComponent]);
  };

  const updateBOMComponent = (
    id: string,
    field: keyof BOMComponent,
    value: any
  ) => {
    setBomComponents(prev => {
      const updated = prev.map(comp =>
        comp.id === id ? { ...comp, [field]: value } : comp
      );

      // Auto-suggest part type when childPartId changes
      if (field === 'childPartId' && value) {
        const childPart = availableParts.find(p => p.id === value);
        if (
          childPart?.partType === 'SEMI_FINISHED' &&
          formData.partType !== 'FINISHED'
        ) {
          // If adding semi-finished component, suggest finished goods
          setTimeout(() => updateFormData('partType', 'FINISHED'), 100);
        }
      }

      return updated;
    });
  };

  const removeBOMComponent = (id: string) => {
    setBomComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const getSelectedPart = (partId: string): Part | undefined => {
    return availableParts.find(part => part.id === partId);
  };

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
      const prefix =
        partTypeOptions.find(opt => opt.value === partType)?.prefix || 'PT-';
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

    // BOM validation
    if (bomEnabled && bomComponents.length > 0) {
      const bomErrors: string[] = [];
      bomComponents.forEach((comp, index) => {
        if (!comp.childPartId) {
          bomErrors.push(`Component ${index + 1}: Part selection is required`);
        }
        if (!comp.quantity || comp.quantity <= 0) {
          bomErrors.push(
            `Component ${index + 1}: Quantity must be greater than 0`
          );
        }
      });
      if (bomErrors.length > 0) {
        newErrors.bom = bomErrors.join('; ');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Part Editor Functions
  const loadAllParts = async () => {
    setEditorLoading(true);
    try {
      const response = await fetch('/api/parts');
      if (response.ok) {
        const data = await response.json();
        let partsArray = [];
        if (Array.isArray(data)) {
          partsArray = data;
        } else if (data && Array.isArray(data.data)) {
          partsArray = data.data;
        } else if (data && Array.isArray(data.parts)) {
          partsArray = data.parts;
        }
        setAllParts(partsArray);
      }
    } catch (error) {
      console.error('Error loading parts:', error);
    } finally {
      setEditorLoading(false);
    }
  };

  const handleEditPart = (part: Part) => {
    setEditingPart(part);
    // Switch to create tab to show the editing form
    setActiveTab('create');
    // Pre-populate form with part data
    setFormData({
      ...part,
      partType: part.partType,
    });
    // Disable auto-generation since we're editing
    setAutoGeneratePN(false);
  };

  const handleDeletePart = async (partId: string) => {
    // First check for dependencies
    try {
      const response = await fetch(`/api/parts/${partId}`);
      if (!response.ok) {
        throw new Error('Failed to check part details');
      }

      const part = await response.json();

      // Enhanced confirmation message
      const isFG = part.partType === 'FINISHED';
      const isSF = part.partType === 'SEMI_FINISHED';

      let confirmMessage;
      if (isFG) {
        confirmMessage = `Are you sure you want to delete FG part "${part.partNumber} - ${part.partName}"?\n\nThis action cannot be undone.\n\n⚠️ FG parts can be deleted even with dependencies - all related BOMs and order references will be removed!`;
      } else if (isSF) {
        confirmMessage = `Are you sure you want to delete SF part "${part.partNumber} - ${part.partName}"?\n\nThis action cannot be undone.\n\nNote: SF parts can be deleted unless they're used in FG assemblies.`;
      } else {
        confirmMessage = `Are you sure you want to delete RM part "${part.partNumber} - ${part.partName}"?\n\nThis action cannot be undone.\n\nNote: RM parts cannot be deleted if used in any assemblies.`;
      }

      if (!confirm(confirmMessage)) {
        return;
      }

      const deleteResponse = await fetch(`/api/parts/${partId}`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        // Refresh the parts list
        await loadAllParts();
        // Show success message
        setErrors({ submit: '' });
      } else {
        const errorData = await deleteResponse.json();
        setErrors({ submit: errorData.error || 'Failed to delete part' });
      }
    } catch (error) {
      console.error('Error deleting part:', error);
      setErrors({ submit: 'Failed to delete part' });
    }
  };

  const handleViewDependencies = async (partId: string) => {
    try {
      const response = await fetch(`/api/parts/${partId}/dependencies`);
      if (!response.ok) {
        throw new Error('Failed to fetch dependencies');
      }

      const result = await response.json();
      const deps = result.data;

      const message = buildDependenciesMessage(deps);
      alert(message);
    } catch (error) {
      console.error('Error fetching dependencies:', error);
      alert('Failed to fetch part dependencies. Please try again.');
    }
  };

  const buildDependenciesMessage = (deps: any) => {
    let message = `Dependencies for ${deps.partInfo.partNumber} - ${deps.partInfo.partName}:\n\n`;

    message += addOrdersSection(deps);
    message += addUsedInSection(deps);
    message += addContainsSection(deps);
    message += addDeletionStatus(deps);

    return message;
  };

  const addOrdersSection = (deps: any) => {
    if (deps.summary.totalOrders > 0) {
      let section = `ORDERS (${deps.summary.totalOrders}):\n`;
      deps.orders.forEach((order: any) => {
        section += `  • ${order.poNumber} (${order.customerName}) - Qty: ${order.quantity}\n`;
      });
      return section + '\n';
    }
    return '';
  };

  const addUsedInSection = (deps: any) => {
    if (deps.summary.totalParentParts > 0) {
      let section = `USED AS COMPONENT IN (${deps.summary.totalParentParts}):\n`;
      deps.usedInParts.forEach((parent: any) => {
        section += `  • ${parent.partNumber} - ${parent.partName} (Qty: ${parent.quantity})\n`;
      });
      return section + '\n';
    }
    return '';
  };

  const addContainsSection = (deps: any) => {
    if (deps.summary.totalChildParts > 0) {
      let section = `CONTAINS COMPONENTS (${deps.summary.totalChildParts}):\n`;
      deps.containsParts.forEach((child: any) => {
        section += `  • ${child.partNumber} - ${child.partName} (Qty: ${child.quantity})\n`;
      });
      return section + '\n';
    }
    return '';
  };

  const addDeletionStatus = (deps: any) => {
    if (deps.summary.canDelete) {
      if (
        deps.summary.isFG &&
        (deps.summary.totalOrders > 0 ||
          deps.summary.totalParentParts > 0 ||
          deps.summary.totalChildParts > 0)
      ) {
        return '✅ This FG part can be deleted despite having dependencies (FG parts override dependency checks).';
      } else if (deps.summary.isSF && deps.summary.totalParentParts > 0) {
        return '✅ This SF part can be deleted (not used in any FG assemblies).';
      } else {
        return '✅ This part can be safely deleted (no dependencies).';
      }
    } else if (deps.summary.isSF) {
      return "❌ This SF part cannot be deleted because it's used in FG assemblies.\n\nNote: SF parts can be deleted unless used in FG assemblies.";
    } else {
      return '❌ This part cannot be deleted due to the above dependencies.\n\nNote: FG parts can always be deleted. SF parts can be deleted unless used in FG assemblies.';
    }
  };

  const filteredParts = allParts.filter(
    part =>
      part.partNumber.toLowerCase().includes(partSearchQuery.toLowerCase()) ||
      part.partName.toLowerCase().includes(partSearchQuery.toLowerCase())
  );

  const getPartTypeBadgeColor = (partType: PartType) => {
    switch (partType) {
      case 'FINISHED':
        return 'green';
      case 'SEMI_FINISHED':
        return 'yellow';
      case 'RAW_MATERIAL':
        return 'blue';
      default:
        return 'gray';
    }
  };

  // Load parts when switching to editor tab
  useEffect(() => {
    if (activeTab === 'editor' && allParts.length === 0) {
      loadAllParts();
    }
  }, [activeTab, allParts.length]);

  // Helper functions to reduce cognitive complexity
  const preparePartData = () => ({
    ...formData,
    standardCost: formData.standardCost || null,
    leadTime: formData.leadTime || null,
  });

  const prepareBomData = () => {
    if (!bomEnabled || bomComponents.length === 0) return null;
    return {
      components: bomComponents.map(comp => ({
        childPartId: comp.childPartId,
        quantity: comp.quantity,
        unitOfMeasure: comp.unitOfMeasure || 'EA',
        notes: comp.notes || '',
      })),
    };
  };

  const handleSuccessfulSubmit = async (partResult: any) => {
    setSuccess(true);

    // Refresh the parts list if we're in editor mode
    if (activeTab === 'editor') {
      await loadAllParts();
    }

    // Wait a moment to show success, then close or clear editing state
    setTimeout(() => {
      if (editingPart) {
        // If editing, just clear the editing state and refresh
        setEditingPart(null);
        setSuccess(false);
        setActiveTab('editor');
      } else {
        // If creating, call onPartCreated and close
        onPartCreated(partResult);
        onClose();
      }
    }, 1500);
  };

  const handleSubmitError = (error: unknown) => {
    console.error(
      `Error ${editingPart ? 'updating' : 'creating'} part:`,
      error
    );
    const action = editingPart ? 'update' : 'create';
    const errorMessage =
      error instanceof Error ? error.message : `Failed to ${action} part`;
    setErrors({
      submit: errorMessage,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const partData = preparePartData();
      const bomData = prepareBomData();

      const response = await fetch(
        editingPart ? `/api/parts/${editingPart.id}` : '/api/parts',
        {
          method: editingPart ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            part: partData,
            bom: bomData,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to ${editingPart ? 'update' : 'create'} part`
        );
      }

      const partResult = await response.json();
      await handleSuccessfulSubmit(partResult);
    } catch (error) {
      handleSubmitError(error);
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

  const selectedPartType = partTypeOptions.find(
    opt => opt.value === formData.partType
  );

  const getBadgeColor = () => {
    if (selectedPartType?.value === 'FINISHED') return 'green';
    if (selectedPartType?.value === 'SEMI_FINISHED') return 'orange';
    return 'blue';
  };

  const getButtonText = () => {
    if (loading) return editingPart ? 'Updating Part...' : 'Creating Part...';
    if (success) return editingPart ? 'Updated!' : 'Created!';
    return editingPart ? 'Update Part' : 'Create Part';
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap='sm'>
          <IconPlus size={20} />
          <Text fw={600}>{title}</Text>
          {autoGeneratePN && generatedPartNumber && (
            <Badge color='blue' variant='light'>
              Auto-Generated: {generatedPartNumber}
            </Badge>
          )}
        </Group>
      }
      size='lg'
      centered
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value='create' leftSection={<IconPlus size={16} />}>
            {editingPart ? 'Edit Part' : 'Create Part'}
          </Tabs.Tab>
          <Tabs.Tab value='editor' leftSection={<IconEdit size={16} />}>
            Part Editor
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='create'>
          <Stack gap='md' mt='md'>
            {success && (
              <Alert color='green' icon={<IconCheck size={16} />}>
                {editingPart
                  ? 'Part updated successfully!'
                  : 'Part created successfully!'}{' '}
                Closing modal...
              </Alert>
            )}

            {errors.submit && (
              <Alert color='red' icon={<IconAlertCircle size={16} />}>
                {errors.submit}
              </Alert>
            )}

            {editingPart && (
              <Alert color='blue' icon={<IconInfoCircle size={16} />}>
                Editing part: <strong>{editingPart.partNumber}</strong>
                <Group mt='xs'>
                  <Button
                    size='xs'
                    variant='light'
                    onClick={() => {
                      setEditingPart(null);
                      setFormData({
                        partNumber: initialPartNumber,
                        partName: '',
                        partType: 'FINISHED',
                        description: '',
                        materialSpec: '',
                        unitOfMeasure: 'EA',
                        drawingNumber: '',
                        revisionLevel: '',
                        standardCost: undefined,
                        leadTime: undefined,
                        active: true,
                        notes: '',
                      });
                      setAutoGeneratePN(!initialPartNumber);
                    }}
                  >
                    Cancel Edit
                  </Button>
                </Group>
              </Alert>
            )}

            {/* Part Type Selection */}
            <Card withBorder p='md'>
              <Stack gap='sm'>
                <Group justify='space-between' align='center'>
                  <Text fw={500}>Part Classification</Text>
                  <Badge color={getBadgeColor()}>
                    {selectedPartType?.prefix}
                  </Badge>
                </Group>
                <Select
                  label='Part Type'
                  placeholder='Select part type'
                  required
                  data={partTypeOptions.map(opt => ({
                    value: opt.value,
                    label: opt.label,
                  }))}
                  value={formData.partType}
                  onChange={value => updateFormData('partType', value)}
                  error={errors.partType}
                  description={selectedPartType?.description}
                />

                {partTypeWarning && (
                  <Alert
                    icon={<IconAlertCircle size={16} />}
                    color='yellow'
                    variant='light'
                  >
                    {partTypeWarning}
                  </Alert>
                )}
              </Stack>
            </Card>

            {/* Part Number */}
            <Group align='end' gap='sm'>
              <div style={{ flex: 1 }}>
                <TextInput
                  label='Part Number'
                  placeholder='Enter part number or auto-generate'
                  required
                  value={formData.partNumber || ''}
                  onChange={e => updateFormData('partNumber', e.target.value)}
                  error={errors.partNumber}
                  disabled={autoGeneratePN}
                  description={
                    autoGeneratePN
                      ? 'Auto-generated based on part type'
                      : 'Unique identifier for this part'
                  }
                />
              </div>
              <Group gap='xs'>
                <Switch
                  label='Auto-generate'
                  checked={autoGeneratePN}
                  onChange={e => {
                    setAutoGeneratePN(e.currentTarget.checked);
                    if (e.currentTarget.checked && formData.partType) {
                      generatePartNumber(formData.partType);
                    }
                  }}
                  size='sm'
                />
                {autoGeneratePN && (
                  <Tooltip label='Regenerate part number'>
                    <ActionIcon
                      variant='light'
                      onClick={() =>
                        formData.partType &&
                        generatePartNumber(formData.partType)
                      }
                      disabled={loading}
                    >
                      <IconRefresh size={16} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            </Group>

            {/* Basic Information */}
            <Stack gap='sm'>
              <TextInput
                label='Part Name'
                placeholder='Descriptive name for the part'
                required
                value={formData.partName || ''}
                onChange={e => updateFormData('partName', e.target.value)}
                error={errors.partName}
              />

              <Textarea
                label='Description'
                placeholder='Detailed description of the part'
                value={formData.description || ''}
                onChange={e => updateFormData('description', e.target.value)}
                error={errors.description}
                autosize
                minRows={2}
                maxRows={4}
              />
            </Stack>

            {/* Engineering Details - Hidden in simple mode */}
            {!simpleMode && (
              <>
                <Divider label='Engineering Details' labelPosition='left' />

                {/* Engineering Information */}
                <Group grow>
                  <TextInput
                    label='Drawing Number'
                    placeholder='Engineering drawing number'
                    value={formData.drawingNumber || ''}
                    onChange={e =>
                      updateFormData('drawingNumber', e.target.value)
                    }
                    error={errors.drawingNumber}
                  />
                  <TextInput
                    label='Revision Level'
                    placeholder='Rev (A, B, C, etc.)'
                    value={formData.revisionLevel || ''}
                    onChange={e =>
                      updateFormData('revisionLevel', e.target.value)
                    }
                    error={errors.revisionLevel}
                  />
                </Group>

                <TextInput
                  label='Material Specification'
                  placeholder='Material spec (e.g., Ti-6Al-4V, 6061-T6)'
                  value={formData.materialSpec || ''}
                  onChange={e => updateFormData('materialSpec', e.target.value)}
                  error={errors.materialSpec}
                />
              </>
            )}

            {/* Operational Details - Hidden in simple mode */}
            {!simpleMode && (
              <>
                <Divider label='Operational Details' labelPosition='left' />

                {/* Operational Information */}
                <Group grow>
                  <Select
                    label='Unit of Measure'
                    placeholder='Select unit'
                    data={unitOptions}
                    value={formData.unitOfMeasure || ''}
                    onChange={value => updateFormData('unitOfMeasure', value)}
                    error={errors.unitOfMeasure}
                    searchable
                  />
                  <NumberInput
                    label='Standard Cost'
                    placeholder='Cost per unit'
                    value={formData.standardCost}
                    onChange={value => updateFormData('standardCost', value)}
                    error={errors.standardCost}
                    min={0}
                    decimalScale={4}
                    fixedDecimalScale={false}
                    prefix='$'
                  />
                </Group>

                <NumberInput
                  label='Lead Time (Days)'
                  placeholder='Manufacturing/procurement lead time'
                  value={formData.leadTime}
                  onChange={value => updateFormData('leadTime', value)}
                  error={errors.leadTime}
                  min={0}
                />

                <Textarea
                  label='Notes'
                  placeholder='Additional notes about this part'
                  value={formData.notes || ''}
                  onChange={e => updateFormData('notes', e.target.value)}
                  error={errors.notes}
                  autosize
                  minRows={2}
                  maxRows={3}
                />
              </>
            )}

            {/* BOM Composition Section - Hidden in simple mode */}
            {!simpleMode && (
              <>
                <Divider label='BOM Composition' labelPosition='left' />

                <Card withBorder p='md'>
                  <Stack gap='sm'>
                    <Group justify='space-between' align='center'>
                      <Group gap='sm'>
                        <Text fw={500}>Part Composition</Text>
                        <Badge
                          color={bomEnabled ? 'green' : 'gray'}
                          variant='light'
                          leftSection={
                            bomEnabled ? <IconCheck size={12} /> : undefined
                          }
                        >
                          {bomEnabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </Group>
                      <Switch
                        checked={bomEnabled}
                        onChange={e => {
                          const isEnabled = e.currentTarget.checked;
                          setBomEnabled(isEnabled);
                          if (!isEnabled) {
                            setBomComponents([]);
                          } else if (formData.partType === 'RAW_MATERIAL') {
                            // Auto-suggest Semi-Finished for raw materials that have components
                            updateFormData('partType', 'SEMI_FINISHED');
                          }
                        }}
                        label='This part is made of other parts'
                        size='sm'
                      />
                    </Group>

                    {bomEnabled && (
                      <Stack gap='sm'>
                        <Text size='sm' c='dimmed'>
                          Specify the parts and quantities that make up this
                          assembly
                        </Text>

                        {errors.bom && (
                          <Alert
                            color='red'
                            icon={<IconAlertCircle size={16} />}
                          >
                            {errors.bom}
                          </Alert>
                        )}

                        {bomComponents.length > 0 && (
                          <Card withBorder p='sm'>
                            <Stack gap='xs'>
                              {bomComponents.map((component, index) => {
                                const selectedPart = getSelectedPart(
                                  component.childPartId
                                );
                                return (
                                  <Group
                                    key={component.id}
                                    gap='sm'
                                    align='flex-start'
                                  >
                                    <Text
                                      size='sm'
                                      c='dimmed'
                                      style={{ minWidth: '20px' }}
                                    >
                                      {index + 1}.
                                    </Text>
                                    <div style={{ flex: 1 }}>
                                      <Select
                                        placeholder='Select component part'
                                        data={availableParts.map(part => ({
                                          value: part.id,
                                          label: `${part.partNumber} - ${part.partName}`,
                                        }))}
                                        value={component.childPartId}
                                        onChange={value =>
                                          updateBOMComponent(
                                            component.id,
                                            'childPartId',
                                            value || ''
                                          )
                                        }
                                        searchable
                                        size='sm'
                                        disabled={partsLoading}
                                      />
                                      {selectedPart && (
                                        <Text size='xs' c='dimmed' mt={2}>
                                          {selectedPart.description}
                                        </Text>
                                      )}
                                    </div>
                                    <NumberInput
                                      placeholder='Qty'
                                      value={component.quantity}
                                      onChange={value =>
                                        updateBOMComponent(
                                          component.id,
                                          'quantity',
                                          value || 1
                                        )
                                      }
                                      min={0.001}
                                      decimalScale={3}
                                      style={{ width: '80px' }}
                                      size='sm'
                                    />
                                    <Select
                                      placeholder='Unit'
                                      data={unitOptions}
                                      value={component.unitOfMeasure}
                                      onChange={value =>
                                        updateBOMComponent(
                                          component.id,
                                          'unitOfMeasure',
                                          value || 'EA'
                                        )
                                      }
                                      style={{ width: '80px' }}
                                      size='sm'
                                    />
                                    <ActionIcon
                                      color='red'
                                      variant='light'
                                      onClick={() =>
                                        removeBOMComponent(component.id)
                                      }
                                      size='sm'
                                    >
                                      <IconTrash size={14} />
                                    </ActionIcon>
                                  </Group>
                                );
                              })}
                            </Stack>
                          </Card>
                        )}

                        <Group justify='flex-start'>
                          <Button
                            leftSection={<IconPlus size={16} />}
                            variant='light'
                            onClick={addBOMComponent}
                            size='sm'
                            disabled={partsLoading}
                          >
                            Add Component
                          </Button>
                          {partsLoading && (
                            <Group gap='xs'>
                              <Loader size='xs' />
                              <Text size='sm' c='dimmed'>
                                Loading parts...
                              </Text>
                            </Group>
                          )}
                        </Group>

                        {bomComponents.length > 0 && (
                          <Alert
                            color='blue'
                            icon={<IconInfoCircle size={16} />}
                          >
                            <Text size='sm'>
                              This part will be created with{' '}
                              {bomComponents.length} component
                              {bomComponents.length !== 1 ? 's' : ''}. The BOM
                              structure will be automatically validated for
                              hierarchy compliance.
                            </Text>
                          </Alert>
                        )}
                      </Stack>
                    )}
                  </Stack>
                </Card>
              </>
            )}

            {/* Action Buttons */}
            <Group justify='flex-end' gap='sm' mt='md'>
              <Button variant='subtle' onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                loading={loading}
                leftSection={
                  loading ? <Loader size='xs' /> : <IconCheck size={16} />
                }
                disabled={success}
              >
                {getButtonText()}
              </Button>
            </Group>

            {/* Help Text */}
            <Alert color='blue' icon={<IconInfoCircle size={16} />}>
              <Text size='sm'>
                <strong>Part numbering:</strong> Parts are automatically
                assigned unique IDs based on type. Finished goods (FG-),
                Semi-finished (SF-), and Raw materials (RM-).
              </Text>
            </Alert>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value='editor'>
          <Stack gap='md' mt='md'>
            {errors.submit && (
              <Alert color='red' icon={<IconAlertCircle size={16} />}>
                {errors.submit}
              </Alert>
            )}

            <Group justify='space-between'>
              <Text size='lg' fw={500}>
                Part Editor
              </Text>
              <Button
                variant='light'
                leftSection={<IconRefresh size={16} />}
                onClick={loadAllParts}
                loading={editorLoading}
              >
                Refresh
              </Button>
            </Group>

            <TextInput
              placeholder='Search parts by number or name...'
              value={partSearchQuery}
              onChange={e => setPartSearchQuery(e.target.value)}
              leftSection={<IconSearch size={16} />}
            />

            <ScrollArea h={400}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Part Number</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Type</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredParts.map(part => (
                    <Table.Tr key={part.id}>
                      <Table.Td>
                        <Text size='sm' fw={500}>
                          {part.partNumber}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size='sm'>{part.partName}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getPartTypeBadgeColor(part.partType)}>
                          {part.partType.replace('_', ' ')}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap='xs'>
                          <Tooltip label='View Dependencies'>
                            <ActionIcon
                              size='sm'
                              variant='light'
                              color='blue'
                              onClick={() => handleViewDependencies(part.id)}
                            >
                              <IconInfoCircle size={14} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label='Edit Part'>
                            <ActionIcon
                              size='sm'
                              variant='light'
                              color='green'
                              onClick={() => handleEditPart(part)}
                            >
                              <IconEdit size={14} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label='Delete Part'>
                            <ActionIcon
                              size='sm'
                              variant='light'
                              color='red'
                              onClick={() => handleDeletePart(part.id)}
                            >
                              <IconTrash size={14} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

              {filteredParts.length === 0 && !editorLoading && (
                <Text size='sm' c='dimmed' ta='center' mt='xl'>
                  {allParts.length === 0
                    ? 'No parts found'
                    : 'No parts match your search'}
                </Text>
              )}

              {editorLoading && (
                <Group justify='center' mt='xl'>
                  <Loader size='sm' />
                  <Text size='sm' c='dimmed'>
                    Loading parts...
                  </Text>
                </Group>
              )}
            </ScrollArea>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
