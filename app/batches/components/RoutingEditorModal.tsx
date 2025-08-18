'use client';

import { useState, useEffect } from 'react';
import { Modal, Stack, Group, Button, Text, Select, NumberInput, ActionIcon, Box, Badge, Divider } from '@mantine/core';
import { IconTrash, IconPlus, IconGripVertical } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

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

export function RoutingEditorModal({ opened, onClose, batchId, currentSteps, onSave }: RoutingEditorModalProps) {
  const [steps, setSteps] = useState<RoutingStep[]>(currentSteps);
  const [templates, setTemplates] = useState<RoutingTemplate[]>([]);
  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (opened) {
      fetchTemplatesAndWorkstations();
      setSteps(currentSteps);
    }
  }, [opened, currentSteps]);

  const fetchTemplatesAndWorkstations = async () => {
    try {
      const [templatesRes, workstationsRes] = await Promise.all([
        fetch('/api/routing-templates'),
        fetch('/api/workstations')
      ]);

      if (templatesRes.ok) {
        const templatesData = await templatesRes.json();
        // Handle both direct array and wrapped response formats
        const templates = Array.isArray(templatesData) ? templatesData : templatesData.data || [];
        setTemplates(templates);
      }

      if (workstationsRes.ok) {
        const workstationsData = await workstationsRes.json();
        // Handle both direct array and wrapped response formats
        const workstations = Array.isArray(workstationsData) ? workstationsData : workstationsData.data || [];
        setWorkstations(workstations);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to load routing templates and workstations',
        color: 'red'
      });
    }
  };

  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newSteps = template.steps.map(step => ({
        stepNumber: step.stepNumber,
        workstationId: step.workstationId,
        estimatedMinutes: step.estimatedMinutes,
        description: step.description
      }));
      setSteps(newSteps);
      setSelectedTemplate(templateId);
    }
  };

  const addStep = () => {
    const newStep: RoutingStep = {
      stepNumber: steps.length + 1,
      workstationId: workstations[0]?.id || '',
      estimatedMinutes: 60,
      description: 'New routing step'
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (index: number, field: keyof RoutingStep, value: any) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const removeStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    // Renumber steps
    const renumberedSteps = updatedSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1
    }));
    setSteps(renumberedSteps);
  };

  const handleSave = async () => {
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
          color: 'green'
        });
        return;
      }

      // For real batches, make API call
      const response = await fetch(`/api/batches/${batchId}/routing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ steps })
      });

      if (response.ok) {
        onSave(steps);
        onClose();
        notifications.show({
          title: 'Success',
          message: 'Routing updated successfully',
          color: 'green'
        });
      } else {
        throw new Error('Failed to update routing');
      }
    } catch (error) {
      console.error('Error saving routing:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to save routing changes',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Batch Routing"
      size="lg"
      styles={{
        title: { fontWeight: 600, fontSize: '1.2rem' }
      }}
    >
      <Stack gap="md">
        {/* Template Selection */}
        <Box>
          <Text size="sm" fw={500} mb="xs">Apply Routing Template</Text>
          <Group gap="xs">
            <Select
              placeholder="Choose a template..."
              data={Array.isArray(templates) ? templates.map(t => ({ value: t.id, label: t.name })) : []}
              value={selectedTemplate}
              onChange={(value) => value && applyTemplate(value)}
              style={{ flex: 1 }}
            />
            <Button
              variant="light"
              size="sm"
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
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={500}>Routing Steps</Text>
            <Button
              variant="light"
              size="sm"
              leftSection={<IconPlus size={14} />}
              onClick={addStep}
            >
              Add Step
            </Button>
          </Group>

          <Stack gap="xs">
            {steps.map((step, index) => (
              <Box key={`step-${step.stepNumber}-${index}`} p="md" style={{ border: '1px solid #e9ecef', borderRadius: '8px' }}>
                <Group gap="sm" align="flex-start">
                  <IconGripVertical size={16} style={{ color: '#adb5bd', marginTop: '8px' }} />
                  
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Group gap="sm">
                      <Badge variant="light" size="sm">
                        Step {step.stepNumber}
                      </Badge>
                      <Select
                        placeholder="Select workstation"
                        data={Array.isArray(workstations) ? workstations.map(w => ({ 
                          value: w.id, 
                          label: `${w.name} (${w.type})` 
                        })) : []}
                        value={step.workstationId}
                        onChange={(value) => value && updateStep(index, 'workstationId', value)}
                        style={{ flex: 1 }}
                      />
                      <NumberInput
                        placeholder="Minutes"
                        value={step.estimatedMinutes}
                        onChange={(value) => updateStep(index, 'estimatedMinutes', value)}
                        min={1}
                        style={{ width: '100px' }}
                      />
                      <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => removeStep(index)}
                      >
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Group>
                    
                    <Text
                      size="sm"
                      style={{ 
                        border: '1px solid #e9ecef', 
                        borderRadius: '4px', 
                        padding: '6px 8px',
                        backgroundColor: '#f8f9fa'
                      }}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateStep(index, 'description', e.currentTarget.textContent || '')}
                    >
                      {step.description}
                    </Text>
                  </Stack>
                </Group>
              </Box>
            ))}
            
            {steps.length === 0 && (
              <Box p="xl" style={{ textAlign: 'center', color: '#adb5bd' }}>
                <Text size="sm">No routing steps defined</Text>
                <Text size="xs">Add steps manually or apply a template</Text>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Actions */}
        <Group justify="flex-end" mt="md">
          <Button variant="light" onClick={onClose}>
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
