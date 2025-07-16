// app/page.tsx
'use client';

import { Title, Text, Grid, Card, Group, Button } from '@mantine/core';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <Title order={1}>Welcome to DES-BOMS</Title>
      <Text size="lg" mt="sm" mb="xl">
        Your centralized inventory and batch management system.
      </Text>

      <Grid gutter="md">
        {[
          { title: 'Inventory', link: '/inventory', description: 'View and manage all items.' },
          { title: 'Batches', link: '/batches', description: 'Track batch usage and delivery.' },
          { title: 'Locations', link: '/locations', description: 'Manage where items are stored.' },
          { title: 'Settings', link: '/settings', description: 'Configure roles, permissions, and defaults.' },
        ].map((section) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={section.title}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>{section.title}</Text>
              </Group>
              <Text size="sm" c="dimmed">
                {section.description}
              </Text>
              <Button component={Link} href={section.link} fullWidth mt="md" variant="light">
                Go
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </main>
  );
}
