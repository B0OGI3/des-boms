# 🔌 DES-BOMS API Reference

Complete API documentation for the DES-BOMS (Delivered Engineering Solutions - Batch Order Management System).

## 📋 API Overview

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

### Authentication
Currently using session-based authentication. Future versions may include API keys.

### Response Format
All API responses follow this standard format:
```json
{
  "success": true | false,
  "data": <response_data>,
  "error": "<error_message>",  // Only present if success = false
  "count": <number>,           // For list endpoints
  "message": "<success_message>" // Optional success message
}
```

## 🏭 Manufacturing Core APIs

### Orders Management

#### `GET /api/orders`
Get all purchase orders with filtering options.

**Query Parameters:**
- `search` (string): Search term for orders
- `status` (string): Filter by order status
- `priority` (string): Filter by priority (RUSH, STANDARD, HOLD)
- `customer` (string): Filter by customer name
- `page` (number): Page number for pagination
- `limit` (number): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "systemOrderId": "DES-2025-001",
      "poNumber": "PO-12345",
      "customer": {
        "name": "Customer Name",
        "contactName": "John Doe"
      },
      "priority": "RUSH",
      "dueDate": "2025-08-15T00:00:00Z",
      "lineItems": [...],
      "totalValue": 15000.00
    }
  ],
  "count": 25
}
```

#### `POST /api/orders`
Create a new purchase order.

**Request Body:**
```json
{
  "customerId": "uuid",
  "poNumber": "PO-12345",
  "dueDate": "2025-08-15",
  "priority": "STANDARD",
  "notes": "Special handling required",
  "lineItems": [
    {
      "partNumber": "PART-001",
      "partName": "Main Shaft",
      "drawingNumber": "DWG-001",
      "revisionLevel": "Rev-C",
      "quantity": 100,
      "dueDate": "2025-08-10",
      "notes": "316L stainless steel"
    }
  ]
}
```

#### `GET /api/orders/{id}`
Get specific order details.

#### `PUT /api/orders/{id}`
Update an existing order.

#### `DELETE /api/orders/{id}`
Delete an order (with cascade protection).

### Batch Management

#### `GET /api/batches`
Get all batches with filtering and search.

**Query Parameters:**
- `search` (string): Search batches
- `status` (string): PENDING, IN_PROGRESS, COMPLETED, CANCELLED
- `priority` (string): RUSH, STANDARD, HOLD
- `workstation` (string): Filter by workstation
- `overdue` (boolean): Show only overdue batches

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "batchId": "DES-2025-0807-001",
      "quantity": 50,
      "status": "IN_PROGRESS",
      "priority": "RUSH",
      "startDate": "2025-08-07T08:00:00Z",
      "estimatedCompletion": "2025-08-08T17:00:00Z",
      "lineItem": {
        "partNumber": "PART-001",
        "partName": "Main Shaft",
        "purchaseOrder": {
          "customer": { "name": "Customer Name" }
        }
      },
      "routingSteps": [...],
      "qcRecords": [...]
    }
  ]
}
```

#### `POST /api/batches`
Create a new batch.

**Request Body:**
```json
{
  "lineItemId": "uuid",
  "quantity": 25,
  "priority": "RUSH",
  "notes": "Expedite processing",
  "routingTemplateId": "uuid"
}
```

#### `GET /api/batches/{id}`
Get detailed batch information.

#### `PUT /api/batches/{id}`
Update batch details.

#### `DELETE /api/batches/{id}`
Delete a batch.

### Workstation Operations

#### `GET /api/workstations`
Get all workstations with current status.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "LATHE-1",
      "description": "CNC Lathe - Turning Operations",
      "active": true,
      "status": "ACTIVE",
      "currentOperator": "John Doe",
      "activeJobs": 2,
      "queuedJobs": 5
    }
  ]
}
```

#### `GET /api/routing-steps`
Get routing steps for workstation queues.

**Query Parameters:**
- `workstationId` (string): Filter by workstation
- `status` (string): PENDING, IN_PROGRESS, COMPLETED
- `operatorName` (string): Filter by operator

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "stepNumber": 1,
      "description": "Rough turning operations",
      "estimatedTime": 120,
      "status": "PENDING",
      "batch": {
        "batchId": "DES-2025-0807-001",
        "priority": "RUSH",
        "lineItem": {
          "partNumber": "PART-001",
          "partName": "Main Shaft"
        }
      }
    }
  ]
}
```

### Step Confirmations

#### `POST /api/confirmations`
Create step confirmation (start, complete, or flag).

**Request Body:**
```json
{
  "stepId": "uuid",
  "workstationId": "uuid",
  "operatorName": "John Doe",
  "action": "start" | "complete" | "flag",
  "notes": "Operation completed successfully",
  "photoUrl": "optional-photo-url"
}
```

#### `GET /api/confirmations`
Get step confirmations with filtering.

### Quality Control

#### `GET /api/qc`
Get QC records.

**Query Parameters:**
- `batchId` (string): Filter by batch
- `inspector` (string): Filter by inspector
- `result` (string): PASS, FAIL, REWORK_REQUIRED

#### `POST /api/qc`
Create QC inspection record.

**Request Body:**
```json
{
  "batchId": "uuid",
  "inspector": "Jane Smith",
  "result": "PASS",
  "notes": "All dimensions within tolerance",
  "inspectionDate": "2025-08-07T14:30:00Z"
}
```

## 📊 Analytics & Reporting

### Dashboard Data

#### `GET /api/dashboard`
Get real-time dashboard metrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalOrders": 150,
      "totalBatches": 75,
      "activeBatches": 25,
      "completedBatches": 45,
      "rushOrders": 12,
      "pendingQC": 8
    },
    "workstationEfficiency": [...],
    "alerts": {
      "overdueBatches": [...],
      "flaggedSteps": [...]
    }
  }
}
```

### Statistics

#### `GET /api/stats`
Get various system statistics.

#### `GET /api/analytics/batches`
Get batch analytics data.

## 🔍 Search & Suggestions

#### `GET /api/search/suggestions`
Get search suggestions for auto-complete.

**Query Parameters:**
- `q` (string): Search query
- `type` (string): customers, parts, batches

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "value": "PART-001",
      "label": "PART-001 - Main Shaft",
      "type": "part"
    }
  ]
}
```

## 🔗 Integration APIs

### QuickBooks Integration

#### `GET /api/quickbooks/status`
Get QuickBooks connection status.

#### `POST /api/quickbooks/import-customers`
Import customers from QuickBooks.

## 📋 Support APIs

### Health Check

#### `GET /api/health`
System health check endpoint.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "connected",
    "timestamp": "2025-08-07T12:00:00Z",
    "version": "1.0.0"
  }
}
```

## 🚨 Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "field": "quantity",
    "message": "Quantity cannot exceed available amount"
  }
}
```

## 🔒 Security Considerations

### Data Validation
- All inputs are validated and sanitized
- SQL injection prevention
- XSS protection

### Rate Limiting
- API rate limiting to prevent abuse
- Different limits for different endpoint types

### Authentication
- Session-based authentication
- Role-based access control (planned)

## 📚 Best Practices

### Request Guidelines
1. Use appropriate HTTP methods
2. Include proper Content-Type headers
3. Handle errors gracefully
4. Implement retry logic for failed requests

### Response Handling
1. Always check the `success` field
2. Handle pagination for list endpoints
3. Cache responses when appropriate
4. Update UI based on real-time data

## 🔄 Real-time Updates

### WebSocket Endpoints
- `/api/ws/batches` - Real-time batch updates
- `/api/ws/workstations` - Workstation status updates

### Event Types
```json
{
  "type": "batch_status_update",
  "data": {
    "batchId": "DES-2025-0807-001",
    "oldStatus": "IN_PROGRESS",
    "newStatus": "COMPLETED"
  }
}
```

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- UUIDs are used for all entity identifiers
- Soft deletes are used where data integrity is critical
- Audit trails are maintained for all manufacturing operations

For additional API questions or support, please refer to the development team.
