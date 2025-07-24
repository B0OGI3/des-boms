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

  const getWorkstationStatusGradient = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return "linear-gradient(90deg, #10b981, #059669)";
      case 'QUEUED':
        return "linear-gradient(90deg, #f59e0b, #d97706)";
      default:
        return "linear-gradient(90deg, #6b7280, #4b5563)";
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
            marginBottom: 40,
            paddingTop: 24,
          }}
        >
          <Title
            order={1}
            style={{
              color: "#f1f5f9",
              marginBottom: 12,
              fontSize: "2.8rem",
              fontWeight: 700,
              textShadow: "0 4px 8px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            DES-BOMS
          </Title>
          <Text
            size="lg"
            style={{
              color: "#cbd5e1",
              marginBottom: 8,
              fontWeight: 500,
              fontSize: "1.15rem",
            }}
          >
            Batch Order Management System
          </Text>
          <Text
            size="sm"
            style={{
              color: "#94a3b8",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.5,
              fontSize: "0.95rem",
            }}
          >
            Comprehensive manufacturing order management, batch routing, workstation confirmations, and inspection processes.
          </Text>
        </div>

        {/* Primary Navigation Cards */}
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto 48px auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {[
            {
              title: "Customer Orders",
              link: "/orders",
              description: "Manage customer purchase orders, line items, and due dates.",
              color: "blue",
              icon: "📋",
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
              description: "Operator confirmations and real-time workstation status.",
              color: "green",
              icon: "🏭",
              accent: "#10b981",
            },
            {
              title: "Quality Control",
              link: "/inspection",
              description: "Inspection records and quality control management.",
              color: "orange",
              icon: "🔍",
              accent: "#f59e0b",
            },
          ].map((section) => (
            <Link
              href={section.link}
              key={section.title}
              style={{ textDecoration: "none" }}
            >
              <Card
                padding="lg"
                style={{
                  background: "rgba(30, 41, 59, 0.85)",
                  border: "1px solid rgba(51, 65, 85, 0.7)",
                  borderRadius: "12px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  height: "160px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.4)";
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.borderColor = section.accent;
                  e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.7)";
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.85)";
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    marginBottom: "12px",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                >
                  {section.icon}
                </div>
                <Text
                  fw={600}
                  size="lg"
                  style={{
                    color: "#f1f5f9",
                    fontSize: "1.1rem",
                    marginBottom: "8px",
                  }}
                >
                  {section.title}
                </Text>
                <Text
                  size="sm"
                  style={{ 
                    color: "#94a3b8", 
                    lineHeight: 1.4,
                    fontSize: "0.85rem",
                    maxWidth: "95%",
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
                    background: `linear-gradient(90deg, ${section.accent}40, ${section.accent}80, ${section.accent}40)`,
                  }}
                />
              </Card>
            </Link>
          ))}
        </div>

        {/* Dashboard Toggle Button */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            style={{
              background: "rgba(30, 41, 59, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
              borderRadius: "12px",
              padding: "12px 24px",
              color: "#f1f5f9",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 500,
              transition: "all 0.3s ease",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "0 auto",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(30, 41, 59, 0.85)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.4)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "rgba(30, 41, 59, 0.85)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
            }}
          >
            <span style={{ fontSize: "18px" }}>📊</span>
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
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                📊 Live Manufacturing Dashboard
              </Title>
              <Text style={{ color: "#94a3b8", fontSize: "1rem" }}>
                Real-time production metrics • Updates every 30 seconds
              </Text>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: 1100,
                margin: "0 auto 48px auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
            {[
              {
                title: "Active Batches",
                value: dashboardData.overview.activeBatches,
                total: dashboardData.overview.totalBatches,
                color: "blue",
                icon: "⚡",
                gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              },
              {
                title: "Rush Orders",
                value: dashboardData.overview.rushOrders,
                total: dashboardData.overview.totalOrders,
                color: "red",
                icon: "🚨",
                gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
              },
              {
                title: "Queued Batches",
                value: dashboardData.overview.queuedBatches,
                total: dashboardData.overview.totalBatches,
                color: "orange",
                icon: "⏳",
                gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
              },
              {
                title: "Active Workstations",
                value: dashboardData.workstationEfficiency.filter(w => w.status === 'ACTIVE').length,
                total: dashboardData.overview.totalWorkstations,
                color: "green",
                icon: "🏭",
                gradient: "linear-gradient(135deg, #10b981, #059669)",
              },
            ].map((stat) => (
              <Card
                key={stat.title}
                padding="xl"
                style={{
                  background: "rgba(30, 41, 59, 0.85)",
                  border: "1px solid rgba(51, 65, 85, 0.7)",
                  borderRadius: "16px",
                  textAlign: "center",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: stat.gradient,
                  }}
                />
                <Text size="xl" style={{ marginBottom: 12, fontSize: "2rem" }}>
                  {stat.icon}
                </Text>
                <Text size="xl" fw={700} style={{ color: "#f1f5f9", marginBottom: 8, fontSize: "2.5rem" }}>
                  {stat.value}
                </Text>
                <Text size="sm" style={{ color: "#cbd5e1", marginBottom: 12, fontWeight: 500 }}>
                  {stat.title}
                </Text>
                <Badge
                  color={stat.color}
                  variant="light"
                  size="md"
                  style={{ fontWeight: 600 }}
                >
                  {Math.round((stat.value / stat.total) * 100)}% of {stat.total}
                </Badge>
              </Card>
            ))}
            </div>
          </>
        )}

        {/* Live Workstation Status */}
        {dashboardData && dashboardData.workstationEfficiency.length > 0 && (
          <div
            style={{
              width: "100%",
              maxWidth: 1100,
              margin: "0 auto 48px auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Title
                order={2}
                style={{ 
                  color: "#f1f5f9", 
                  marginBottom: 8,
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                🔧 Live Workstation Status
              </Title>
              <Text style={{ color: "#94a3b8", fontSize: "1rem" }}>
                Real-time monitoring of production workstations
              </Text>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {dashboardData.workstationEfficiency.map((ws) => (
                <Card
                  key={ws.workstationId}
                  padding="lg"
                  style={{
                    background: "rgba(30, 41, 59, 0.85)",
                    border: "1px solid rgba(51, 65, 85, 0.7)",
                    borderRadius: "16px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                  }}
                >
                  <Stack gap="sm">
                    <Group justify="space-between" align="center">
                      <Text fw={600} size="lg" style={{ color: "#f1f5f9" }}>
                        {ws.name}
                      </Text>
                      <Badge
                        color={getStatusColor(ws.status)}
                        variant="filled"
                        size="lg"
                        style={{ 
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          padding: "8px 12px",
                        }}
                      >
                        {ws.status}
                      </Badge>
                    </Group>
                    
                    <div style={{ 
                      background: "rgba(51, 65, 85, 0.5)", 
                      padding: "12px", 
                      borderRadius: "8px",
                      border: "1px solid rgba(71, 85, 105, 0.3)"
                    }}>
                      {ws.currentOperator && (
                        <Text size="sm" style={{ color: "#cbd5e1", marginBottom: 6 }}>
                          👤 Operator: <strong style={{ color: "#f1f5f9" }}>{ws.currentOperator}</strong>
                        </Text>
                      )}
                      {ws.currentBatch && (
                        <Text size="sm" style={{ color: "#cbd5e1", marginBottom: 6 }}>
                          📦 Batch: <strong style={{ color: "#f1f5f9" }}>{ws.currentBatch}</strong>
                        </Text>
                      )}
                      
                      <Group gap="lg" style={{ marginTop: 12 }}>
                        <div style={{ textAlign: "center" }}>
                          <Text size="xl" fw={700} style={{ color: "#10b981" }}>
                            {ws.activeJobs}
                          </Text>
                          <Text size="xs" style={{ color: "#94a3b8" }}>
                            Active Jobs
                          </Text>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Text size="xl" fw={700} style={{ color: "#f59e0b" }}>
                            {ws.queuedJobs}
                          </Text>
                          <Text size="xs" style={{ color: "#94a3b8" }}>
                            Queued Jobs
                          </Text>
                        </div>
                      </Group>
                    </div>
                  </Stack>
                  
                  {/* Status indicator line */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: getWorkstationStatusGradient(ws.status),
                    }}
                  />
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
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            paddingTop: "32px",
            paddingBottom: "40px",
          }}
        >
          {[
            { title: "System Health", link: "/health", icon: "💚", color: "#10b981" },
            { title: "Reports", link: "/reports", icon: "📈", color: "#3b82f6" },
            { title: "Settings", link: "/settings", icon: "⚙️", color: "#6b7280" },
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
                  gap: "10px",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  background: "rgba(30, 41, 59, 0.85)",
                  border: "1px solid rgba(51, 65, 85, 0.7)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.7)";
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.85)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.background = "rgba(51, 65, 85, 0.9)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.7)";
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.85)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={() => {
                  // Removed window.location.href to prevent router conflicts
                  // Navigation is handled by the Link component
                }}
              >
                <span style={{ fontSize: "18px" }}>{action.icon}</span>
                <Text
                  size="sm"
                  fw={500}
                  style={{ color: "#f1f5f9", fontSize: "0.95rem" }}
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
