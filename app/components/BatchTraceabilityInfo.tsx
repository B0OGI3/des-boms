/**
 * Batch Traceability Info Component
 * Shows detailed traceability information for QC records
 * Aligns with DES-BOMS Section 5 Quality Control requirements
 */

import { Card, Text, Badge, Group, Stack, Accordion } from '@mantine/core';

interface MaterialConsumption {
  materialPartId: string;
  materialPart: {
    partNumber: string;
    partName: string;
    partType: string;
  };
  quantityUsed: number;
  unitCost: number;
}

interface RoutingStep {
  id: string;
  stepNumber: number;
  status: string;
  workstation: {
    name: string;
  };
  description: string;
  confirmations: Array<{
    operatorName: string;
    startTime?: string;
    endTime?: string;
  }>;
}

interface BatchTraceabilityInfoProps {
  batch: {
    batchId: string;
    quantity: number;
    actualCompletion?: string;
    lineItem: {
      part: {
        partNumber: string;
        partName: string;
        partType: string;
      };
      purchaseOrder: {
        customer: {
          name: string;
        };
      };
    };
    routingSteps?: RoutingStep[];
    materialConsumption?: MaterialConsumption[];
  };
}

export function BatchTraceabilityInfo({
  batch,
}: Readonly<BatchTraceabilityInfoProps>) {
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

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'green';
      case 'IN_PROGRESS':
        return 'blue';
      case 'PENDING':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Card
      style={{
        background: 'rgba(51, 65, 85, 0.3)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(71, 85, 105, 0.5)',
      }}
    >
      <Text size='sm' fw={600} style={{ color: '#f1f5f9', marginBottom: 8 }}>
        📋 Batch Traceability Information
      </Text>

      <Group gap='xs' mb='md'>
        <Badge color='blue' size='sm'>
          {batch.batchId}
        </Badge>
        <Badge color={getPartTypeColor(batch.lineItem.part.partType)} size='sm'>
          {batch.lineItem.part.partType.replace('_', ' ')}
        </Badge>
        <Text size='xs' style={{ color: '#cbd5e1' }}>
          Qty: {batch.quantity}
        </Text>
      </Group>

      <Accordion
        styles={{
          item: {
            background: 'rgba(30, 41, 59, 0.3)',
            border: '1px solid rgba(51, 65, 85, 0.3)',
          },
          control: {
            color: '#f1f5f9',
          },
          content: {
            color: '#cbd5e1',
          },
        }}
      >
        {/* Manufacturing Steps */}
        {batch.routingSteps && batch.routingSteps.length > 0 && (
          <Accordion.Item value='routing'>
            <Accordion.Control>
              🏭 Manufacturing Steps (
              {batch.routingSteps.filter(s => s.status === 'COMPLETED').length}/
              {batch.routingSteps.length} completed)
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap='xs'>
                {batch.routingSteps.map(step => (
                  <Group key={step.id} justify='space-between'>
                    <div>
                      <Text size='xs' fw={500}>
                        Step {step.stepNumber}: {step.description}
                      </Text>
                      <Text size='xs' style={{ color: '#94a3b8' }}>
                        {step.workstation.name}
                        {step.confirmations.length > 0 && (
                          <> • Operator: {step.confirmations[0].operatorName}</>
                        )}
                      </Text>
                    </div>
                    <Badge color={getStepStatusColor(step.status)} size='xs'>
                      {step.status}
                    </Badge>
                  </Group>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        {/* Material Consumption */}
        {batch.materialConsumption && batch.materialConsumption.length > 0 && (
          <Accordion.Item value='materials'>
            <Accordion.Control>
              🧬 Material Consumption ({batch.materialConsumption.length}{' '}
              materials)
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap='xs'>
                {batch.materialConsumption.map(material => (
                  <Group key={material.materialPartId} justify='space-between'>
                    <div>
                      <Text size='xs' fw={500}>
                        {material.materialPart.partNumber}
                      </Text>
                      <Text size='xs' style={{ color: '#94a3b8' }}>
                        {material.materialPart.partName}
                      </Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Badge
                        color={getPartTypeColor(material.materialPart.partType)}
                        size='xs'
                      >
                        {material.materialPart.partType.replace('_', ' ')}
                      </Badge>
                      <Text size='xs' style={{ color: '#94a3b8' }}>
                        Qty: {material.quantityUsed}
                      </Text>
                    </div>
                  </Group>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        {/* Order Information */}
        <Accordion.Item value='order'>
          <Accordion.Control>📦 Order Information</Accordion.Control>
          <Accordion.Panel>
            <Stack gap='xs'>
              <Group justify='space-between'>
                <Text size='xs' style={{ color: '#94a3b8' }}>
                  Part Number:
                </Text>
                <Text size='xs' fw={500}>
                  {batch.lineItem.part.partNumber}
                </Text>
              </Group>
              <Group justify='space-between'>
                <Text size='xs' style={{ color: '#94a3b8' }}>
                  Part Name:
                </Text>
                <Text size='xs' fw={500}>
                  {batch.lineItem.part.partName}
                </Text>
              </Group>
              <Group justify='space-between'>
                <Text size='xs' style={{ color: '#94a3b8' }}>
                  Customer:
                </Text>
                <Text size='xs' fw={500}>
                  {batch.lineItem.purchaseOrder.customer.name}
                </Text>
              </Group>
              {batch.actualCompletion && (
                <Group justify='space-between'>
                  <Text size='xs' style={{ color: '#94a3b8' }}>
                    Completed:
                  </Text>
                  <Text size='xs' fw={500}>
                    {new Date(batch.actualCompletion).toLocaleDateString()}
                  </Text>
                </Group>
              )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
}
