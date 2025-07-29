/**
 * Work Traveler Modal - Generate and Print Work Travelers
 * 
 * Implements DES-BOMS specification requirements:
 * 3.3 Work Traveler Generation - Printable routing documentation
 * 
 * Features:
 * - Complete batch and routing information
 * - Print-optimized layout
 * - QR code for batch tracking
 * - Operator sign-off sections
 * - PDF generation capability
 */

"use client";

import React, { useState } from "react";
import { 
  Modal, 
  Text, 
  Group, 
  Stack, 
  Badge, 
  Button,
  Paper
} from "@mantine/core";
import QRCode from 'react-qr-code';
import type { Batch } from '../types';
import { 
  formatEstimatedTime
} from '../utils/batchHelpers';

interface WorkTravelerModalProps {
  opened: boolean;
  onClose: () => void;
  batch: Batch | null;
}

export function WorkTravelerModal({ 
  opened, 
  onClose, 
  batch 
}: Readonly<WorkTravelerModalProps>) {
  const [generating, setGenerating] = useState(false);

  const handlePrint = () => {
    // Add a small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleGeneratePDF = async () => {
    if (!batch) return;

    try {
      setGenerating(true);
      
      const response = await fetch(`/api/batches/${batch.id}/work-traveler`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Get error details from response
        let errorMessage = `Server responded with status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.details) {
            errorMessage = `${errorMessage} - ${errorData.details}`;
          }
          if (errorData.message) {
            errorMessage = errorData.message;
          }
          console.error('Server error details:', errorData);
        } catch (parseError) {
          console.error('Could not parse error response:', parseError);
        }

        // Handle different error cases more gracefully
        if (response.status === 404) {
          alert('PDF generation feature is not yet implemented. Please use the print function instead.');
          return;
        } else if (response.status === 503) {
          alert(errorMessage || 'PDF generation is temporarily unavailable. Please use the print function instead.');
          return;
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `WorkTraveler_${batch.batchId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error('Error generating PDF:', err);
      // More user-friendly error message
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      alert(`PDF generation failed: ${errorMessage}\n\nPlease try again or use the print function as an alternative.`);
    } finally {
      setGenerating(false);
    }
  };

  if (!batch) return null;

  // Remove unused progress calculation
  // const progress = calculateBatchProgress(batch);
  const sortedSteps = [...batch.routingSteps].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="md">
          <Text size="lg" fw={600} style={{ color: "#f1f5f9" }}>
            Work Traveler
          </Text>
          <Badge variant="light" color="blue">
            {batch.batchId}
          </Badge>
        </Group>
      }
      size="xl"
      styles={{
        content: {
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
          border: "1px solid rgba(51, 65, 85, 0.4)",
          backdropFilter: "blur(16px)",
        },
        header: {
          background: "transparent",
          borderBottom: "1px solid rgba(51, 65, 85, 0.3)",
        },
        title: {
          color: "#f1f5f9",
          fontWeight: 600,
        },
      }}
    >
      <Stack gap="lg">
        {/* Action Buttons */}
        <Group justify="flex-end" className="no-print">
          <div style={{ 
            background: "rgba(59, 130, 246, 0.1)", 
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "12px",
            color: "#93c5fd",
            marginRight: "auto"
          }}>
            💡 Print Tip: For single-sided printing, select "Print on one side" in your browser's print dialog
          </div>
          <Button
            variant="subtle"
            onClick={onClose}
            style={{
              color: "#94a3b8",
              border: "1px solid rgba(51, 65, 85, 0.5)",
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleGeneratePDF}
            loading={generating}
            leftSection={<span>📄</span>}
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              border: "none",
            }}
          >
            Download PDF
          </Button>
          <Button
            onClick={handlePrint}
            leftSection={<span>🖨️</span>}
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "none",
            }}
            title="Tip: In print dialog, select 'Print on one side' for single-sided printing"
          >
            Print
          </Button>
        </Group>

        {/* Work Traveler Document */}
        <Paper
          style={{
            background: "#ffffff",
            color: "#000000",
            padding: "24px",
            minHeight: "800px",
            fontFamily: "Arial, sans-serif",
          }}
          className="work-traveler-document"
        >
          {/* Header */}
          <div style={{ 
            borderBottom: "2px solid #000", 
            paddingBottom: "16px", 
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
                WORK TRAVELER
              </h1>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#666" }}>
                Manufacturing Routing Document
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                border: "1px solid #000", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px"
              }}>
                <QRCode
                  value={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/batches/${batch.id}`}
                  size={72}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div style={{ fontSize: "8px", textAlign: "center", marginTop: "2px" }}>
                Scan for batch info
              </div>
            </div>
          </div>

          {/* Batch Information */}
          <div style={{ marginBottom: "24px" }} className="batch-info">
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
              Batch Information
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "16px",
              background: "#f8f9fa",
              padding: "12px",
              border: "1px solid #dee2e6"
            }}>
              <div>
                <strong>Batch ID:</strong><br/>
                {batch.batchId}
              </div>
              <div>
                <strong>Priority:</strong><br/>
                {batch.priority}
              </div>
              <div>
                <strong>Quantity:</strong><br/>
                {batch.quantity} units
              </div>
              <div>
                <strong>Part Number:</strong><br/>
                {batch.lineItem.partNumber}
              </div>
              <div>
                <strong>Part Name:</strong><br/>
                {batch.lineItem.partName}
              </div>
              <div>
                <strong>Drawing #:</strong><br/>
                {batch.lineItem.drawingNumber || 'N/A'}
              </div>
              <div>
                <strong>Order:</strong><br/>
                {batch.lineItem.purchaseOrder.systemOrderId}
              </div>
              <div>
                <strong>Customer:</strong><br/>
                {batch.lineItem.purchaseOrder.customer.name}
              </div>
              <div>
                <strong>Created:</strong><br/>
                {new Date(batch.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {batch.notes && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
                Special Instructions
              </h2>
              <div style={{ 
                background: "#fff3cd",
                border: "1px solid #ffeaa7",
                padding: "12px",
                fontSize: "14px"
              }}>
                {batch.notes}
              </div>
            </div>
          )}

          {/* Routing Steps */}
          <div style={{ marginBottom: "24px" }} className="routing-steps">
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
              Routing Steps ({sortedSteps.length})
            </h2>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse",
              border: "1px solid #000"
            }}>
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  <th style={{ 
                    border: "1px solid #000", 
                    padding: "8px", 
                    textAlign: "left",
                    width: "60px"
                  }}>
                    Step
                  </th>
                  <th style={{ 
                    border: "1px solid #000", 
                    padding: "8px", 
                    textAlign: "left"
                  }}>
                    Operation Description
                  </th>
                  <th style={{ 
                    border: "1px solid #000", 
                    padding: "8px", 
                    textAlign: "left",
                    width: "100px"
                  }}>
                    Est. Time
                  </th>
                  <th style={{ 
                    border: "1px solid #000", 
                    padding: "8px", 
                    textAlign: "left",
                    width: "80px"
                  }}>
                    Status
                  </th>
                  <th style={{ 
                    border: "1px solid #000", 
                    padding: "8px", 
                    textAlign: "left",
                    width: "120px"
                  }}>
                    Operator/Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedSteps.map((step) => (
                  <tr key={step.id} className="routing-step">
                    <td style={{ 
                      border: "1px solid #000", 
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}>
                      {step.stepNumber}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      <div>
                        <strong>{step.description}</strong>
                        {step.workstation && (
                          <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                            Workstation: {step.workstation.name}
                          </div>
                        )}
                        {step.notes && (
                          <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                            Notes: {step.notes}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ 
                      border: "1px solid #000", 
                      padding: "8px",
                      textAlign: "center"
                    }}>
                      {step.estimatedTime ? formatEstimatedTime(step.estimatedTime) : 'N/A'}
                    </td>
                    <td style={{ 
                      border: "1px solid #000", 
                      padding: "8px",
                      textAlign: "center"
                    }}>
                      {(() => {
                        if (step.status === 'COMPLETED') return '✓';
                        if (step.status === 'IN_PROGRESS') return '○';
                        if (step.status === 'FAILED') return '✗';
                        return '□';
                      })()}
                    </td>
                    <td style={{ 
                      border: "1px solid #000", 
                      padding: "8px",
                      minHeight: "40px"
                    }}>
                      {/* Space for operator signature and date */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quality Control Section */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
              Quality Control Sign-off
            </h2>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse",
              border: "1px solid #000"
            }}>
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  <th style={{ border: "1px solid #000", padding: "8px", textAlign: "left" }}>
                    Inspection Type
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px", textAlign: "left", width: "100px" }}>
                    Result
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px", textAlign: "left", width: "120px" }}>
                    Inspector/Date
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px", textAlign: "left" }}>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    In-Process Inspection
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px", minHeight: "40px" }}>
                    {/* Space for QC result */}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px", minHeight: "40px" }}>
                    {/* Space for inspector signature */}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px", minHeight: "40px" }}>
                    {/* Space for notes */}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    Final Inspection
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px", minHeight: "40px" }}>
                    {/* Space for QC result */}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px", minHeight: "40px" }}>
                    {/* Space for inspector signature */}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px", minHeight: "40px" }}>
                    {/* Space for notes */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ 
            borderTop: "1px solid #000",
            paddingTop: "16px",
            fontSize: "12px",
            color: "#666",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div>
              Generated: {new Date().toLocaleString()}
            </div>
            <div>
              DES-BOMS Manufacturing System
            </div>
          </div>
        </Paper>
      </Stack>

      {/* Print Styles */}
      <style>{`
        @media print {
          /* Hide non-essential elements */
          .no-print {
            display: none !important;
          }
          
          /* Reset page layout */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          /* Modal content styling for print */
          .work-traveler-document {
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 20px !important;
            width: 100% !important;
            max-width: none !important;
            page-break-inside: avoid;
          }
          
          /* Typography adjustments */
          h1, h2, h3, h4, h5, h6 {
            color: black !important;
            page-break-after: avoid;
            margin-top: 0 !important;
          }
          
          h1 { font-size: 18pt !important; margin-bottom: 8pt !important; }
          h2 { font-size: 14pt !important; margin-bottom: 6pt !important; }
          
          /* Compact layout for better single-page fit */
          .work-traveler-document {
            font-size: 10pt !important;
            line-height: 1.2 !important;
          }
          
          /* Table styling */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 6pt 0 !important;
            page-break-inside: avoid;
            font-size: 9pt !important;
          }
          
          table th,
          table td {
            border: 1px solid #000 !important;
            padding: 3pt 4pt !important;
            text-align: left !important;
            color: black !important;
            vertical-align: top !important;
          }
          
          table th {
            background: #f5f5f5 !important;
            font-weight: bold !important;
          }
          
          /* Page breaks */
          .routing-steps {
            page-break-inside: avoid;
          }
          
          .routing-step {
            page-break-inside: avoid;
            margin-bottom: 10px !important;
            border: 1px solid #ccc !important;
            padding: 10px !important;
          }
          
          /* Ensure proper spacing */
          .batch-info,
          .part-info,
          .order-info {
            margin-bottom: 15px !important;
          }
          
          /* Hide shadows and gradients */
          [style*="box-shadow"],
          [style*="gradient"] {
            box-shadow: none !important;
            background: white !important;
          }
          
          /* Force black text for readability */
          * {
            color: black !important;
          }
        }
      `}</style>
    </Modal>
  );
}
