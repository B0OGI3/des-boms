/**
 * DES-BOMS Homepage Component
 * 
 * Main landing page for the Batch Order Management System.
 * Provides an overview of manufacturing order management, batch routing, 
 * workstation confirmations, and inspection processes.
 */

"use client";

import { Title, Text, Card, Badge, Group, Stack, Loader, Alert } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardData {
  overview: {
    totalOrders: number;
    totalBatches: number;
    activeBatches: number;
    completedBatches: number;
    queuedBatches: number;
    onHoldBatches: number;
    totalWorkstations: number;
    activeWorkstations: number;
    rushOrders: number;
    pendingQC: number;
  };
  workstationEfficiency: Array<{
    workstationId: string;
    name: string;
    status: 'ACTIVE' | 'QUEUED' | 'IDLE';
    activeJobs: number;
    queuedJobs: number;
    currentOperator: string | null;
    currentBatch: string | null;
  }>;
  alerts: {
    flaggedSteps: Array<{
      id: string;
      workstation: string;
      batch: string;
      step: string;
      duration: number;
    }>;
    overdueBatches: Array<{
      id: string;
      batch: string;
      workstation: string;
      due: string;
      overdue: number;
    }>;
  };
}

export default function HomePage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        setDashboardData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'green';
      case 'QUEUED': return 'yellow';
      case 'IDLE': return 'gray';
      case 'RUSH': return 'red';
      default: return 'blue';
    }
  };

  return (
    <main
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 48,
            paddingTop: 32,
          }}
        >
          <Title
            order={1}
            style={{
              color: "#f1f5f9",
              marginBottom: 16,
              fontSize: "3rem",
              fontWeight: 700,
              textShadow: "0 4px 8px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            DES-BOMS
          </Title>
          <Text
            size="xl"
            style={{
              color: "#cbd5e1",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            Batch Order Management System
          </Text>
          <Text
            size="md"
            style={{
              color: "#94a3b8",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Manufacturing order management with real-time tracking and quality control.
          </Text>
        </div>

        {/* Primary Navigation Cards */}
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            margin: "0 auto 48px auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {[
            {
              title: "Customer Orders",
              link: "/orders",
              description: "Manage customer purchase orders, line items, and due dates.",
              color: "blue",
              icon: "�",
              accent: "#3b82f6",
            },
            {
              title: "Batch Routing",
              link: "/batches",
              description: "Track batch progress through manufacturing workstations.",
              color: "teal",
              icon: "🔄",
              accent: "#14b8a6",
            },
            {
              title: "Shop Floor",
              link: "/workstations",
              description: "Real-time workstation status and operator confirmations.",
              color: "green",
              icon: "🏭",
              accent: "#10b981",
            },
            {
              title: "Quality Control",
              link: "/qc",
              description: "Inspection workflows and quality management.",
              color: "orange",
              icon: "🔍",
              accent: "#f59e0b",
            },
            {
              title: "Reports & Settings",
              link: "/reports",
              description: "Analytics, system health, and configuration.",
              color: "purple",
              icon: "�",
              accent: "#8b5cf6",
            },
          ].map((section) => (
            <Link
              href={section.link}
              key={section.title}
              style={{ textDecoration: "none" }}
            >
              <Card
                padding="xl"
                style={{
                  background: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(51, 65, 85, 0.8)",
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  height: "180px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = section.accent;
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.8)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    marginBottom: "16px",
                  }}
                >
                  {section.icon}
                </div>
                <Text
                  fw={600}
                  size="xl"
                  style={{
                    color: "#f1f5f9",
                    marginBottom: "12px",
                  }}
                >
                  {section.title}
                </Text>
                <Text
                  size="md"
                  style={{ 
                    color: "#94a3b8", 
                    lineHeight: 1.5,
                  }}
                >
                  {section.description}
                </Text>
                {/* Subtle accent border */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: section.accent,
                    opacity: 0.7,
                  }}
                />
              </Card>
            </Link>
          ))}
        </div>

        {/* Dashboard Toggle Button */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            style={{
              background: "rgba(30, 41, 59, 0.9)",
              border: "1px solid rgba(51, 65, 85, 0.8)",
              borderRadius: "12px",
              padding: "16px 32px",
              color: "#f1f5f9",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 500,
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "0 auto",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(30, 41, 59, 0.9)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "rgba(30, 41, 59, 0.9)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "20px" }}>📊</span>
            <span>{showDashboard ? "Hide" : "Show"} Live Dashboard</span>
            <span 
              style={{ 
                fontSize: "12px", 
                transform: showDashboard ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
              }}
            >
              ▼
            </span>
          </button>
        </div>

        {/* Collapsible Dashboard Content */}
        <div
          style={{
            maxHeight: showDashboard ? "2000px" : "0",
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: showDashboard ? 1 : 0,
            transform: showDashboard ? "translateY(0)" : "translateY(-20px)",
          }}
        >

        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 20px",
            background: "rgba(30, 41, 59, 0.7)",
            borderRadius: "16px",
            margin: "20px auto",
            maxWidth: "400px",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(51, 65, 85, 0.6)",
          }}>
            <Loader size="xl" color="#3b82f6" />
            <Text size="lg" style={{ color: "#cbd5e1", marginTop: 20, fontWeight: 500 }}>
              Loading manufacturing data...
            </Text>
            <Text size="sm" style={{ color: "#94a3b8", marginTop: 8 }}>
              Connecting to production systems
            </Text>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert
            color="red"
            title="Connection Error"
            style={{ 
              marginBottom: 32, 
              maxWidth: 1100, 
              width: "100%",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Text style={{ color: "#fca5a5" }}>{error}</Text>
          </Alert>
        )}

        {/* Real-time Statistics */}
        {dashboardData && (
          <>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Title
                order={2}
                style={{ 
                  color: "#f1f5f9", 
                  marginBottom: 8, 
                  fontSize: "1.8rem",
                  fontWeight: 600,
                }}
              >
                Production Overview
              </Title>
              <Text style={{ color: "#94a3b8", fontSize: "1rem" }}>
                Real-time metrics • Updates every 30 seconds
              </Text>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: 800,
                margin: "0 auto 32px auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 24,
              }}
            >
            {[
              {
                title: "Active Batches",
                value: dashboardData.overview.activeBatches,
                total: dashboardData.overview.totalBatches,
                color: "blue",
                icon: "⚡",
              },
              {
                title: "Rush Orders",
                value: dashboardData.overview.rushOrders,
                total: dashboardData.overview.totalOrders,
                color: "red",
                icon: "🚨",
              },
              {
                title: "Pending QC",
                value: dashboardData.overview.pendingQC,
                total: dashboardData.overview.totalBatches,
                color: "orange",
                icon: "🔍",
              },
              {
                title: "Active Stations",
                value: dashboardData.workstationEfficiency.filter(w => w.status === 'ACTIVE').length,
                total: dashboardData.overview.totalWorkstations,
                color: "green",
                icon: "🏭",
              },
            ].map((stat) => (
              <Card
                key={stat.title}
                padding="lg"
                style={{
                  background: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(51, 65, 85, 0.8)",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                }}
              >
                <Text size="xl" style={{ marginBottom: 8, fontSize: "1.5rem" }}>
                  {stat.icon}
                </Text>
                <Text size="xl" fw={700} style={{ color: "#f1f5f9", marginBottom: 4, fontSize: "2rem" }}>
                  {stat.value}
                </Text>
                <Text size="sm" style={{ color: "#cbd5e1", marginBottom: 8, fontWeight: 500 }}>
                  {stat.title}
                </Text>
                <Badge
                  color={stat.color}
                  variant="light"
                  size="sm"
                  style={{ fontWeight: 600 }}
                >
                  {Math.round((stat.value / stat.total) * 100)}%
                </Badge>
              </Card>
            ))}
            </div>
          </>
        )}

        {/* Manufacturing Alerts & Critical Information */}
        {dashboardData && (dashboardData.alerts.flaggedSteps.length > 0 || dashboardData.alerts.overdueBatches.length > 0) && (
          <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto 32px auto" }}>
            <Title
              order={3}
              style={{ 
                color: "#f1f5f9", 
                marginBottom: 16, 
                fontSize: "1.5rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              ⚠️ Manufacturing Alerts
            </Title>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 20 }}>
              
              {/* Overdue Batches Alert */}
              {dashboardData.alerts.overdueBatches.length > 0 && (
                <Alert
                  icon="🚨"
                  title={`${dashboardData.alerts.overdueBatches.length} Overdue Batches`}
                  color="red"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {dashboardData.alerts.overdueBatches.slice(0, 3).map((batch) => (
                    <Text key={batch.id} size="sm" style={{ color: "#fca5a5", marginBottom: 4 }}>
                      • Batch {batch.batch} at {batch.workstation} - {batch.overdue}h overdue
                    </Text>
                  ))}
                  {dashboardData.alerts.overdueBatches.length > 3 && (
                    <Text size="sm" style={{ color: "#fca5a5", fontStyle: "italic" }}>
                      ... and {dashboardData.alerts.overdueBatches.length - 3} more
                    </Text>
                  )}
                </Alert>
              )}

              {/* Flagged Steps Alert */}
              {dashboardData.alerts.flaggedSteps.length > 0 && (
                <Alert
                  icon="⏱️"
                  title={`${dashboardData.alerts.flaggedSteps.length} Long-Running Steps`}
                  color="yellow"
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {dashboardData.alerts.flaggedSteps.slice(0, 3).map((step) => (
                    <Text key={step.id} size="sm" style={{ color: "#fbbf24", marginBottom: 4 }}>
                      • {step.step} at {step.workstation} - {Math.round(step.duration)}min
                    </Text>
                  ))}
                  {dashboardData.alerts.flaggedSteps.length > 3 && (
                    <Text size="sm" style={{ color: "#fbbf24", fontStyle: "italic" }}>
                      ... and {dashboardData.alerts.flaggedSteps.length - 3} more
                    </Text>
                  )}
                </Alert>
              )}
              
            </div>
          </div>
        )}

        {/* Live Workstation Status */}
        {dashboardData && dashboardData.workstationEfficiency.length > 0 && (
          <div
            style={{
              width: "100%",
              maxWidth: 800,
              margin: "0 auto 32px auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Title
                order={3}
                style={{ 
                  color: "#f1f5f9", 
                  marginBottom: 8,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                Workstation Status
              </Title>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {dashboardData.workstationEfficiency.slice(0, 4).map((ws) => (
                <Card
                  key={ws.workstationId}
                  padding="md"
                  style={{
                    background: "rgba(30, 41, 59, 0.9)",
                    border: "1px solid rgba(51, 65, 85, 0.8)",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Stack gap="xs">
                    <Group justify="space-between" align="center">
                      <Text fw={600} size="md" style={{ color: "#f1f5f9" }}>
                        {ws.name}
                      </Text>
                      <Badge
                        color={getStatusColor(ws.status)}
                        variant="filled"
                        size="sm"
                      >
                        {ws.status}
                      </Badge>
                    </Group>
                    
                    {ws.currentOperator && (
                      <Text size="sm" style={{ color: "#cbd5e1" }}>
                        👤 {ws.currentOperator}
                      </Text>
                    )}
                    
                    <Group gap="md">
                      <div style={{ textAlign: "center" }}>
                        <Text size="lg" fw={700} style={{ color: "#10b981" }}>
                          {ws.activeJobs}
                        </Text>
                        <Text size="xs" style={{ color: "#94a3b8" }}>
                          Active
                        </Text>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text size="lg" fw={700} style={{ color: "#f59e0b" }}>
                          {ws.queuedJobs}
                        </Text>
                        <Text size="xs" style={{ color: "#94a3b8" }}>
                          Queued
                        </Text>
                      </div>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </div>
          </div>
        )}

        </div> {/* End of Collapsible Dashboard Content */}

        {/* Quick Links */}
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            margin: "48px auto 0",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
            paddingBottom: "40px",
          }}
        >
          {[
            { title: "System Health", link: "/health", icon: "💚" },
            { title: "Settings", link: "/settings", icon: "⚙️" },
          ].map((action) => (
            <Link
              href={action.link}
              key={action.title}
              style={{ textDecoration: "none" }}
            >
              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  background: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(51, 65, 85, 0.8)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.9)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.9)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "16px" }}>{action.icon}</span>
                <Text
                  size="sm"
                  fw={500}
                  style={{ color: "#f1f5f9" }}
                >
                  {action.title}
                </Text>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
