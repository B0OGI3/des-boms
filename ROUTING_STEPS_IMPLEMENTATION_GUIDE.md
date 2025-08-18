# 🔄 Complete Routing Steps Implementation Guide

## Overview
This guide shows you 3 different methods to implement routing steps in DES-BOMS, from manual creation to automated template-based workflows.

## 🎯 Implementation Methods

### Method 1: Manual Routing Step Creation

**When to use:** Custom one-off manufacturing workflows

```typescript
// Create routing steps manually for a batch
const response = await fetch('/api/routing-steps', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    batchId: 'batch-123',
    routingSteps: [
      {
        workstationId: 'ws-mill-1',
        description: 'Rough milling operations',
        estimatedTime: 90,
        required: true,
        notes: 'Use carbide tooling'
      },
      {
        workstationId: 'ws-turn-1', 
        description: 'Finish turning',
        estimatedTime: 60,
        required: true
      },
      {
        workstationId: 'ws-inspect-1',
        description: 'Final inspection',
        estimatedTime: 20,
        required: true
      }
    ]
  })
});
```

### Method 2: Template-Based Creation

**When to use:** Standardized manufacturing workflows

```typescript
// Create routing steps from a template
const response = await fetch('/api/batches/batch-123/routing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    templateId: 'template-1' // Use "Standard Machining" template
  })
});
```

### Method 3: Automated Creation During Batch Generation

**When to use:** Fully automated workflow (recommended)

Modify your batch creation process to automatically create routing steps:

```typescript
// Enhanced batch creation with automatic routing
const response = await fetch('/api/batches', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lineItemId: 'line-item-123',
    quantity: 50,
    priority: 'STANDARD',
    notes: 'Batch notes',
    // Add routing configuration
    routing: {
      templateId: 'template-1', // Use predefined template
      // OR specify custom steps
      customSteps: [
        {
          workstationId: 'ws-mill-1',
          description: 'Mill to specifications',
          estimatedTime: 120
        }
      ]
    }
  })
});
```

## 🏗️ Database Schema Reference

Your routing steps are structured as:

```sql
-- RoutingStep Model Structure
{
  id: String (CUID)
  batchId: String (Foreign Key)
  stepNumber: Int (Sequence: 1, 2, 3...)
  workstationId: String (Foreign Key)
  description: String (Task description)
  required: Boolean (Default: true)
  estimatedTime: Int? (Minutes)
  notes: String? (Instructions)
  status: StepStatus (PENDING, IN_PROGRESS, COMPLETED, etc.)
}
```

## 🔧 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/routing-steps` | GET | Query routing steps with filters |
| `/api/routing-steps` | POST | Create multiple routing steps |
| `/api/routing-steps/[id]` | GET | Get specific routing step |
| `/api/routing-steps/[id]` | PUT | Update routing step |
| `/api/routing-steps/[id]` | DELETE | Delete routing step |
| `/api/batches/[id]/routing` | GET | Get batch routing steps |
| `/api/batches/[id]/routing` | POST | Create routing for batch |

## 🎨 UI Integration

### Workstation Page Integration

Your workstation page already displays routing steps:

```typescript
// Current implementation in workstations/page.tsx
useEffect(() => {
  if (!selectedWorkstation) return;
  
  const fetchRoutingSteps = async () => {
    const response = await fetch(
      `/api/routing-steps?workstationId=${selectedWorkstation}&status=PENDING,IN_PROGRESS`
    );
    if (response.ok) {
      const result = await response.json();
      setRoutingSteps(result.data || []);
    }
  };
  
  fetchRoutingSteps();
}, [selectedWorkstation]);
```

### Batch Management Integration

Add routing step creation to your batch workflow:

```typescript
// In your batch creation modal/component
const createBatchWithRouting = async (batchData) => {
  // 1. Create the batch
  const batchResponse = await fetch('/api/batches', {
    method: 'POST',
    body: JSON.stringify(batchData)
  });
  
  const batch = await batchResponse.json();
  
  // 2. Create routing steps
  if (batch.success) {
    await fetch(`/api/batches/${batch.data.id}/routing`, {
      method: 'POST',
      body: JSON.stringify({
        templateId: selectedTemplate // or customSteps
      })
    });
  }
};
```

## 🚀 Quick Start Implementation

### Step 1: Update Batch Creation

Modify your existing batch creation API to automatically create routing steps:

```typescript
// In /api/batches/route.ts POST method
const newBatch = await prisma.batch.create({
  // ... existing batch creation
});

// Add automatic routing step creation
if (routingTemplateId) {
  const template = await prisma.routingTemplate.findUnique({
    where: { id: routingTemplateId },
    include: { templateSteps: true }
  });
  
  if (template) {
    await prisma.routingStep.createMany({
      data: template.templateSteps.map(step => ({
        batchId: newBatch.id,
        stepNumber: step.stepNumber,
        workstationId: step.workstationId,
        description: step.description,
        estimatedTime: step.estimatedTime,
        status: 'PENDING'
      }))
    });
  }
}
```

### Step 2: Create Default Templates

Add some default routing templates to your database:

```sql
-- Standard Machining Template
INSERT INTO "RoutingTemplate" (id, name, description) 
VALUES ('template-std-machining', 'Standard Machining', 'Mill → Turn → Grind → Inspect');

-- Template Steps
INSERT INTO "RoutingTemplateStep" (id, "templateId", "stepNumber", "workstationId", description, "estimatedTime") VALUES
('step-1', 'template-std-machining', 1, 'ws-mill-1', 'Rough milling operations', 90),
('step-2', 'template-std-machining', 2, 'ws-turn-1', 'Turning operations', 60),
('step-3', 'template-std-machining', 3, 'ws-grind-1', 'Surface grinding', 45),
('step-4', 'template-std-machining', 4, 'ws-inspect-1', 'CMM inspection', 20);
```

### Step 3: Test the Implementation

```typescript
// Test creating a batch with routing
const testBatch = await fetch('/api/batches', {
  method: 'POST',
  body: JSON.stringify({
    lineItemId: 'existing-line-item-id',
    quantity: 25,
    priority: 'STANDARD',
    routingTemplateId: 'template-std-machining'
  })
});

// Verify routing steps were created
const batchRouting = await fetch('/api/batches/new-batch-id/routing');
```

## 🔄 Manufacturing Workflow

Here's how routing steps flow through your system:

```
1. Order Created → Line Items Generated
2. Batches Created → Routing Steps Auto-Generated
3. Workstation Queues → Display Pending Steps
4. Operators → Start/Complete Steps
5. Step Confirmations → Track Progress
6. Batch Completion → All Steps Done
7. Order Fulfillment → Ready to Ship
```

## 🎯 Next Steps

1. **Choose Implementation Method**: Start with Method 2 (Template-based) for consistency
2. **Create Templates**: Define your standard manufacturing workflows
3. **Integrate with Batch Creation**: Auto-generate routing steps when batches are created
4. **Test Workflow**: Create test batches and verify routing steps appear in workstation queues
5. **Train Operators**: Show operators how to start/complete steps in the workstation interface

## 🔍 Troubleshooting

**No routing steps appearing in workstation queues?**
- Check if batches have routing steps: `GET /api/batches/[id]/routing`
- Verify workstation IDs match in routing steps and workstation filter
- Ensure step status is 'PENDING' or 'IN_PROGRESS'

**Routing steps not created automatically?**
- Verify routing template exists and has template steps
- Check batch creation API includes routing configuration
- Review console logs for creation errors

This implementation gives you a complete routing system that integrates seamlessly with your existing DES-BOMS architecture!
