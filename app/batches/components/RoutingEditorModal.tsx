'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Stack,
  Group,
  Button,
  Text,
  Select,
  NumberInput,
  ActionIcon,
  Box,
  Badge,
  Divider,
} from '@mantine/core';
import { IconTrash, IconPlus, IconGripVertical } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

// Module-level default combobox props so both component and module-scoped
// subcomponents can reference the same stable object.
const DEFAULT_COMBOBOX_PROPS = {
  withinPortal: true,
  middlewares: { flip: false, shift: false },
} as const;

interface RoutingStep {
  id?: string;
  stepNumber: number;
  workstationId: string;
  estimatedMinutes: number;
  description: string;
  status?: string;
}

interface RoutingTemplate {
  id: string;
  name: string;
  description: string;
  steps: Array<{
    stepNumber: number;
    workstationId: string;
    estimatedMinutes: number;
    description: string;
  }>;
}

interface Workstation {
  id: string;
  name: string;
  type: string;
}

interface RoutingEditorModalProps {
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly batchId: string;
  readonly currentSteps: RoutingStep[];
  readonly onSave: (steps: RoutingStep[]) => void;
}

export function RoutingEditorModal({
  opened,
  onClose,
  batchId,
  currentSteps,
  onSave,
}: RoutingEditorModalProps) {
  const [steps, setSteps] = useState<RoutingStep[]>(currentSteps);
  const [templates, setTemplates] = useState<RoutingTemplate[]>([]);
  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTemplatesAndWorkstations = useCallback(async () => {
    try {
      const [templatesRes, workstationsRes] = await Promise.all([
        fetch('/api/routing-templates'),
        fetch('/api/workstations'),
      ]);

      if (templatesRes.ok) {
        const templatesData = await templatesRes.json();
        // Handle both direct array and wrapped response formats
        const templates = Array.isArray(templatesData)
          ? templatesData
          : templatesData.data || [];
        setTemplates(templates);
      }

      if (workstationsRes.ok) {
        const workstationsData = await workstationsRes.json();
        // Handle both direct array and wrapped response formats
        const workstations = Array.isArray(workstationsData)
          ? workstationsData
          : workstationsData.data || [];
        setWorkstations(workstations);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to load routing templates and workstations',
        color: 'red',
      });
    }
  }, []);

  useEffect(() => {
    if (opened) {
      fetchTemplatesAndWorkstations();
      setSteps(currentSteps);
    }
  }, [opened, currentSteps, fetchTemplatesAndWorkstations]);

  const applyTemplate = useCallback(
    (templateId: string) => {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        const newSteps = template.steps.map(step => ({
          stepNumber: step.stepNumber,
          workstationId: step.workstationId,
          estimatedMinutes: step.estimatedMinutes,
          description: step.description,
        }));
        setSteps(newSteps);
        setSelectedTemplate(templateId);
      }
    },
    [templates]
  );

  // Memoized select options to avoid recreating arrays on each render
  const templateOptions = React.useMemo(
    () =>
      Array.isArray(templates)
        ? templates.map(t => ({ value: t.id, label: t.name }))
        : [],
    [templates]
  );

  const workstationOptions = React.useMemo(
    () =>
      Array.isArray(workstations)
        ? workstations.map(w => ({
            value: w.id,
            label: `${w.name} (${w.type})`,
          }))
        : [],
    [workstations]
  );

  // StepEditor moved to module scope below

  const addStep = useCallback(() => {
    setSteps(prev => {
      const newStep: RoutingStep = {
        stepNumber: prev.length + 1,
        workstationId: workstations[0]?.id || '',
        estimatedMinutes: 60,
        description: 'New routing step',
      };
      return [...prev, newStep];
    });
  }, [workstations]);

  const updateStep = useCallback(
    (index: number, field: keyof RoutingStep, value: any) => {
      setSteps(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    []
  );

  const removeStep = useCallback((index: number) => {
    setSteps(prev => {
      const updatedSteps = prev.filter((_, i) => i !== index);
      // Renumber steps
      return updatedSteps.map((step, i) => ({ ...step, stepNumber: i + 1 }));
    });
  }, []);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      // Check if this is a temporary batch (used in Smart Batch Generation)
      if (batchId.startsWith('temp-')) {
        // For temporary batches, just call onSave without making API call
        onSave(steps);
        onClose();
        notifications.show({
          title: 'Success',
          message: 'Workflow steps updated',
          color: 'green',
        });
        return;
      }

      // For real batches, make API call
      const response = await fetch(`/api/batches/${batchId}/routing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ steps }),
      });

      if (response.ok) {
        onSave(steps);
        onClose();
        notifications.show({
          title: 'Success',
          message: 'Routing updated successfully',
          color: 'green',
        });
      } else {
        throw new Error('Failed to update routing');
      }
    } catch (error) {
      console.error('Error saving routing:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to save routing changes',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }, [batchId, onSave, onClose, steps]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Edit Batch Routing'
      size='lg'
      styles={{
        title: { fontWeight: 600, fontSize: '1.2rem' },
      }}
    >
      <Stack gap='md'>
        {/* Template Selection */}
        <Box>
          <Text size='sm' fw={500} mb='xs'>
            Apply Routing Template
          </Text>
          <Group gap='xs'>
            <Select
              placeholder='Choose a template...'
              data={templateOptions}
              value={selectedTemplate}
              onChange={value => value && applyTemplate(value)}
              style={{ flex: 1 }}
              comboboxProps={DEFAULT_COMBOBOX_PROPS}
              maxDropdownHeight={300}
            />
            <Button
              variant='light'
              size='sm'
              onClick={() => {
                setSteps([]);
                setSelectedTemplate(null);
              }}
            >
              Clear All
            </Button>
          </Group>
        </Box>

        <Divider />

        {/* Steps Editor */}
        <Box>
          <Group justify='space-between' mb='xs'>
            <Text size='sm' fw={500}>
              Routing Steps
            </Text>
            <Button
              variant='light'
              size='sm'
              leftSection={<IconPlus size={14} />}
              onClick={addStep}
            >
              Add Step
            </Button>
          </Group>

          <Stack gap='xs'>
            {steps.map((step, index) => (
              <StepEditor
                key={`step-${step.stepNumber}-${index}`}
                step={step}
                index={index}
                workstationOptions={workstationOptions}
                updateStep={updateStep}
                removeStep={removeStep}
              />
            ))}

            {steps.length === 0 && (
              <Box p='xl' style={{ textAlign: 'center', color: '#adb5bd' }}>
                <Text size='sm'>No routing steps defined</Text>
                <Text size='xs'>Add steps manually or apply a template</Text>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Actions */}
        <Group justify='flex-end' mt='md'>
          <Button variant='light' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            loading={loading}
            disabled={steps.length === 0}
          >
            Save Routing
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

// Module-scoped StepEditor component to keep stable identity and avoid inline objects
const StepEditor: React.FC<{
  step: RoutingStep;
  index: number;
  workstationOptions: { value: string; label: string }[];
  updateStep: (index: number, field: keyof RoutingStep, value: any) => void;
  removeStep: (index: number) => void;
}> = React.memo(
  ({ step, index, workstationOptions, updateStep, removeStep }) => {
    const handleWorkstationChange = React.useCallback(
      (value: string | null) => {
        if (!value) return;
        updateStep(index, 'workstationId', value);
      },
      [index, updateStep]
    );

    const handleMinutesChange = React.useCallback(
      (value: string | number) => {
        const n = Number(value) || 0;
        updateStep(index, 'estimatedMinutes', n);
      },
      [index, updateStep]
    );

    const handleDescriptionBlur = React.useCallback(
      (content: string) => {
        updateStep(index, 'description', content);
      },
      [index, updateStep]
    );

    return (
      <Box p='md' style={{ border: '1px solid #e9ecef', borderRadius: '8px' }}>
        <Group gap='sm' align='flex-start'>
          <IconGripVertical
            size={16}
            style={{ color: '#adb5bd', marginTop: '8px' }}
          />

          <Stack gap='xs' style={{ flex: 1 }}>
            <Group gap='sm'>
              <Badge variant='light' size='sm'>
                Step {step.stepNumber}
              </Badge>
              <Select
                placeholder='Select workstation'
                data={workstationOptions}
                value={step.workstationId}
                onChange={handleWorkstationChange}
                style={{ flex: 1 }}
                comboboxProps={DEFAULT_COMBOBOX_PROPS}
                maxDropdownHeight={260}
              />
              <NumberInput
                placeholder='Minutes'
                value={step.estimatedMinutes}
                onChange={handleMinutesChange}
                min={1}
                style={{ width: '100px' }}
              />
              <ActionIcon
                color='red'
                variant='light'
                onClick={() => removeStep(index)}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Group>

            <Text
              size='sm'
              style={{
                border: '1px solid #e9ecef',
                borderRadius: '4px',
                padding: '6px 8px',
                backgroundColor: '#f8f9fa',
              }}
              contentEditable
              suppressContentEditableWarning
              onBlur={e =>
                handleDescriptionBlur(e.currentTarget.textContent || '')
              }
            >
              {step.description}
            </Text>
          </Stack>
        </Group>
      </Box>
    );
  }
);

StepEditor.displayName = 'StepEditor';
