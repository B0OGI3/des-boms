"use client";

import { Title, Text, Card } from "@mantine/core";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <main style={{ padding: "40px 20px", minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title order={1} style={{ color: "#f1f5f9", fontSize: "3rem", marginBottom: 16 }}>
            ⚙️ Settings
          </Title>
          <Text size="xl" style={{ color: "#94a3b8" }}>
            System configuration and preferences
          </Text>
        </div>

        <Card
          padding="xl"
          style={{
            background: "rgba(30, 41, 59, 0.85)",
            border: "1px solid rgba(51, 65, 85, 0.7)",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(12px)",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <Text size="lg" style={{ color: "#f1f5f9", marginBottom: 20 }}>
            Settings functionality coming soon...
          </Text>
          <Text style={{ color: "#94a3b8", marginBottom: 30 }}>
            This page will contain system settings, user preferences, and configuration options.
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
      </div>
    </main>
  );
}
