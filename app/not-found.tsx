"use client";

import { Title, Text, Button, Container, Group } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container size="md" style={{ textAlign: "center", paddingTop: "80px" }}>
      <Title order={1} style={{ fontSize: "4rem", color: "#1e40af", marginBottom: "16px" }}>
        404
      </Title>
      <Title order={2} style={{ marginBottom: "16px" }}>
        Page Not Found
      </Title>
      <Text size="lg" style={{ marginBottom: "32px", color: "#6b7280" }}>
        The page you are looking for does not exist.
      </Text>
      <Group justify="center">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button size="lg" variant="filled">
            Return Home
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
