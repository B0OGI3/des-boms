/**
 * Operator Authentication Component
 * Handles operator login, session management, and sign-off requirements
 */

'use client';

import {
  Modal,
  TextInput,
  Button,
  Stack,
  Text,
  Group,
  Badge,
  Card,
  ActionIcon,
  Select,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  IconLogin,
  IconLogout,
  IconUser,
  IconClock,
} from '@tabler/icons-react';

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

interface OperatorAuthProps {
  readonly workstationId: string;
  readonly onOperatorLogin: (operator: Operator) => void;
  readonly onOperatorLogout: () => void;
  readonly currentOperator?: Operator | null;
}

// Module-level readonly options to avoid recreating arrays each render
const SHIFT_OPTIONS = [
  { value: 'DAY', label: 'Day Shift (6AM-2PM)' },
  { value: 'SWING', label: 'Swing Shift (2PM-10PM)' },
  { value: 'NIGHT', label: 'Night Shift (10PM-6AM)' },
  { value: 'FLEXIBLE', label: 'Flexible Hours' },
] as const;

export function OperatorAuth(props: Readonly<OperatorAuthProps>) {
  const { workstationId, onOperatorLogin, onOperatorLogout, currentOperator } =
    props;
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    operatorId: '',
    operatorName: '',
    certifications: [] as string[],
    shift: 'DAY' as 'DAY' | 'SWING' | 'NIGHT' | 'FLEXIBLE',
    email: '',
    phone: '',
  });

  // Fetch available operators
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await fetch('/api/operators?active=true');
        if (response.ok) {
          const result = await response.json();
          setOperators(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching operators:', error);
      }
    };

    fetchOperators();
  }, []);

  // Handle operator login
  const handleLogin = async () => {
    if (!loginForm.operatorId || !loginForm.operatorName) {
      alert('Please enter both Operator ID and Name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/operators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...loginForm,
          workstationId,
          action: 'login',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        onOperatorLogin(result.data.operator);
        setLoginModalOpen(false);
        setLoginForm({
          operatorId: '',
          operatorName: '',
          certifications: [],
          shift: 'DAY',
          email: '',
          phone: '',
        });
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle operator logout
  const handleLogout = async () => {
    if (!currentOperator) return;

    setLoading(true);
    try {
      const response = await fetch('/api/operators', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operatorId: currentOperator.operatorId,
          action: 'logout',
          notes: 'Manual logout from workstation',
        }),
      });

      if (response.ok) {
        onOperatorLogout();
        setLogoutModalOpen(false);
      } else {
        const error = await response.json();
        alert(`Logout failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle quick login from existing operators
  const handleQuickLogin = async (operator: Operator) => {
    setLoading(true);
    try {
      const response = await fetch('/api/operators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operatorId: operator.operatorId,
          operatorName: operator.operatorName,
          certifications: operator.certifications,
          shift: operator.shift,
          workstationId,
          action: 'login',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        onOperatorLogin(result.data.operator);
        setLoginModalOpen(false);
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Quick login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Operator Status Card */}
      <Card
        style={{
          background: 'rgba(30, 41, 59, 0.85)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(51, 65, 85, 0.7)',
          marginBottom: 16,
        }}
      >
        <Group justify='space-between' align='center'>
          <div>
            <Group gap='sm' align='center'>
              <IconUser size={20} style={{ color: '#f1f5f9' }} />
              <Text fw={600} style={{ color: '#f1f5f9' }}>
                Operator Status
              </Text>
              {currentOperator ? (
                <Badge color='green' variant='filled'>
                  Logged In
                </Badge>
              ) : (
                <Badge color='red' variant='filled'>
                  Not Logged In
                </Badge>
              )}
            </Group>

            {currentOperator && (
              <div style={{ marginTop: 8 }}>
                <Text size='sm' style={{ color: '#cbd5e1' }}>
                  {currentOperator.operatorName} ({currentOperator.operatorId})
                </Text>
                <Group gap='xs' mt='xs'>
                  <Badge size='sm' variant='light' color='blue'>
                    {currentOperator.shift} Shift
                  </Badge>
                  {currentOperator.certifications.slice(0, 3).map(cert => (
                    <Badge key={cert} size='sm' variant='outline' color='green'>
                      {cert}
                    </Badge>
                  ))}
                  {currentOperator.certifications.length > 3 && (
                    <Badge size='sm' variant='outline' color='gray'>
                      +{currentOperator.certifications.length - 3}
                    </Badge>
                  )}
                </Group>
                {currentOperator.loginTime && (
                  <Text size='xs' style={{ color: '#94a3b8', marginTop: 4 }}>
                    <IconClock size={12} style={{ marginRight: 4 }} />
                    Logged in:{' '}
                    {new Date(currentOperator.loginTime).toLocaleString()}
                  </Text>
                )}
              </div>
            )}
          </div>

          <Group gap='sm'>
            {!currentOperator ? (
              <Button
                leftSection={<IconLogin size={16} />}
                onClick={() => setLoginModalOpen(true)}
                color='green'
                variant='filled'
              >
                Login
              </Button>
            ) : (
              <Button
                leftSection={<IconLogout size={16} />}
                onClick={() => setLogoutModalOpen(true)}
                color='red'
                variant='light'
              >
                Logout
              </Button>
            )}
          </Group>
        </Group>
      </Card>

      {/* Login Modal */}
      <Modal
        opened={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title={
          <Text fw={600} style={{ color: '#f1f5f9' }}>
            Operator Login
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
          {/* Quick Login for Existing Operators */}
          {operators.length > 0 && (
            <div>
              <Text
                size='sm'
                fw={500}
                style={{ color: '#f1f5f9', marginBottom: 8 }}
              >
                Quick Login - Select Existing Operator:
              </Text>
              <div
                style={{
                  display: 'grid',
                  gap: 8,
                  maxHeight: 200,
                  overflowY: 'auto',
                }}
              >
                {operators.map(operator => (
                  <Card
                    key={operator.id}
                    style={{
                      background: 'rgba(51, 65, 85, 0.3)',
                      border: '1px solid rgba(71, 85, 105, 0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleQuickLogin(operator)}
                  >
                    <Group justify='space-between' align='center'>
                      <div>
                        <Text size='sm' fw={500} style={{ color: '#f1f5f9' }}>
                          {operator.operatorName} ({operator.operatorId})
                        </Text>
                        <Text size='xs' style={{ color: '#94a3b8' }}>
                          {operator.shift} Shift •{' '}
                          {operator.certifications.length} certifications
                        </Text>
                      </div>
                      <ActionIcon
                        color='green'
                        variant='light'
                        loading={loading}
                        onClick={e => {
                          e.stopPropagation();
                          handleQuickLogin(operator);
                        }}
                      >
                        <IconLogin size={16} />
                      </ActionIcon>
                    </Group>
                  </Card>
                ))}
              </div>
              <Text
                size='xs'
                style={{ color: '#94a3b8', marginTop: 8, textAlign: 'center' }}
              >
                Or create new operator login below:
              </Text>
            </div>
          )}

          {/* New Operator Login Form */}
          <TextInput
            label='Operator ID'
            placeholder='e.g., OP001, JOHN_DOE'
            value={loginForm.operatorId}
            onChange={e =>
              setLoginForm(prev => ({ ...prev, operatorId: e.target.value }))
            }
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

          <TextInput
            label='Operator Name'
            placeholder='Full name'
            value={loginForm.operatorName}
            onChange={e =>
              setLoginForm(prev => ({ ...prev, operatorName: e.target.value }))
            }
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

          <Select
            label='Shift'
            value={loginForm.shift}
            onChange={value =>
              setLoginForm(prev => ({ ...prev, shift: value as any }))
            }
            data={SHIFT_OPTIONS}
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
            label='Email (Optional)'
            placeholder='operator@company.com'
            value={loginForm.email}
            onChange={e =>
              setLoginForm(prev => ({ ...prev, email: e.target.value }))
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

          <TextInput
            label='Phone (Optional)'
            placeholder='(555) 123-4567'
            value={loginForm.phone}
            onChange={e =>
              setLoginForm(prev => ({ ...prev, phone: e.target.value }))
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

          <Group justify='flex-end' gap='sm'>
            <Button
              variant='light'
              color='gray'
              onClick={() => setLoginModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color='green'
              onClick={handleLogin}
              loading={loading}
              disabled={!loginForm.operatorId || !loginForm.operatorName}
            >
              Login
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        opened={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title={
          <Text fw={600} style={{ color: '#f1f5f9' }}>
            Confirm Logout
          </Text>
        }
        styles={{
          content: {
            background: 'rgba(30, 41, 59, 0.95)',
            border: '1px solid rgba(51, 65, 85, 0.7)',
          },
          header: {
            background: 'rgba(30, 41, 59, 0.95)',
            borderBottom: '1px solid rgba(51, 65, 105, 0.7)',
          },
        }}
      >
        <Stack gap='md'>
          <Text style={{ color: '#cbd5e1' }}>
            Are you sure you want to log out? This will end your current session
            at this workstation.
          </Text>

          {currentOperator && (
            <div>
              <Text size='sm' style={{ color: '#94a3b8' }}>
                Current session: {currentOperator.operatorName} (
                {currentOperator.operatorId})
              </Text>
              {currentOperator.loginTime && (
                <Text size='sm' style={{ color: '#94a3b8' }}>
                  Logged in since:{' '}
                  {new Date(currentOperator.loginTime).toLocaleString()}
                </Text>
              )}
            </div>
          )}

          <Group justify='flex-end' gap='sm'>
            <Button
              variant='light'
              color='gray'
              onClick={() => setLogoutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button color='red' onClick={handleLogout} loading={loading}>
              Logout
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
