/**
 * DES-BOMS Homepage Component
 * 
 * Main landing page for the Business Operations Management System.
 * Provides an overview of the system capabilities and navigation to key features.
 */

"use client";

import { Title, Text, Card } from "@mantine/core";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
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
          DES-BOMS
        </Title>
        <Text
          size="md"
          c="dimmed"
          style={{ marginBottom: 0, color: "#a1a1aa" }}
        >
          Centralized inventory & batch management
        </Text>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          gap: 16,
          justifyContent: "space-between",
          paddingBottom: 8,
        }}
      >
        {[
          {
            title: "Inventory",
            link: "/inventory",
            description: "View and manage all items.",
            color: "indigo",
          },
          {
            title: "Batches",
            link: "/batches",
            description: "Track batch usage and delivery.",
            color: "teal",
          },
          {
            title: "Locations",
            link: "/locations",
            description: "Manage where items are stored.",
            color: "cyan",
          },
          {
            title: "Settings",
            link: "/settings",
            description: "Configure roles, permissions, and defaults.",
            color: "orange",
          },
        ].map((section) => (
          <Link
            href={section.link}
            key={section.title}
            style={{ textDecoration: "none", width: "22%" }}
          >
            <Card
              shadow="md"
              p="lg"
              radius="md"
              withBorder
              style={{
                width: "100%",
                minHeight: 110,
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
                padding: "18px 14px",
                transition: "box-shadow 0.18s, transform 0.18s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px 0 rgba(0,0,0,0.35)";
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 16px 0 rgba(0,0,0,0.25)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <Text
                fw={700}
                size="lg"
                style={{
                  color: `var(--mantine-color-${section.color}-3, #a5b4fc)`,
                  marginBottom: 6,
                }}
              >
                {section.title}
              </Text>
              <Text
                size="sm"
                c="dimmed"
                mb={10}
                style={{ minHeight: 36, color: "#a1a1aa" }}
              >
                {section.description}
              </Text>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
