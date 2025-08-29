/**
 * DES-BOMS Workstation Management - SECURE OPERATOR SIGN-OFF REQUIRED
 *
 * Streamlined workstation management interface with mandatory operator authentication
 * for all manufacturing operations. Requires authenticated operator sign-off for
 * accountability and quality control.
 *
 * Core DES-BOMS Features:
 * - Mandatory operator login/authentication before any step actions
 * - Complete routing step management (start/complete/flag) with operator tracking
 * - Photo uploads and detailed notes for documentation with operator attribution
 * - Real-time job queue updates and status tracking with operator accountability
 * - Part number, customer, and priority information display
 * - Manufacturing workflow control optimized for efficiency and compliance
 *
 * REQUIRES AUTHENTICATED OPERATOR SIGN-OFF for all manufacturing steps
 */

'use client';

import {
  Title,
  Text,
  Card,
  Badge,
  Group,
  Stack,
  Alert,
  Button,
  Select,
  Grid,
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  FileInput,
  Switch,
  NumberInput,
} from '@mantine/core';
import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import {
  IconPlayerPlay,
  IconCheck,
  IconFlag,
  IconCamera,
  IconRefresh,
  IconPlus,
  IconEdit,
  IconUser,
} from '@tabler/icons-react';
import { LoadingScreen } from '../components/LoadingScreen';
import { WorkOrderTracking } from '../components';
import { StandardPage } from '../components/ui';
import { OperatorAuth } from '../components/OperatorAuth';
import { usePageInitialization } from '../../hooks';
import theme from '../theme';

// Default combobox props used across Select/Autocomplete to stabilize portal/Popper
const DEFAULT_COMBOBOX_PROPS = {
  withinPortal: true,
  middlewares: { flip: false, shift: false },
} as const;

interface Workstation {
  id: string;
  name: string;
  description: string;
  active: boolean;
  category?: string;
  location?: string;
  status?: 'ACTIVE' | 'IDLE' | 'MAINTENANCE';
  activeJobs?: number;
  queuedJobs?: number;
}

interface RoutingStep {
  id: string;
  stepNumber: number;
  description: string;
  estimatedTime: number; // Consistent with our WorkflowStep interface
  notes?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FLAGGED' | 'FAILED';
  startTime?: string;
  endTime?: string;
  operatorName?: string;
  batch: {
    id: string;
    batchId: string;
    priority: 'RUSH' | 'STANDARD' | 'HOLD';
    lineItem: {
      quantity: number;
      part: {
        id: string;
        partNumber: string;
        partName: string;
        partType: 'FINISHED_GOOD' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
        description?: string;
      };
      purchaseOrder: {
        customer: {
          name: string;
        };
      };
    };
  };
  // BOM-aware material requirements
  materialRequirements?: string[];
  confirmations?: Array<{
    id: string;
    operatorName: string;
    startTime: string;
    endTime?: string;
    photoPath?: string;
    notes?: string;
  }>;
}

interface Operator {
  id: string;
  operatorId: string;
  operatorName: string;
  certifications: string[];
  shift: 'DAY' | 'SWING' | 'NIGHT' | 'FLEXIBLE';
  active: boolean;
  currentWorkstationId?: string;
  loginTime?: string;
  logoutTime?: string;
}

// Reusable type alias for action union to satisfy Sonar rule S4323
type StepAction = 'start' | 'complete' | 'flag';

// Lightweight memoized card for each workstation to avoid heavy re-renders
type WorkstationCardProps = {
  workstation: Workstation;
  onEdit: (w: Workstation) => void;
};

const WorkstationCard = memo(function WorkstationCard({
  workstation,
  onEdit,
}: WorkstationCardProps) {
  return (
    <Card
      style={{
        background: 'rgba(51, 65, 85, 0.5)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(71, 85, 105, 0.5)',
      }}
    >
      <Group justify='space-between' align='flex-start'>
        <div style={{ flex: 1 }}>
          <Group gap='sm' mb='xs'>
            <Text fw={600} style={{ color: '#f1f5f9' }}>
              {workstation.name}
            </Text>
            <Badge
              color={workstation.active ? 'green' : 'red'}
              variant='filled'
            >
              {workstation.active ? 'Active' : 'Inactive'}
            </Badge>
          </Group>
          <Text size='sm' style={{ color: '#cbd5e1' }}>
            {workstation.description}
          </Text>
          {workstation.category && (
            <Text size='xs' style={{ color: '#94a3b8' }}>
              Type: {workstation.category}
            </Text>
          )}
          {workstation.location && (
            <Text size='xs' style={{ color: '#94a3b8' }}>
              Location: {workstation.location}
            </Text>
          )}
        </div>
        <ActionIcon
          color='blue'
          variant='light'
          onClick={() => onEdit(workstation)}
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
});

export default function WorkstationsPage() {
  // Page initialization
  const { isPageReady, pageInitialization, initializePage } =
    usePageInitialization({
      initialTasks: ['workstations', 'routing', 'components'],
      autoStart: false,
    });

  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedWorkstation, setSelectedWorkstation] = useState<string>('');
  const [routingSteps, setRoutingSteps] = useState<RoutingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [stepActionModal, setStepActionModal] = useState<{
    open: boolean;
    step?: RoutingStep;
    action?: StepAction;
  }>({ open: false });
  const [workstationModal, setWorkstationModal] = useState<{
    open: boolean;
    workstation?: Workstation;
    mode: 'add' | 'edit';
  }>({ open: false, mode: 'add' });
  const [actionNotes, setActionNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [batchMaterials, setBatchMaterials] = useState<any[]>([]);
  const [materialConsumption, setMaterialConsumption] = useState<{
    [key: string]: number;
  }>({});

  // OPERATOR AUTHENTICATION STATE
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);

  // Workstation form state
  const [workstationForm, setWorkstationForm] = useState({
    name: '',
    description: '',
    category: 'MACHINING',
    location: '',
    active: true,
  });

  // Initialize page with data fetching
  useEffect(() => {
    if (typeof window === 'undefined') return;

    initializePage([
      {
        name: 'workstations',
        fn: async () => {
          const response = await fetch('/api/workstations');
          if (response.ok) {
            const result = await response.json();
            setWorkstations(result.data || []);
          }
        },
      },
      { name: 'routing' },
      { name: 'components' },
    ]).finally(() => {
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Memoize Select data for workstations to avoid recreating array each render
  const workstationOptions = useMemo(
    () =>
      workstations.map(ws => ({
        value: ws.id,
        label: `${ws.name} - ${ws.description}`,
      })),
    [workstations]
  );

  const workstationCategoryOptions = useMemo(
    () => [
      { value: 'MACHINING', label: 'Machining' },
      { value: 'ASSEMBLY', label: 'Assembly' },
      { value: 'WELDING', label: 'Welding' },
      { value: 'INSPECTION', label: 'Inspection' },
      { value: 'PACKAGING', label: 'Packaging' },
      { value: 'PREP', label: 'Preparation' },
      { value: 'FINISHING', label: 'Finishing' },
      { value: 'OTHER', label: 'Other' },
    ],
    []
  );

  // (DEFAULT_COMBOBOX_PROPS hoisted to module scope)

  const handleWorkstationSelect = useCallback((value: string | null) => {
    setSelectedWorkstation(value || '');
  }, []);

  // Handle workstation creation/update
  const handleWorkstationSave = async () => {
    try {
      const url = '/api/workstations';
      const method = workstationModal.mode === 'add' ? 'POST' : 'PUT';
      const body =
        workstationModal.mode === 'edit'
          ? { ...workstationForm, id: workstationModal.workstation?.id }
          : workstationForm;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Refresh workstations list
        const workstationsResponse = await fetch('/api/workstations');
        if (workstationsResponse.ok) {
          const result = await workstationsResponse.json();
          setWorkstations(result.data || []);
        }

        // Close modal and reset form
        setWorkstationModal({ open: false, mode: 'add' });
        setWorkstationForm({
          name: '',
          description: '',
          category: 'MACHINING',
          location: '',
          active: true,
        });
      }
    } catch (error) {
      console.error('Error saving workstation:', error);
    }
  };

  // Stable handlers for modal inputs to avoid inline function identities
  const handleWorkstationNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setWorkstationForm(prev => ({ ...prev, name: event.target.value })),
    []
  );

  const handleWorkstationDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setWorkstationForm(prev => ({
        ...prev,
        description: event.target.value,
      })),
    []
  );

  const handleWorkstationCategoryChange = useCallback(
    (value: string | null) =>
      setWorkstationForm(prev => ({ ...prev, category: value || 'MACHINING' })),
    []
  );

  const handleWorkstationLocationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setWorkstationForm(prev => ({ ...prev, location: event.target.value })),
    []
  );

  const handleWorkstationActiveChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setWorkstationForm(prev => ({
        ...prev,
        active: event.currentTarget.checked,
      })),
    []
  );

  // Stabilize handlers so memoized workstation cards don't re-render unnecessarily
  const handleEditWorkstationCb = useCallback((workstation: Workstation) => {
    setWorkstationForm({
      name: workstation.name,
      description: workstation.description || '',
      category: workstation.category || 'MACHINING',
      location: workstation.location || '',
      active: workstation.active,
    });
    setWorkstationModal({ open: true, mode: 'edit', workstation });
  }, []);

  const handleAddWorkstationCb = useCallback(() => {
    setWorkstationForm({
      name: '',
      description: '',
      category: 'MACHINING',
      location: '',
      active: true,
    });
    setWorkstationModal({ open: true, mode: 'add' });
  }, []);

  // Fetch routing steps for selected workstation
  useEffect(() => {
    if (!selectedWorkstation) {
      setRoutingSteps([]);
      return;
    }

    const fetchRoutingSteps = async () => {
      try {
        const response = await fetch(
          `/api/routing-steps?workstationId=${selectedWorkstation}&status=PENDING,IN_PROGRESS`
        );
        if (response.ok) {
          const result = await response.json();
          setRoutingSteps(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching routing steps:', error);
      }
    };

    fetchRoutingSteps();

    // Refresh every 30 seconds
    const interval = setInterval(fetchRoutingSteps, 30000);
    return () => clearInterval(interval);
  }, [selectedWorkstation]);

  // Fetch material requirements when step modal opens
  useEffect(() => {
    if (
      stepActionModal.open &&
      stepActionModal.step &&
      stepActionModal.action === 'complete'
    ) {
      fetchBatchMaterials(stepActionModal.step.batch.id);
    }
  }, [stepActionModal.open, stepActionModal.step, stepActionModal.action]);

  // Fetch material requirements for a batch
  const fetchBatchMaterials = async (batchId: string) => {
    try {
      const response = await fetch(`/api/batches/${batchId}/materials`);
      if (response.ok) {
        const result = await response.json();
        setBatchMaterials(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching batch materials:', error);
    }
  };

  // Prepare FormData for step confirmation
  const prepareStepConfirmationFormData = (
    step: any,
    action: StepAction,
    operator: Operator
  ) => {
    const fd = new FormData();
    fd.append('stepId', step.id);
    fd.append('workstationId', selectedWorkstation);
    fd.append('operatorName', operator.operatorName);
    fd.append('operatorId', operator.operatorId);
    fd.append('action', action);
    if (actionNotes) fd.append('notes', actionNotes);
    if (uploadedFile) fd.append('photo', uploadedFile);
    return fd;
  };

  // Record material consumption for a completed step
  const recordMaterialConsumption = async (batchId: string, stepId: string) => {
    if (Object.keys(materialConsumption).length === 0) return;
    try {
      await fetch(`/api/batches/${batchId}/materials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consumptions: Object.entries(materialConsumption).map(
            ([partId, actualQuantity]) => ({
              partId,
              actualQuantity,
              stepId,
            })
          ),
        }),
      });
    } catch (error) {
      console.error('Error recording material consumption:', error);
    }
  };

  // Refresh routing steps for the selected workstation
  const refreshRoutingSteps = async () => {
    try {
      const stepsResponse = await fetch(
        `/api/routing-steps?workstationId=${selectedWorkstation}&status=PENDING,IN_PROGRESS`
      );
      if (stepsResponse.ok) {
        const json = await stepsResponse.json();
        setRoutingSteps(json.data || []);
      }
    } catch (err) {
      console.error('Error refreshing routing steps:', err);
    }
  };

  const handleStepAction = async (action: StepAction) => {
    if (!stepActionModal.step) return;

    // REQUIRE OPERATOR AUTHENTICATION BEFORE ANY STEP ACTION
    if (!currentOperator) {
      alert(
        'Operator authentication required. Please log in before confirming steps.'
      );
      return;
    }

    // Verify operator is logged into the correct workstation
    if (currentOperator.currentWorkstationId !== selectedWorkstation) {
      alert('You are not logged into this workstation. Please log in first.');
      return;
    }

    try {
      const fd = prepareStepConfirmationFormData(
        stepActionModal.step,
        action,
        currentOperator
      );

      const response = await fetch('/api/step-confirmations', {
        method: 'POST',
        body: fd,
      });

      if (response.ok) {
        // Log confirmation
        console.log(
          `Step ${action} confirmed by ${currentOperator.operatorName}`
        );

        // Record material consumption if completing
        if (action === 'complete' && stepActionModal.step) {
          await recordMaterialConsumption(
            stepActionModal.step.batch.id,
            stepActionModal.step.id
          );
        }

        // Refresh routing steps
        await refreshRoutingSteps();

        // Close modal and reset
        setStepActionModal({ open: false });
        setActionNotes('');
        setUploadedFile(null);
        setBatchMaterials([]);
        setMaterialConsumption({});
      } else {
        const error = await response.json();
        alert(`Step confirmation failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Error submitting step action:', error);
      alert('Failed to confirm step. Please try again.');
    }
  };

  // OPERATOR AUTHENTICATION HANDLERS
  const handleOperatorLogin = useCallback(
    (operator: Operator) => {
      setCurrentOperator(operator);
      console.log(
        `Operator ${operator.operatorName} logged in at workstation ${selectedWorkstation}`
      );
    },
    [selectedWorkstation]
  );

  const handleOperatorLogout = useCallback(() => {
    setCurrentOperator(null);
    console.log('Operator logged out');
  }, []);

  // Update operator workstation when workstation selection changes
  useEffect(() => {
    if (
      currentOperator &&
      selectedWorkstation &&
      currentOperator.currentWorkstationId !== selectedWorkstation
    ) {
      // Operator needs to log into the new workstation
      setCurrentOperator(null);
    }
  }, [currentOperator, selectedWorkstation]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'IN_PROGRESS':
        return 'blue';
      case 'PENDING':
        return 'yellow';
      case 'FLAGGED':
        return 'red';
      case 'COMPLETED':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'RUSH':
        return 'red';
      case 'STANDARD':
        return 'blue';
      case 'HOLD':
        return 'gray';
      default:
        return 'blue';
    }
  };

  const getPartTypeColor = (partType: string) => {
    switch (partType) {
      case 'FINISHED_GOOD':
        return 'green';
      case 'SEMI_FINISHED':
        return 'orange';
      case 'RAW_MATERIAL':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getPartTypeLabel = (partType: string) => {
    switch (partType) {
      case 'FINISHED_GOOD':
        return 'FG';
      case 'SEMI_FINISHED':
        return 'SF';
      case 'RAW_MATERIAL':
        return 'RM';
      default:
        return partType;
    }
  };

  if (!isPageReady || loading) {
    return (
      <LoadingScreen
        title='Loading Workstations'
        description='Initializing workstation management...'
        icon='🏭'
        pageInitialization={pageInitialization}
      />
    );
  }

  return (
    <StandardPage
      title='Workstation Management'
      subtitle='Complete manufacturing job queue control and routing step management'
      icon='🏭'
      accentColor={theme.pageAccents.workstations}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Workstation Management */}
        <Card
          style={{
            background: theme.colors.cardPrimary,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.colors.borderPrimary,
            marginBottom: 32,
            borderRadius: theme.borderRadius.lg,
            backdropFilter: 'blur(16px)',
            boxShadow: theme.shadows.md,
          }}
        >
          <Group justify='space-between' align='center' mb='md'>
            <Title order={3} style={{ color: '#f1f5f9' }}>
              ⚙️ Manage Workstations
            </Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddWorkstationCb}
              color='green'
              variant='filled'
            >
              Add Workstation
            </Button>
          </Group>

          <Grid>
            {workstations.map(workstation => (
              <Grid.Col span={4} key={workstation.id}>
                <WorkstationCard
                  workstation={workstation}
                  onEdit={handleEditWorkstationCb}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Card>

        {/* Workstation Selection */}
        <Card
          style={{
            background: theme.colors.cardPrimary,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.colors.borderPrimary,
            marginBottom: 32,
            borderRadius: theme.borderRadius.lg,
            backdropFilter: 'blur(16px)',
            boxShadow: theme.shadows.md,
          }}
        >
          <Title
            order={3}
            style={{ color: theme.colors.textPrimary, marginBottom: 16 }}
          >
            🏭 Workstation Control
          </Title>
          <Grid>
            <Grid.Col span={8}>
              <Select
                label='Select Workstation to Manage'
                placeholder={
                  workstationOptions.length === 0
                    ? 'No workstations available'
                    : 'Choose a workstation'
                }
                value={selectedWorkstation}
                onChange={handleWorkstationSelect}
                data={workstationOptions}
                searchable
                comboboxProps={DEFAULT_COMBOBOX_PROPS}
                maxDropdownHeight={300}
                size='lg'
                styles={{
                  label: {
                    color: '#f1f5f9',
                    fontSize: '16px',
                    fontWeight: 600,
                  },
                  input: {
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(71, 85, 105, 0.5)',
                    color: '#f1f5f9',
                    fontSize: '16px',
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <div style={{ paddingTop: 30 }}>
                <Button
                  leftSection={<IconRefresh size={16} />}
                  onClick={() => window.location.reload()}
                  variant='light'
                  color='blue'
                  size='lg'
                  fullWidth
                >
                  Refresh All Data
                </Button>
              </div>
            </Grid.Col>
          </Grid>
        </Card>

        {/* OPERATOR AUTHENTICATION - REQUIRED FOR STEP ACTIONS */}
        {selectedWorkstation && (
          <OperatorAuth
            workstationId={selectedWorkstation}
            onOperatorLogin={handleOperatorLogin}
            onOperatorLogout={handleOperatorLogout}
            currentOperator={currentOperator}
          />
        )}

        {/* Authentication Warning */}
        {selectedWorkstation && !currentOperator && (
          <Alert
            color='orange'
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: 32,
            }}
          >
            <Text style={{ color: '#f59e0b' }}>
              ⚠️ <strong>Operator Authentication Required:</strong> You must log
              in before performing any manufacturing step actions. This ensures
              proper accountability and quality control for all production
              activities.
            </Text>
          </Alert>
        )}

        {/* BOM Integration Info */}
        {selectedWorkstation && (
          <Card
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(16, 185, 129, 0.3)',
              marginBottom: 32,
            }}
          >
            <Title order={4} style={{ color: '#10b981', marginBottom: 12 }}>
              🧬 BOM-Aware Manufacturing Process
            </Title>
            <Text style={{ color: '#059669', marginBottom: 8 }}>
              <strong>Material Hierarchy:</strong> Orders → Batches → BOM
              Structure → Material Requirements → Workstation Steps
            </Text>
            <Text size='sm' style={{ color: '#047857' }}>
              • Finished Goods (FG-) contain Semi-Finished + Raw Materials
              according to BOM hierarchy
              <br />
              • Semi-Finished parts (SF-) use Raw Materials as defined in their
              BOM structure
              <br />
              • Each routing step shows required materials and tracks
              consumption
              <br />
              • Material requirements are calculated from BOM structure and
              scaled by batch quantity
              <br />• All material consumption is tracked and linked back to
              source parts and costs
            </Text>
            <Group gap='sm' mt='md'>
              <Button
                component='a'
                href='/batches'
                variant='light'
                color='green'
                size='sm'
              >
                View All Batches
              </Button>
              <Button
                component='a'
                href='/orders'
                variant='light'
                color='blue'
                size='sm'
              >
                View Orders
              </Button>
              <Button
                component='a'
                href='/parts-demo'
                variant='light'
                color='purple'
                size='sm'
              >
                View BOM Structure
              </Button>
            </Group>
          </Card>
        )}

        {/* Material Requirements Overview */}
        {selectedWorkstation && routingSteps.length > 0 && (
          <Card
            style={{
              background: 'rgba(30, 41, 59, 0.85)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(51, 65, 85, 0.7)',
              marginBottom: 24,
            }}
          >
            <Group justify='space-between' align='center' mb='md'>
              <Title order={3} style={{ color: '#f1f5f9' }}>
                🔧 Active Material Requirements
              </Title>
              <Text size='sm' style={{ color: '#94a3b8' }}>
                {routingSteps.length} active step
                {routingSteps.length !== 1 ? 's' : ''}
              </Text>
            </Group>

            <Text size='sm' style={{ color: '#cbd5e1', marginBottom: 16 }}>
              Material requirements for current manufacturing steps. Monitor BOM
              component consumption in real-time.
            </Text>

            <Group gap='sm'>
              {routingSteps.slice(0, 3).map(step => (
                <Badge key={step.id} variant='light' color='blue' size='sm'>
                  {step.batch.lineItem?.part?.partNumber || 'N/A'}
                </Badge>
              ))}
              {routingSteps.length > 3 && (
                <Badge variant='outline' color='gray' size='sm'>
                  +{routingSteps.length - 3} more
                </Badge>
              )}
            </Group>
          </Card>
        )}

        {/* Individual Part Tracking */}
        {selectedWorkstation && (
          <WorkOrderTracking
            batchId={routingSteps[0]?.batch?.id || ''}
            workstationId={selectedWorkstation}
          />
        )}

        {/* Job Queue */}
        {selectedWorkstation ? (
          <div>
            <Title order={2} style={{ color: '#f1f5f9', marginBottom: 20 }}>
              📋 Job Queue -{' '}
              {workstations.find(w => w.id === selectedWorkstation)?.name}
            </Title>

            {routingSteps.length === 0 ? (
              <Alert
                color='blue'
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                <Text style={{ color: '#93c5fd' }}>
                  No routing steps currently queued for this workstation.
                </Text>
              </Alert>
            ) : (
              <div style={{ display: 'grid', gap: 16 }}>
                {routingSteps.map(step => (
                  <Card
                    key={step.id}
                    style={{
                      background: 'rgba(30, 41, 59, 0.85)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'rgba(51, 65, 85, 0.7)',
                    }}
                  >
                    <Grid align='center'>
                      <Grid.Col span={8}>
                        <Group justify='space-between' align='flex-start'>
                          <div>
                            <Group gap='sm' mb='xs'>
                              <Text fw={600} style={{ color: '#f1f5f9' }}>
                                Step {step.stepNumber}: {step.description}
                              </Text>
                              <Badge
                                color={getStatusColor(step.status)}
                                variant='filled'
                              >
                                {step.status}
                              </Badge>
                              <Badge
                                color={getPriorityColor(step.batch.priority)}
                                variant='outline'
                              >
                                {step.batch.priority}
                              </Badge>
                              <Badge
                                color={getPartTypeColor(
                                  step.batch.lineItem?.part?.partType
                                )}
                                variant='light'
                              >
                                {getPartTypeLabel(
                                  step.batch.lineItem?.part?.partType
                                )}
                              </Badge>
                            </Group>
                            <Text size='sm' style={{ color: '#cbd5e1' }}>
                              Batch: {step.batch.batchId} • Part:{' '}
                              {step.batch.lineItem?.part?.partNumber || 'N/A'} (
                              {step.batch.lineItem?.part?.partName || 'N/A'})
                            </Text>
                            <Text size='sm' style={{ color: '#94a3b8' }}>
                              Customer:{' '}
                              {step.batch.lineItem?.purchaseOrder?.customer
                                ?.name || 'N/A'}{' '}
                              • Est. Time: {step.estimatedTime}min
                            </Text>
                            {step.materialRequirements &&
                              step.materialRequirements.length > 0 && (
                                <div style={{ marginTop: 8 }}>
                                  <Text
                                    size='xs'
                                    fw={500}
                                    style={{
                                      color: '#a855f7',
                                      marginBottom: 4,
                                    }}
                                  >
                                    🧬 Material Requirements:
                                  </Text>
                                  <Text
                                    size='xs'
                                    style={{
                                      color: '#c084fc',
                                      fontFamily: 'monospace',
                                    }}
                                  >
                                    {step.materialRequirements.join(' • ')}
                                  </Text>
                                </div>
                              )}
                            {step.notes && (
                              <Text
                                size='sm'
                                style={{
                                  color: '#94a3b8',
                                  fontStyle: 'italic',
                                }}
                              >
                                Notes: {step.notes}
                              </Text>
                            )}
                          </div>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Group gap='xs' justify='flex-end'>
                          {step.status === 'PENDING' && (
                            <Button
                              leftSection={<IconPlayerPlay size={16} />}
                              size='sm'
                              color='blue'
                              onClick={() =>
                                setStepActionModal({
                                  open: true,
                                  step,
                                  action: 'start',
                                })
                              }
                              disabled={!currentOperator}
                              title={
                                !currentOperator
                                  ? 'Login required to start steps'
                                  : 'Start this manufacturing step'
                              }
                            >
                              Start
                            </Button>
                          )}
                          {step.status === 'IN_PROGRESS' && (
                            <Button
                              leftSection={<IconCheck size={16} />}
                              size='sm'
                              color='green'
                              onClick={() =>
                                setStepActionModal({
                                  open: true,
                                  step,
                                  action: 'complete',
                                })
                              }
                              disabled={!currentOperator}
                              title={
                                !currentOperator
                                  ? 'Login required to complete steps'
                                  : 'Complete this manufacturing step'
                              }
                            >
                              Complete
                            </Button>
                          )}
                          <ActionIcon
                            color='red'
                            variant='light'
                            onClick={() =>
                              setStepActionModal({
                                open: true,
                                step,
                                action: 'flag',
                              })
                            }
                            disabled={!currentOperator}
                            title={
                              !currentOperator
                                ? 'Login required to flag issues'
                                : 'Flag issue with this step'
                            }
                          >
                            <IconFlag size={16} />
                          </ActionIcon>
                        </Group>
                      </Grid.Col>
                    </Grid>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Alert
            color='blue'
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <Text style={{ color: '#93c5fd' }}>
              👆 Select a workstation above to view and manage its job queue.
            </Text>
          </Alert>
        )}

        {/* Workstation Add/Edit Modal */}
        <Modal
          opened={workstationModal.open}
          onClose={() => setWorkstationModal({ open: false, mode: 'add' })}
          title={
            <Text fw={600} style={{ color: '#f1f5f9' }}>
              {workstationModal.mode === 'add'
                ? 'Add New Workstation'
                : 'Edit Workstation'}
            </Text>
          }
          styles={{
            content: {
              background: 'rgba(30, 41, 59, 0.95)',
              border: '1px solid rgba(51, 65, 85, 0.7)',
            },
            header: {
              background: 'rgba(30, 41, 59, 0.95)',
              borderBottom: '1px solid rgba(51, 65, 85, 0.7)',
            },
          }}
        >
          <Stack gap='md'>
            <TextInput
              label='Workstation Name'
              placeholder='e.g., LATHE-1, MILL-2'
              value={workstationForm.name}
              onChange={handleWorkstationNameChange}
              required
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
              placeholder='Describe the workstation capabilities...'
              value={workstationForm.description}
              onChange={handleWorkstationDescriptionChange}
              styles={{
                label: { color: '#f1f5f9' },
                input: {
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  color: '#f1f5f9',
                },
              }}
            />

            <Select
              label='Category'
              value={workstationForm.category}
              onChange={handleWorkstationCategoryChange}
              data={workstationCategoryOptions}
              styles={{
                label: { color: '#f1f5f9' },
                input: {
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  color: '#f1f5f9',
                },
              }}
            />

            <TextInput
              label='Location (Optional)'
              placeholder='e.g., Building A, Bay 3'
              value={workstationForm.location}
              onChange={handleWorkstationLocationChange}
              styles={{
                label: { color: '#f1f5f9' },
                input: {
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  color: '#f1f5f9',
                },
              }}
            />

            <Switch
              label='Active'
              checked={workstationForm.active}
              onChange={handleWorkstationActiveChange}
              styles={{
                label: { color: '#f1f5f9' },
              }}
            />

            <Group justify='flex-end' gap='sm'>
              <Button
                variant='light'
                color='gray'
                onClick={() =>
                  setWorkstationModal({ open: false, mode: 'add' })
                }
              >
                Cancel
              </Button>
              <Button color='blue' onClick={handleWorkstationSave}>
                {workstationModal.mode === 'add'
                  ? 'Add Workstation'
                  : 'Update Workstation'}
              </Button>
            </Group>
          </Stack>
        </Modal>

        {/* Step Action Modal */}
        <Modal
          opened={stepActionModal.open}
          onClose={() => setStepActionModal({ open: false })}
          title={
            <Text fw={600} style={{ color: '#f1f5f9' }}>
              {(() => {
                if (stepActionModal.action === 'start') return 'Start Step';
                if (stepActionModal.action === 'complete')
                  return 'Complete Step';
                return 'Flag Issue';
              })()}
            </Text>
          }
          styles={{
            content: {
              background: 'rgba(30, 41, 59, 0.95)',
              border: '1px solid rgba(51, 65, 85, 0.7)',
            },
            header: {
              background: 'rgba(30, 41, 59, 0.95)',
              borderBottom: '1px solid rgba(51, 65, 85, 0.7)',
            },
          }}
        >
          <Stack gap='md'>
            {stepActionModal.step && (
              <div>
                <Text size='sm' style={{ color: '#cbd5e1' }}>
                  Step: {stepActionModal.step.description}
                </Text>
                <Text size='sm' style={{ color: '#94a3b8' }}>
                  Batch: {stepActionModal.step.batch.batchId}
                </Text>
                <Text size='sm' style={{ color: '#94a3b8' }}>
                  Part:{' '}
                  {stepActionModal.step.batch.lineItem?.part?.partNumber ||
                    'N/A'}{' '}
                  -{' '}
                  {stepActionModal.step.batch.lineItem?.part?.partName || 'N/A'}
                </Text>
              </div>
            )}

            {/* AUTHENTICATED OPERATOR INFORMATION */}
            {currentOperator && (
              <Card
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <Group gap='sm' align='center'>
                  <IconUser size={16} style={{ color: '#10b981' }} />
                  <div>
                    <Text size='sm' fw={500} style={{ color: '#10b981' }}>
                      Authenticated Operator
                    </Text>
                    <Text size='xs' style={{ color: '#059669' }}>
                      {currentOperator.operatorName} (
                      {currentOperator.operatorId})
                    </Text>
                    <Text size='xs' style={{ color: '#047857' }}>
                      {currentOperator.shift} Shift •{' '}
                      {currentOperator.certifications.length} certifications
                    </Text>
                  </div>
                </Group>
              </Card>
            )}

            {/* Material Requirements for Complete Action */}
            {stepActionModal.action === 'complete' &&
              batchMaterials.length > 0 && (
                <Card
                  style={{
                    background: 'rgba(51, 65, 85, 0.3)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(71, 85, 105, 0.5)',
                  }}
                >
                  <Title
                    order={4}
                    style={{ color: '#f1f5f9', marginBottom: 12 }}
                  >
                    🔧 Material Consumption
                  </Title>
                  <Text
                    size='sm'
                    style={{ color: '#cbd5e1', marginBottom: 16 }}
                  >
                    Record actual material consumption for this manufacturing
                    step:
                  </Text>

                  <Stack gap='md'>
                    {batchMaterials.map((material: any) => (
                      <Group
                        key={material.partId}
                        justify='space-between'
                        align='center'
                      >
                        <div style={{ flex: 1 }}>
                          <Text fw={500} size='sm' style={{ color: '#f1f5f9' }}>
                            {material.part?.partNumber} -{' '}
                            {material.part?.partName}
                          </Text>
                          <Text size='xs' style={{ color: '#94a3b8' }}>
                            Required: {material.requiredQuantity}{' '}
                            {material.part?.unitOfMeasure || 'units'} •
                            Available: {material.availableQuantity || 0} •
                            Variance: {material.variance || 0}
                          </Text>
                        </div>
                        <NumberInput
                          placeholder='Consumed'
                          size='sm'
                          min={0}
                          max={material.availableQuantity || 999}
                          value={materialConsumption[material.partId] || 0}
                          onChange={(value: string | number) =>
                            setMaterialConsumption(prev => ({
                              ...prev,
                              [material.partId]: Number(value) || 0,
                            }))
                          }
                          styles={{
                            input: {
                              background: 'rgba(51, 65, 85, 0.5)',
                              border: '1px solid rgba(71, 85, 105, 0.5)',
                              color: '#f1f5f9',
                              width: '120px',
                            },
                          }}
                        />
                      </Group>
                    ))}
                  </Stack>
                </Card>
              )}

            <Textarea
              label='Notes (Optional)'
              placeholder='Add any notes about this step...'
              value={actionNotes}
              onChange={event => setActionNotes(event.target.value)}
              styles={{
                label: { color: '#f1f5f9' },
                input: {
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  color: '#f1f5f9',
                },
              }}
            />

            <FileInput
              label='Photo Upload (Optional)'
              placeholder='Upload a photo...'
              accept='image/*'
              leftSection={<IconCamera size={16} />}
              value={uploadedFile}
              onChange={setUploadedFile}
              styles={{
                label: { color: '#f1f5f9' },
                input: {
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  color: '#f1f5f9',
                },
              }}
            />

            <Group justify='flex-end' gap='sm'>
              <Button
                variant='light'
                color='gray'
                onClick={() => setStepActionModal({ open: false })}
              >
                Cancel
              </Button>
              <Button
                color={stepActionModal.action === 'flag' ? 'red' : 'blue'}
                onClick={() => handleStepAction(stepActionModal.action!)}
                disabled={!currentOperator}
                title={
                  !currentOperator
                    ? 'Operator authentication required'
                    : undefined
                }
              >
                {(() => {
                  if (stepActionModal.action === 'start') return 'Start Step';
                  if (stepActionModal.action === 'complete')
                    return 'Complete Step';
                  return 'Flag Issue';
                })()}
              </Button>
            </Group>
          </Stack>
        </Modal>
      </div>
    </StandardPage>
  );
}
