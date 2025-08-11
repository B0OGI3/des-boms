/**
 * Quality Control Page - DES-BOMS QC Management
 * 
 * This page implements the Quality Control requirements from the 
 * DES-BOMS specification document:
 * 
 * 5. Inspection & Quality Control
 * 5.1 QC Records (Per Batch)
 * - Inspector identification
 * - Inspection date
 * - Pass / Fail / Rework Required results
 * - Dimensional or visual inspection notes
 * 
 * Features:
 * - QC record creation and management
 * - Batch inspection workflows
 * - Pass/Fail/Rework tracking
 * - Inspector dashboard
 * - Quality metrics and reporting
 */

"use client";

import { 
  Title, 
  Text, 
  Card, 
  Badge, 
  Group, 
  Stack, 
  Loader, 
  Alert, 
  Button,
  Grid,
  Modal,
  TextInput,
  Textarea,
  Radio,
  ScrollArea
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconPlus, IconEye, IconSearch, IconFileText } from "@tabler/icons-react";

interface QCRecord {
  id: string;
  inspectionDate: string;
  inspector: string;
  result: 'PASS' | 'FAIL' | 'REWORK_REQUIRED';
  notes?: string;
  batch: {
    id: string;
    batchId: string;
    priority: 'RUSH' | 'STANDARD' | 'HOLD';
    status: string;
    quantity: number;
    lineItem: {
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
}

interface Batch {
  id: string;
  batchId: string;
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  status: string;
  quantity: number;
  lineItem: {
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
  qcRecords: QCRecord[];
}

export default function QCPage() {
  const [qcRecords, setQCRecords] = useState<QCRecord[]>([]);
  const [batchesForInspection, setBatchesForInspection] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [inspectorName, setInspectorName] = useState('');
  const [newQCModal, setNewQCModal] = useState({
    open: false,
    batch: null as Batch | null
  });
  const [qcForm, setQCForm] = useState({
    result: 'PASS' as 'PASS' | 'FAIL' | 'REWORK_REQUIRED',
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch QC records and batches
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch existing QC records
        const qcResponse = await fetch('/api/qc');
        if (qcResponse.ok) {
          const qcResult = await qcResponse.json();
          setQCRecords(qcResult.data || []);
        }

        // Fetch batches that need inspection (completed batches without QC records)
        const batchesResponse = await fetch('/api/batches?status=COMPLETED&needsQC=true');
        if (batchesResponse.ok) {
          const batchesResult = await batchesResponse.json();
          setBatchesForInspection(batchesResult.data || []);
        }
      } catch (error) {
        console.error('Error fetching QC data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateQCRecord = async () => {
    if (!newQCModal.batch || !inspectorName) return;

    try {
      const response = await fetch('/api/qc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: newQCModal.batch.id,
          inspector: inspectorName,
          result: qcForm.result,
          notes: qcForm.notes,
          inspectionDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Refresh data
        const qcResponse = await fetch('/api/qc');
        if (qcResponse.ok) {
          const qcResult = await qcResponse.json();
          setQCRecords(qcResult.data || []);
        }

        const batchesResponse = await fetch('/api/batches?status=COMPLETED&needsQC=true');
        if (batchesResponse.ok) {
          const batchesResult = await batchesResponse.json();
          setBatchesForInspection(batchesResult.data || []);
        }
        
        // Close modal and reset
        setNewQCModal({ open: false, batch: null });
        setQCForm({ result: 'PASS', notes: '' });
      }
    } catch (error) {
      console.error('Error creating QC record:', error);
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'PASS': return 'green';
      case 'FAIL': return 'red';
      case 'REWORK_REQUIRED': return 'orange';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'RUSH': return 'red';
      case 'STANDARD': return 'blue';
      case 'HOLD': return 'gray';
      default: return 'blue';
    }
  };

  const filteredRecords = qcRecords.filter(record => 
    !searchTerm || 
    record.batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.batch.lineItem.part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.batch.lineItem.part.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.inspector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ 
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Loader size="xl" color="#3b82f6" />
      </div>
    );
  }

  return (
    <main style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      minHeight: "100vh",
      padding: "20px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title order={1} style={{ color: "#f1f5f9", marginBottom: 12 }}>
            🔍 Quality Control
          </Title>
          <Text size="lg" style={{ color: "#cbd5e1" }}>
            Inspection records and quality control management
          </Text>
        </div>

        {/* Inspector Setup */}
        <Card withBorder style={{ 
          background: "rgba(30, 41, 59, 0.85)",
          border: "1px solid rgba(51, 65, 85, 0.7)",
          marginBottom: 32
        }}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Inspector Name"
                placeholder="Enter your name"
                value={inspectorName}
                onChange={(event) => setInspectorName(event.currentTarget.value)}
                styles={{
                  label: { color: "#f1f5f9" },
                  input: { 
                    background: "rgba(51, 65, 85, 0.5)",
                    border: "1px solid rgba(71, 85, 105, 0.5)",
                    color: "#f1f5f9"
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Search QC Records"
                placeholder="Search by batch, part, or inspector..."
                leftSection={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                styles={{
                  label: { color: "#f1f5f9" },
                  input: { 
                    background: "rgba(51, 65, 85, 0.5)",
                    border: "1px solid rgba(71, 85, 105, 0.5)",
                    color: "#f1f5f9"
                  }
                }}
              />
            </Grid.Col>
          </Grid>
        </Card>

        <Grid>
          {/* Batches Needing Inspection */}
          <Grid.Col span={6}>
            <Card withBorder style={{ 
              background: "rgba(30, 41, 59, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
              height: "fit-content"
            }}>
              <Group justify="space-between" mb="md">
                <Title order={3} style={{ color: "#f1f5f9" }}>
                  📦 Batches Awaiting Inspection
                </Title>
                <Badge color="blue" variant="light">
                  {batchesForInspection.length} pending
                </Badge>
              </Group>
              
              {batchesForInspection.length === 0 ? (
                <Alert color="green" style={{ 
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)"
                }}>
                  <Text style={{ color: "#6ee7b7" }}>
                    All completed batches have been inspected!
                  </Text>
                </Alert>
              ) : (
                <Stack gap="sm" style={{ maxHeight: 400, overflowY: "auto" }}>
                  {batchesForInspection.map((batch) => (
                    <Card
                      key={batch.id}
                      withBorder
                      style={{
                        background: "rgba(51, 65, 85, 0.5)",
                        border: "1px solid rgba(71, 85, 105, 0.3)",
                      }}
                    >
                      <Group justify="space-between" align="flex-start">
                        <div style={{ flex: 1 }}>
                          <Group gap="xs" mb="xs">
                            <Text fw={600} size="sm" style={{ color: "#f1f5f9" }}>
                              {batch.batchId}
                            </Text>
                            <Badge color={getPriorityColor(batch.priority)} size="xs">
                              {batch.priority}
                            </Badge>
                          </Group>
                          <Text size="xs" style={{ color: "#cbd5e1" }}>
                            {batch.lineItem.part.partNumber} - {batch.lineItem.part.partName}
                          </Text>
                          <Text size="xs" style={{ color: "#94a3b8" }}>
                            Customer: {batch.lineItem.purchaseOrder.customer.name}
                          </Text>
                          <Text size="xs" style={{ color: "#94a3b8" }}>
                            Quantity: {batch.quantity}
                          </Text>
                        </div>
                        <Button
                          size="xs"
                          leftSection={<IconPlus size={14} />}
                          onClick={() => setNewQCModal({ open: true, batch })}
                          disabled={!inspectorName}
                        >
                          Inspect
                        </Button>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              )}
            </Card>
          </Grid.Col>

          {/* QC Records History */}
          <Grid.Col span={6}>
            <Card withBorder style={{ 
              background: "rgba(30, 41, 59, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
            }}>
              <Group justify="space-between" mb="md">
                <Title order={3} style={{ color: "#f1f5f9" }}>
                  📋 Recent QC Records
                </Title>
                <Badge color="gray" variant="light">
                  {filteredRecords.length} records
                </Badge>
              </Group>
              
              <ScrollArea style={{ height: 400 }}>
                {filteredRecords.length === 0 ? (
                  <Alert color="blue" style={{ 
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.3)"
                  }}>
                    <Text style={{ color: "#93c5fd" }}>
                      No QC records found matching your search.
                    </Text>
                  </Alert>
                ) : (
                  <Stack gap="sm">
                    {filteredRecords.map((record) => (
                      <Card
                        key={record.id}
                        withBorder
                        style={{
                          background: "rgba(51, 65, 85, 0.5)",
                          border: "1px solid rgba(71, 85, 105, 0.3)",
                        }}
                      >
                        <Group justify="space-between" align="flex-start">
                          <div style={{ flex: 1 }}>
                            <Group gap="xs" mb="xs">
                              <Text fw={600} size="sm" style={{ color: "#f1f5f9" }}>
                                {record.batch.batchId}
                              </Text>
                              <Badge color={getResultColor(record.result)} size="xs">
                                {record.result.replace('_', ' ')}
                              </Badge>
                            </Group>
                            <Text size="xs" style={{ color: "#cbd5e1" }}>
                              {record.batch.lineItem.part.partNumber} - {record.batch.lineItem.part.partName}
                            </Text>
                            <Text size="xs" style={{ color: "#94a3b8" }}>
                              Inspector: {record.inspector} • {new Date(record.inspectionDate).toLocaleDateString()}
                            </Text>
                            {record.notes && (
                              <Text size="xs" style={{ color: "#94a3b8", fontStyle: "italic" }}>
                                Notes: {record.notes}
                              </Text>
                            )}
                          </div>
                          <Button
                            size="xs"
                            variant="light"
                            leftSection={<IconEye size={14} />}
                          >
                            View
                          </Button>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                )}
              </ScrollArea>
            </Card>
          </Grid.Col>
        </Grid>

        {/* QC Statistics */}
        <div style={{ marginTop: 32 }}>
          <Title order={3} style={{ color: "#f1f5f9", marginBottom: 16, textAlign: "center" }}>
            📊 Quality Metrics
          </Title>
          <Grid>
            {[
              {
                title: "Pass Rate",
                value: `${Math.round((qcRecords.filter(r => r.result === 'PASS').length / Math.max(qcRecords.length, 1)) * 100)}%`,
                color: "green",
                icon: "✅"
              },
              {
                title: "Rework Required",
                value: qcRecords.filter(r => r.result === 'REWORK_REQUIRED').length,
                color: "orange",
                icon: "🔄"
              },
              {
                title: "Failed Parts",
                value: qcRecords.filter(r => r.result === 'FAIL').length,
                color: "red",
                icon: "❌"
              },
              {
                title: "Total Inspections",
                value: qcRecords.length,
                color: "blue",
                icon: "🔍"
              }
            ].map((metric) => (
              <Grid.Col key={metric.title} span={3}>
                <Card
                  withBorder
                  style={{
                    background: "rgba(30, 41, 59, 0.85)",
                    border: "1px solid rgba(51, 65, 85, 0.7)",
                    textAlign: "center"
                  }}
                >
                  <Text size="xl" style={{ marginBottom: 8, fontSize: "2rem" }}>
                    {metric.icon}
                  </Text>
                  <Text size="xl" fw={700} style={{ color: "#f1f5f9", marginBottom: 4 }}>
                    {metric.value}
                  </Text>
                  <Text size="sm" style={{ color: "#cbd5e1" }}>
                    {metric.title}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        {/* New QC Record Modal */}
        <Modal
          opened={newQCModal.open}
          onClose={() => setNewQCModal({ open: false, batch: null })}
          title={
            <Text fw={600} style={{ color: "#f1f5f9" }}>
              🔍 Create QC Record
            </Text>
          }
          size="md"
          styles={{
            content: { 
              background: "rgba(30, 41, 59, 0.95)",
              border: "1px solid rgba(51, 65, 85, 0.7)"
            },
            header: { 
              background: "rgba(30, 41, 59, 0.95)",
              borderBottom: "1px solid rgba(51, 65, 85, 0.7)"
            }
          }}
        >
          <Stack gap="md">
            {newQCModal.batch && (
              <Card withBorder style={{ 
                background: "rgba(51, 65, 85, 0.3)",
                border: "1px solid rgba(71, 85, 105, 0.5)"
              }}>
                <Text size="sm" style={{ color: "#cbd5e1" }}>
                  <strong>Batch:</strong> {newQCModal.batch.batchId}
                </Text>
                <Text size="sm" style={{ color: "#cbd5e1" }}>
                  <strong>Part:</strong> {newQCModal.batch.lineItem.part.partNumber} - {newQCModal.batch.lineItem.part.partName}
                </Text>
                <Text size="sm" style={{ color: "#cbd5e1" }}>
                  <strong>Quantity:</strong> {newQCModal.batch.quantity}
                </Text>
                <Text size="sm" style={{ color: "#cbd5e1" }}>
                  <strong>Customer:</strong> {newQCModal.batch.lineItem.purchaseOrder.customer.name}
                </Text>
              </Card>
            )}
            
            <div>
              <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
                Inspection Result
              </Text>
              <Radio.Group
                value={qcForm.result}
                onChange={(value) => setQCForm({ ...qcForm, result: value as any })}
              >
                <Stack gap="xs">
                  <Radio value="PASS" label="Pass" color="green" />
                  <Radio value="REWORK_REQUIRED" label="Rework Required" color="orange" />
                  <Radio value="FAIL" label="Fail" color="red" />
                </Stack>
              </Radio.Group>
            </div>

            <Textarea
              label="Inspection Notes"
              placeholder="Enter dimensional checks, visual inspection notes, or other observations..."
              value={qcForm.notes}
              onChange={(event) => setQCForm({ ...qcForm, notes: event.currentTarget.value })}
              rows={4}
              styles={{
                label: { color: "#f1f5f9" },
                input: { 
                  background: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgba(71, 85, 105, 0.5)",
                  color: "#f1f5f9"
                }
              }}
            />

            <Group justify="flex-end" gap="sm">
              <Button
                variant="light"
                color="gray"
                onClick={() => setNewQCModal({ open: false, batch: null })}
              >
                Cancel
              </Button>
              <Button
                color="blue"
                leftSection={<IconFileText size={16} />}
                onClick={handleCreateQCRecord}
              >
                Create QC Record
              </Button>
            </Group>
          </Stack>
        </Modal>

      </div>
    </main>
  );
}
