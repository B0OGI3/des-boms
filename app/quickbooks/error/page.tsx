'use client';

/**
 * QuickBooks OAuth Error Page
 * 
 * Displays error information when QuickBooks OAuth fails.
 */

import { useSearchParams } from 'next/navigation';
import { Card, Text, Title, Stack, Alert, Button, Group, Container } from '@mantine/core';
import { IconX, IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';

export default function QuickBooksErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'access_denied':
        return 'You denied access to QuickBooks. Please try again and accept the permissions to sync customer data.';
      case 'missing_parameters':
        return 'Missing required parameters from QuickBooks. This might be a configuration issue.';
      case 'oauth_failed':
        return 'Failed to complete the OAuth process. Please check your QuickBooks app configuration.';
      default:
        return `An error occurred during QuickBooks authorization: ${errorCode || 'Unknown error'}`;
    }
  };

  const getRetryInstructions = (errorCode: string | null) => {
    switch (errorCode) {
      case 'access_denied':
        return 'Click "Try Again" and make sure to accept all permissions when prompted by QuickBooks.';
      case 'missing_parameters':
      case 'oauth_failed':
        return 'Please check your QuickBooks Developer App configuration and try again.';
      default:
        return 'Please try the authorization process again. If the problem persists, check your QuickBooks app settings.';
    }
  };

  return (
    <Container size="md" style={{ marginTop: 40 }}>
      <Stack gap="lg">
        <Card withBorder style={{ textAlign: 'center' }}>
          <Stack gap="md">
            <IconX size={48} color="red" style={{ margin: '0 auto' }} />
            <Title order={2} style={{ color: 'red' }}>
              QuickBooks Connection Failed
            </Title>
            <Text size="lg">
              We couldn't connect your DES-BOMS application to QuickBooks.
            </Text>
          </Stack>
        </Card>

        <Alert color="red" title="Error Details">
          <Stack gap="md">
            <Text>
              <strong>Error:</strong> {getErrorMessage(error)}
            </Text>
            <Text>
              <strong>Solution:</strong> {getRetryInstructions(error)}
            </Text>
          </Stack>
        </Alert>

        <Alert color="blue" title="Troubleshooting">
          <Stack gap="xs">
            <Text>• Make sure your QuickBooks Developer App is properly configured</Text>
            <Text>• Verify that the redirect URI matches your app settings</Text>
            <Text>• Ensure you have a QuickBooks Online account (not Desktop)</Text>
            <Text>• Check that your app has the correct scopes enabled</Text>
          </Stack>
        </Alert>

        <Group justify="center" mt="xl">
          <Link href="/api/quickbooks/auth">
            <Button size="lg" leftSection={<IconRefresh size={20} />} variant="filled">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Back to Dashboard
            </Button>
          </Link>
        </Group>
      </Stack>
    </Container>
  );
}
