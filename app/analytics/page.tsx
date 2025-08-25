'use client';

import React from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  Group,
  Button,
} from '@mantine/core';
import {
  IconChartBar,
  IconTrendingUp,
  IconFileAnalytics,
  IconDashboard,
} from '@tabler/icons-react';
import { usePageInitialization } from '../../hooks/usePageInitialization';
import Link from 'next/link';

export default function AnalyticsPage() {
  const { isPageReady } = usePageInitialization();

  if (!isPageReady) {
    return (
      <Container size='xl' style={{ marginTop: 40 }}>
        <div>Loading analytics dashboard...</div>
      </Container>
    );
  }

  const analyticsFeatures = [
    {
      title: 'Real-time Completion Trends',
      description: 'Track batch completion rates and identify bottlenecks',
      icon: <IconTrendingUp size={24} />,
      color: 'blue',
      link: '/batches',
    },
    {
      title: 'Workstation Utilization',
      description: 'Monitor equipment efficiency and capacity planning',
      icon: <IconChartBar size={24} />,
      color: 'green',
      link: '/workstations',
    },
    {
      title: 'Priority Distribution',
      description: 'Analyze order priorities and resource allocation',
      icon: <IconFileAnalytics size={24} />,
      color: 'orange',
      link: '/orders',
    },
    {
      title: 'Performance Metrics',
      description: 'Comprehensive KPIs and efficiency indicators',
      icon: <IconDashboard size={24} />,
      color: 'purple',
      link: '/reports',
    },
  ];

  return (
    <Container size='xl' style={{ marginTop: 40 }}>
      <Stack gap='xl'>
        {/* Page Header */}
        <div style={{ textAlign: 'center' }}>
          <Title order={1} style={{ marginBottom: 16 }}>
            Analytics Dashboard
          </Title>
          <Text
            size='lg'
            style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}
          >
            Comprehensive insights into your manufacturing operations, batch
            performance, and operational efficiency
          </Text>
        </div>

        {/* Analytics Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {analyticsFeatures.map(feature => (
            <Card key={feature.title} padding='xl' shadow='sm' radius='md'>
              <Stack gap='md'>
                <Group>
                  <div
                    style={{ color: `var(--mantine-color-${feature.color}-6)` }}
                  >
                    {feature.icon}
                  </div>
                  <Title order={3}>{feature.title}</Title>
                </Group>

                <Text size='sm' style={{ color: '#666' }}>
                  {feature.description}
                </Text>

                <Link href={feature.link} style={{ textDecoration: 'none' }}>
                  <Button variant='light' color={feature.color} fullWidth>
                    View Details
                  </Button>
                </Link>
              </Stack>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card padding='xl' shadow='sm' radius='md'>
          <Title order={2} style={{ marginBottom: 24 }}>
            Quick Statistics
          </Title>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Text
                size='xl'
                fw={700}
                style={{ color: 'var(--mantine-color-blue-6)' }}
              >
                24
              </Text>
              <Text size='sm' style={{ color: '#666' }}>
                Active Batches
              </Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text
                size='xl'
                fw={700}
                style={{ color: 'var(--mantine-color-green-6)' }}
              >
                87%
              </Text>
              <Text size='sm' style={{ color: '#666' }}>
                On-Time Completion
              </Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text
                size='xl'
                fw={700}
                style={{ color: 'var(--mantine-color-orange-6)' }}
              >
                12
              </Text>
              <Text size='sm' style={{ color: '#666' }}>
                Pending Orders
              </Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text
                size='xl'
                fw={700}
                style={{ color: 'var(--mantine-color-purple-6)' }}
              >
                95%
              </Text>
              <Text size='sm' style={{ color: '#666' }}>
                Equipment Utilization
              </Text>
            </div>
          </div>
        </Card>

        {/* Navigation Links */}
        <Card padding='xl' shadow='sm' radius='md'>
          <Title order={2} style={{ marginBottom: 24 }}>
            Quick Navigation
          </Title>
          <Group gap='md'>
            <Link href='/batches' style={{ textDecoration: 'none' }}>
              <Button variant='filled' color='blue'>
                View All Batches
              </Button>
            </Link>
            <Link href='/orders' style={{ textDecoration: 'none' }}>
              <Button variant='outline' color='green'>
                Manage Orders
              </Button>
            </Link>
            <Link href='/reports' style={{ textDecoration: 'none' }}>
              <Button variant='outline' color='purple'>
                Generate Reports
              </Button>
            </Link>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}
