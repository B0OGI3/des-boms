/**
 * Routing Templates Management Page - DES-BOMS
 *
 * Allows creation and management of reusable routing templates
 * for streamlined batch creation workflow.
 */

'use client';

import {
  Text,
  Card,
  Button,
  Group,
  Stack,
  Table,
  Badge,
  Modal,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Switch,
  Alert,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  IconPlus,
  IconSettings,
  IconClock,
  IconTrash,
} from '@tabler/icons-react';
import { LoadingScreen } from '../components/LoadingScreen';
import { usePageInitialization } from '@/hooks/usePageInitialization';
import { StandardPage } from '../components/ui/StandardPage';
import theme from '../theme';

interface RoutingTemplate {
  id: string;
  name: string;
  description?: string;
  steps: RoutingTemplateStep[];
}

interface RoutingTemplateStep {
  stepNumber: number;
  workstationId: string;
  workstationName: string;
  description: string;
  estimatedTime?: number;
  required: boolean;
  notes?: string;
}

interface Workstation {
  id: string;
  name: string;
  description?: string;
  active: boolean;
}

export default function RoutingTemplatesPage() {
  const [templates, setTemplates] = useState<RoutingTemplate[]>([]);
  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTemplateModal, setNewTemplateModal] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    steps: [] as any[],
  });

  const { isPageReady, pageInitialization, initializeTask, getProgress } =
    usePageInitialization({
      initialTasks: ['templates', 'workstations'],
      autoStart: false,
    });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await initializeTask('templates', async () => {
          const templatesRes = await fetch('/api/routing-templates');
          if (templatesRes.ok) {
            const templatesData = await templatesRes.json();
            setTemplates(templatesData.data || []);
          }
        });

        await initializeTask('workstations', async () => {
          const workstationsRes = await fetch('/api/workstations');
          if (workstationsRes.ok) {
            const workstationsData = await workstationsRes.json();
            setWorkstations(workstationsData.data || []);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initializeTask]);

  const addStep = () => {
    setTemplateForm({
      ...templateForm,
      steps: [
        ...templateForm.steps,
        {
          workstationId: '',
          description: '',
          estimatedTime: 60,
          required: true,
          notes: '',
        },
      ],
    });
  };

  const updateStep = (index: number, field: string, value: any) => {
    const updatedSteps = [...templateForm.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setTemplateForm({ ...templateForm, steps: updatedSteps });
  };

  const removeStep = (index: number) => {
    const updatedSteps = templateForm.steps.filter((_, i) => i !== index);
    setTemplateForm({ ...templateForm, steps: updatedSteps });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/routing-templates/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateForm),
      });

      if (response.ok) {
        // Refresh templates
        const templatesRes = await fetch('/api/routing-templates');
        if (templatesRes.ok) {
          const templatesData = await templatesRes.json();
          setTemplates(templatesData.data || []);
        }

        // Reset form
        setTemplateForm({ name: '', description: '', steps: [] });
        setNewTemplateModal(false);
      }
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  if (!isPageReady || loading) {
    return (
      <LoadingScreen
        title='Loading Routing Templates'
        description='Initializing routing template management...'
        icon='🗺️'
        pageInitialization={pageInitialization}
        progress={getProgress()}
      />
    );
  }

  return (
    <StandardPage
      title='Routing Templates'
      subtitle='Manage reusable manufacturing routing workflows'
      icon='🛠️'
      accentColor={theme.pageAccents.batches}
      showBackButton={true}
    >
      <Group justify='space-between' mb='xl'>
        <div></div>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setNewTemplateModal(true)}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            border: 'none',
          }}
        >
          New Template
        </Button>
      </Group>

      {templates.length === 0 ? (
        <Alert
          color='blue'
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}
        >
          <Text style={{ color: '#93c5fd' }}>
            No custom routing templates found. Default templates will be used
            for batch creation.
          </Text>
        </Alert>
      ) : (
        <Card
          style={{
            background: 'rgba(30, 41, 59, 0.85)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(51, 65, 85, 0.7)',
          }}
        >
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ color: '#f1f5f9' }}>Template Name</Table.Th>
                <Table.Th style={{ color: '#f1f5f9' }}>Description</Table.Th>
                <Table.Th style={{ color: '#f1f5f9' }}>Steps</Table.Th>
                <Table.Th style={{ color: '#f1f5f9' }}>Total Time</Table.Th>
                <Table.Th style={{ color: '#f1f5f9' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {templates.map(template => (
                <Table.Tr key={template.id}>
                  <Table.Td style={{ color: '#f1f5f9' }}>
                    {template.name}
                  </Table.Td>
                  <Table.Td style={{ color: '#cbd5e1' }}>
                    {template.description || 'No description'}
                  </Table.Td>
                  <Table.Td>
                    <Badge variant='light' color='blue'>
                      {template.steps.length} steps
                    </Badge>
                  </Table.Td>
                  <Table.Td style={{ color: '#cbd5e1' }}>
                    <Group gap='xs'>
                      <IconClock size={14} />
                      {template.steps.reduce(
                        (total, step) => total + (step.estimatedTime || 0),
                        0
                      )}{' '}
                      min
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap='xs'>
                      <Button
                        size='xs'
                        variant='light'
                        leftSection={<IconSettings size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        size='xs'
                        variant='light'
                        color='red'
                        leftSection={<IconTrash size={14} />}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      )}

      {/* New Template Modal */}
      <Modal
        opened={newTemplateModal}
        onClose={() => setNewTemplateModal(false)}
        title={
          <Text fw={600} style={{ color: '#f1f5f9' }}>
            🛠️ Create Routing Template
          </Text>
        }
        size='xl'
        styles={{
          content: {
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(51, 65, 85, 0.7)',
          },
          header: {
            background: 'transparent',
            borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
          },
          title: {
            color: '#f1f5f9',
            fontWeight: 600,
          },
        }}
      >
        <Stack gap='md'>
          <TextInput
            label='Template Name'
            placeholder='e.g., Standard Machining'
            value={templateForm.name}
            onChange={event =>
              setTemplateForm({ ...templateForm, name: event.target.value })
            }
            styles={{
              label: { color: '#f1f5f9' },
              input: {
                background: 'rgba(51, 65, 85, 0.5)',
                border: '1px solid rgba(71, 85, 105, 0.5)',
                color: '#f1f5f9',
              },
            }}
          />

          <Textarea
            label='Description'
            placeholder='Describe this routing template...'
            value={templateForm.description}
            onChange={event =>
              setTemplateForm({
                ...templateForm,
                description: event.target.value,
              })
            }
            styles={{
              label: { color: '#f1f5f9' },
              input: {
                background: 'rgba(51, 65, 85, 0.5)',
                border: '1px solid rgba(71, 85, 105, 0.5)',
                color: '#f1f5f9',
              },
            }}
          />

          <div>
            <Group justify='space-between' mb='md'>
              <Text fw={500} style={{ color: '#f1f5f9' }}>
                Routing Steps
              </Text>
              <Button
                size='xs'
                onClick={addStep}
                leftSection={<IconPlus size={14} />}
              >
                Add Step
              </Button>
            </Group>

            <Stack gap='md'>
              {templateForm.steps.map((step, index) => (
                <Card
                  key={`step-${index}-${step.workstationId || 'new'}`}
                  style={{
                    background: 'rgba(51, 65, 85, 0.3)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(71, 85, 105, 0.3)',
                  }}
                >
                  <Group justify='space-between' mb='md'>
                    <Text fw={500} style={{ color: '#f1f5f9' }}>
                      Step {index + 1}
                    </Text>
                    <Button
                      size='xs'
                      variant='subtle'
                      color='red'
                      onClick={() => removeStep(index)}
                    >
                      Remove
                    </Button>
                  </Group>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                    }}
                  >
                    <Select
                      label='Workstation'
                      placeholder='Select workstation'
                      value={step.workstationId}
                      onChange={value =>
                        updateStep(index, 'workstationId', value)
                      }
                      data={workstations.map(ws => ({
                        value: ws.id,
                        label: ws.name,
                      }))}
                      styles={{
                        label: { color: '#f1f5f9' },
                        input: {
                          background: 'rgba(51, 65, 85, 0.5)',
                          border: '1px solid rgba(71, 85, 105, 0.5)',
                          color: '#f1f5f9',
                        },
                      }}
                    />

                    <NumberInput
                      label='Estimated Time (minutes)'
                      value={step.estimatedTime}
                      onChange={value =>
                        updateStep(index, 'estimatedTime', value)
                      }
                      min={1}
                      styles={{
                        label: { color: '#f1f5f9' },
                        input: {
                          background: 'rgba(51, 65, 85, 0.5)',
                          border: '1px solid rgba(71, 85, 105, 0.5)',
                          color: '#f1f5f9',
                        },
                      }}
                    />
                  </div>

                  <TextInput
                    label='Description'
                    placeholder='Describe this step...'
                    value={step.description}
                    onChange={event =>
                      updateStep(index, 'description', event.target.value)
                    }
                    mt='md'
                    styles={{
                      label: { color: '#f1f5f9' },
                      input: {
                        background: 'rgba(51, 65, 85, 0.5)',
                        border: '1px solid rgba(71, 85, 105, 0.5)',
                        color: '#f1f5f9',
                      },
                    }}
                  />

                  <Group mt='md'>
                    <Switch
                      label='Required Step'
                      checked={step.required}
                      onChange={event =>
                        updateStep(index, 'required', event.target.checked)
                      }
                      styles={{
                        label: { color: '#f1f5f9' },
                      }}
                    />
                  </Group>
                </Card>
              ))}
            </Stack>
          </div>

          <Group justify='flex-end' mt='md'>
            <Button variant='subtle' onClick={() => setNewTemplateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!templateForm.name || templateForm.steps.length === 0}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
              }}
            >
              Create Template
            </Button>
          </Group>
        </Stack>
      </Modal>
    </StandardPage>
  );
}
