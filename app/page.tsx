/**
 * DES-BOMS Homepage Component
 * 
 * Main landing page for the Batch Order Management System.
 * Provides an overview of manufacturing order management, batch routing, 
 * workstation confirmations, and inspection processes.
 */

"use client";

import { Title, Text, Card } from "@mantine/core";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Quick Actions Header */}
      <header
        style={{
          width: "100%",
          background: "rgba(24, 24, 27, 0.95)",
          borderBottom: "1px solid #374151",
          padding: "16px 20px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Text
              fw={700}
              size="xl"
              style={{ color: "#f3f4f6" }}
            >
              DES-BOMS
            </Text>
            <Text
              size="sm"
              style={{ color: "#9ca3af" }}
            >
              Manufacturing Operations
            </Text>
          </div>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {[
              {
                title: "New Order",
                link: "/orders/new",
                icon: "➕",
              },
              {
                title: "Dashboard",
                link: "/dashboard",
                icon: "📊",
              },
              {
                title: "Alerts",
                link: "/alerts",
                icon: "🚨",
              },
            ].map((action) => (
              <Link
                href={action.link}
                key={action.title}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    background: "rgba(55, 65, 81, 0.5)",
                    border: "1px solid rgba(75, 85, 99, 0.5)",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(75, 85, 99, 0.7)";
                    e.currentTarget.style.borderColor = "rgba(156, 163, 175, 0.6)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(55, 65, 81, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(75, 85, 99, 0.5)";
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{action.icon}</span>
                  <Text
                    size="sm"
                    fw={500}
                    style={{
                      color: "#d1d5db",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {action.title}
                  </Text>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "linear-gradient(120deg, #18181b 0%, #27272a 100%)",
          padding: "48px 12px 24px 12px",
          color: "#f3f4f6",
        }}
      >
      <div
        style={{
          maxWidth: 700,
          width: "100%",
          margin: "0 auto 32px auto",
          textAlign: "center",
        }}
      >
        <Title
          order={1}
          style={{
            fontWeight: 900,
            letterSpacing: -1.5,
            color: "#f3f4f6",
            fontSize: 38,
            marginBottom: 8,
          }}
        >
          Manufacturing Dashboard
        </Title>
        <Text
          size="md"
          c="dimmed"
          style={{ marginBottom: 0, color: "#a1a1aa" }}
        >
          Complete visibility into your batch order management workflow
        </Text>
      </div>

      {/* Primary Navigation Cards */}
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          paddingBottom: 8,
        }}
      >
        {[
          {
            title: "Customer Orders",
            link: "/orders",
            description: "Manage customer purchase orders, line items, and due dates.",
            color: "blue",
            icon: "📋",
          },
          {
            title: "Batch Routing",
            link: "/batches",
            description: "Track batch progress through manufacturing workstations.",
            color: "teal",
            icon: "🔄",
          },
          {
            title: "Shop Floor",
            link: "/workstations",
            description: "Operator confirmations and real-time workstation status.",
            color: "green",
            icon: "🏭",
          },
          {
            title: "Quality Control",
            link: "/inspection",
            description: "Inspection records and quality control management.",
            color: "orange",
            icon: "✅",
          },
        ].map((section) => (
          <Link
            href={section.link}
            key={section.title}
            style={{ textDecoration: "none" }}
          >
            <Card
              shadow="md"
              p="lg"
              radius="md"
              withBorder
              style={{
                width: "100%",
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                background:
                  "linear-gradient(135deg, #27272a 80%, #18181b 100%)",
                border: `1px solid var(--mantine-color-${section.color}-8, #27272a)`,
                borderTop: `4px solid var(--mantine-color-${section.color}-5, #818cf8)`,
                boxShadow: "0 4px 16px 0 rgba(0,0,0,0.25)",
                margin: "0",
                padding: "20px 16px",
                transition: "box-shadow 0.18s, transform 0.18s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px 0 rgba(0,0,0,0.35)";
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.02)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 16px 0 rgba(0,0,0,0.25)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: 8 }}>
                <span style={{ fontSize: "24px" }}>{section.icon}</span>
                <Text
                  fw={700}
                  size="lg"
                  style={{
                    color: `var(--mantine-color-${section.color}-3, #a5b4fc)`,
                  }}
                >
                  {section.title}
                </Text>
              </div>
              <Text
                size="sm"
                c="dimmed"
                style={{ color: "#a1a1aa", lineHeight: 1.4 }}
              >
                {section.description}
              </Text>
            </Card>
          </Link>
        ))}
      </div>

      {/* Secondary Actions */}
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          margin: "24px auto 0 auto",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {[
          { title: "Active Batches", link: "/batches/active", icon: "⚡" },
          { title: "Reports", link: "/reports", icon: "📈" },
          { title: "Settings", link: "/settings", icon: "⚙️" },
        ].map((action) => (
          <Link
            href={action.link}
            key={action.title}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                borderRadius: "8px",
                background: "rgba(39, 39, 42, 0.6)",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(55, 65, 81, 0.8)";
                e.currentTarget.style.borderColor = "rgba(156, 163, 175, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(39, 39, 42, 0.6)";
                e.currentTarget.style.borderColor = "rgba(75, 85, 99, 0.3)";
              }}
            >
              <span style={{ fontSize: "16px" }}>{action.icon}</span>
              <Text
                size="sm"
                fw={500}
                style={{ color: "#d1d5db" }}
              >
                {action.title}
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </main>
    </>
  );
}
