"use client";

import { Title, Text, Card, Stack, Group } from "@mantine/core";
import Link from "next/link";
import { QuickBooksStatus } from "../components/ui/QuickBooksStatus";
import { QuickBooksCustomerSync } from "../components/ui/QuickBooksCustomerSync";
import { LoadingScreen } from "../components/LoadingScreen";
import { usePageInitialization } from "../../hooks/usePageInitialization";
import { PageLayout, PageHeader } from "../components/ui/StyledComponents";
import theme from "../theme";

export default function SettingsPage() {
  const { isPageReady, pageInitialization, getProgress } = usePageInitialization({
    initialTasks: ['settings', 'quickbooks'],
    autoStart: true
  });

  if (!isPageReady) {
    return <LoadingScreen 
      title="Loading Settings"
      description="Initializing system configuration..."
      icon="⚙️"
      pageInitialization={pageInitialization}
      progress={getProgress()}
    />;
  }
  
  return (
    <PageLayout>
      <PageHeader
        title="Settings"
        subtitle="System configuration and preferences"
        icon="⚙️"
        accentColor={theme.pageAccents.settings}
      />

        <Stack gap="lg">
          {/* QuickBooks Integration Section */}
          <Card
            padding="xl"
            style={{
              background: theme.colors.cardPrimary,
              border: `1px solid ${theme.colors.borderPrimary}`,
              borderRadius: theme.borderRadius.xl,
              boxShadow: theme.shadows.lg,
              backdropFilter: "blur(12px)",
            }}
          >
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <div>
                  <Title order={3} style={{ color: "#f1f5f9", marginBottom: 8 }}>
                    QuickBooks Integration
                  </Title>
                  <Text style={{ color: "#94a3b8" }}>
                    Manage customer data synchronization with QuickBooks Online
                  </Text>
                </div>
              </Group>
              
              <QuickBooksStatus 
                compact={false}
                showActions={true}
                onConnectionChange={(connected) => {
                  if (connected) {
                    console.log('QuickBooks connected successfully');
                  }
                }}
              />
              
              {/* Customer Sync Controls */}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(51, 65, 85, 0.3)' }}>
                <Text size="sm" style={{ color: "#e2e8f0", marginBottom: 12, fontWeight: 500 }}>
                  Customer Data Synchronization
                </Text>
                <QuickBooksCustomerSync 
                  onSyncComplete={(result) => {
                    console.log('Sync completed:', result);
                    // Could show a notification here
                  }}
                />
              </div>
            </Stack>
          </Card>

          {/* General Settings Section */}
          <Card
            padding="xl"
            style={{
              background: "rgba(30, 41, 59, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Text size="lg" style={{ color: "#f1f5f9", marginBottom: 20 }}>
              Additional Settings
            </Text>
            <Text style={{ color: "#94a3b8", marginBottom: 30 }}>
              More system settings, user preferences, and configuration options coming soon...
            </Text>
            
            <Link href="/" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                ← Back to Dashboard
              </button>
            </Link>
          </Card>
        </Stack>
    </PageLayout>
  );
}
