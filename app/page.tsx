/**
 * DES-BOMS Homepage Component
 * 
 * Main landing page for the Batch Order Management System.
 * Provides an overview of manufacturing order management, batch routing, 
 * workstation confirmations, and inspection processes.
 */

"use client";

import { Title, Text, Card, Badge, Group, Stack, Alert } from "@mantine/core";
import { useEffect, useState } from "react";
import { 
  PageLayout, 
  PageHeader, 
  LoadingState, 
  ErrorState, 
  StatsGrid, 
  StatCard, 
  NavigationCard 
} from "./components/ui";
import theme from "./theme";

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
    <PageLayout>
      <PageHeader
        title="DES-BOMS"
        subtitle="Batch Order Management System"
        icon="🏭"
        accentColor={theme.pageAccents.home}
      >
        <Text
          size="md"
          style={{
            color: theme.colors.textMuted,
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: theme.typography.lineHeightNormal,
            textAlign: 'center',
          }}
        >
          Manufacturing order management with real-time tracking and quality control.
        </Text>
      </PageHeader>

      {/* Primary Navigation Cards */}
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto 48px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: theme.spacing.lg,
        }}
      >
        <NavigationCard
          title="Customer Orders"
          description="Manage customer purchase orders, line items, and due dates."
          icon="📋"
          href="/orders"
          color={theme.pageAccents.orders}
          size="large"
        />
        <NavigationCard
          title="Batch Routing"
          description="Track batch progress through manufacturing workstations."
          icon="🔄"
          href="/batches"
          color={theme.pageAccents.batches}
          size="large"
        />
        <NavigationCard
          title="Shop Floor"
          description="Real-time workstation status and operator confirmations."
          icon="🏭"
          href="/workstations"
          color={theme.pageAccents.workstations}
          size="large"
        />
        <NavigationCard
          title="Quality Control"
          description="Inspection workflows and quality management."
          icon="🔍"
          href="/qc"
          color={theme.pageAccents.qc}
          size="large"
        />
      </div>

      {/* Secondary Navigation - Reports & Settings */}
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto 48px auto",
          display: "flex",
          justifyContent: "center",
          gap: theme.spacing.lg,
          flexWrap: "wrap",
        }}
      >
        <NavigationCard
          title="Reports"
          description="Analytics and production reports"
          icon="�"
          href="/reports"
          color={theme.pageAccents.reports}
          size="small"
        />
        <NavigationCard
          title="System Health"
          description="Monitor system status"
          icon="💚"
          href="/health"
          color={theme.pageAccents.workstations}
          size="small"
        />
        <NavigationCard
          title="Settings"
          description="System configuration"
          icon="⚙️"
          href="/settings"
          color={theme.pageAccents.settings}
          size="small"
        />
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
          <LoadingState
            title="Loading manufacturing data..."
            description="Connecting to production systems"
            icon="🏭"
          />
        )}

        {/* Error State */}
        {error && (
          <ErrorState
            title="Connection Error"
            message={error}
          />
        )}

        {/* Real-time Statistics */}
        {dashboardData && (
          <>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Title
                order={2}
                style={{ 
                  color: theme.colors.textPrimary, 
                  marginBottom: 8, 
                  fontSize: theme.typography.fontSize2xl,
                  fontWeight: theme.typography.fontWeightSemiBold,
                }}
              >
                Production Overview
              </Title>
              <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.fontSizeMd }}>
                Real-time metrics • Updates every 30 seconds
              </Text>
            </div>
            
            <StatsGrid>
              <StatCard
                title="Active Batches"
                value={dashboardData.overview.activeBatches}
                icon="⚡"
                color={theme.colors.primary}
                trendValue={`${Math.round((dashboardData.overview.activeBatches / dashboardData.overview.totalBatches) * 100)}%`}
                trend="neutral"
              />
              <StatCard
                title="Rush Orders"
                value={dashboardData.overview.rushOrders}
                icon="🚨"
                color={theme.colors.error}
                trendValue={`${Math.round((dashboardData.overview.rushOrders / dashboardData.overview.totalOrders) * 100)}%`}
                trend="up"
              />
              <StatCard
                title="Pending QC"
                value={dashboardData.overview.pendingQC}
                icon="🔍"
                color={theme.colors.warning}
                trendValue={`${Math.round((dashboardData.overview.pendingQC / dashboardData.overview.totalBatches) * 100)}%`}
                trend="neutral"
              />
              <StatCard
                title="Active Stations"
                value={dashboardData.workstationEfficiency.filter(w => w.status === 'ACTIVE').length}
                icon="🏭"
                color={theme.colors.success}
                trendValue={`${Math.round((dashboardData.workstationEfficiency.filter(w => w.status === 'ACTIVE').length / dashboardData.overview.totalWorkstations) * 100)}%`}
                trend="up"
              />
            </StatsGrid>
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

    </PageLayout>
  );
}
