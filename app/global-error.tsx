'use client';

import React, { useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Stack,
  Alert,
  Container,
} from '@mantine/core';
import { IconAlertTriangle, IconRefresh, IconHome } from '@tabler/icons-react';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught in root layout:', error);
  }, [error]);

  return (
    <html>
      <body>
        <Container size='md' style={{ marginTop: 40 }}>
          <Card
            padding='xl'
            style={{
              background:
                'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              textAlign: 'center',
            }}
          >
            <Stack gap='lg' align='center'>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                }}
              >
                <IconAlertTriangle size={40} color='#ef4444' />
              </div>

              <Title order={1} style={{ color: '#ef4444' }}>
                Critical Error
              </Title>

              <Text size='lg' style={{ color: '#fca5a5', maxWidth: '600px' }}>
                A critical error occurred in the application. Please try
                refreshing the page or contact support if the problem persists.
              </Text>

              {error.digest && (
                <Alert
                  title='Error Reference'
                  color='red'
                  variant='light'
                  style={{ maxWidth: '500px' }}
                >
                  <Text size='sm'>Error ID: {error.digest}</Text>
                </Alert>
              )}

              <Stack gap='sm' style={{ marginTop: '20px' }}>
                <Button
                  leftSection={<IconRefresh size={16} />}
                  onClick={reset}
                  size='lg'
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                  }}
                >
                  Try Again
                </Button>

                <Link href='/' style={{ textDecoration: 'none' }}>
                  <Button
                    variant='subtle'
                    leftSection={<IconHome size={16} />}
                    size='md'
                    style={{ color: '#fca5a5' }}
                  >
                    Go Home
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Card>
        </Container>
      </body>
    </html>
  );
}
