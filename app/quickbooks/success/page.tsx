'use client';

/**
 * QuickBooks OAuth Success Page
 * 
 * Displays the OAuth tokens that need to be added to environment variables.
 * In production, these would be stored securely in the database.
 */

import { useSearchParams } from 'next/navigation';
import { Card, Text, Title, Stack, Code, Alert, Button, Group, Container } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuickBooksSuccessPage() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const [copied, setCopied] = useState(false);

  // Notify parent window that OAuth is complete
  useEffect(() => {
    if (companyId && accessToken) {
      // Try to notify the parent window (works for both localhost and ngrok)
      try {
        if (window.opener) {
          // Try both localhost and ngrok origins
          const origins = [
            'http://localhost:3000',
            'https://localhost:3000', 
            'https://noticeably-full-llama.ngrok-free.app'
          ];
          
          const message = {
            type: 'quickbooks-oauth-complete',
            success: true,
            data: { companyId, accessToken, refreshToken }
          };
          
          // Post to all possible origins
          origins.forEach(origin => {
            try {
              window.opener.postMessage(message, origin);
            } catch (err) {
              console.log(`Could not post to ${origin}:`, err);
            }
          });
          
          // Auto-close this window after a short delay
          setTimeout(() => {
            window.close();
          }, 3000);
        }
      } catch (error) {
        console.log('Could not notify parent window:', error);
      }
    }
  }, [companyId, accessToken, refreshToken]);

  const handleCopyToClipboard = () => {
    const envText = `QB_ACCESS_TOKEN="${accessToken}"
QB_COMPANY_ID="${companyId}"` + (refreshToken ? `\nQB_REFRESH_TOKEN="${refreshToken}"` : '');
    
    navigator.clipboard.writeText(envText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCommand = () => {
    const command = `node update-qb-tokens.js "${accessToken}" "${companyId}"` + (refreshToken ? ` "${refreshToken}"` : '');
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container size="md" style={{ marginTop: 40 }}>
      <Stack gap="lg">
        <Card withBorder style={{ textAlign: 'center' }}>
          <Stack gap="md">
            <IconCheck size={48} color="green" style={{ margin: '0 auto' }} />
            <Title order={2} style={{ color: 'green' }}>
              QuickBooks Connection Successful!
            </Title>
            <Text size="lg">
              Your DES-BOMS application is now connected to QuickBooks Online.
            </Text>
          </Stack>
        </Card>

        <Alert color="blue" title="Next Steps - Add Tokens to Environment">
          <Stack gap="md">
            <Text>
              Copy the following values and add them to your <Code>.env</Code> file to complete the integration:
            </Text>
            
            <Card withBorder style={{ backgroundColor: '#f8f9fa' }}>
              <Stack gap="xs">
                <Text fw={500}>Environment Variables:</Text>
                <Code block style={{ padding: '12px', fontSize: '14px' }}>
                  QB_ACCESS_TOKEN=&quot;{accessToken}&quot;<br/>
                  QB_COMPANY_ID=&quot;{companyId}&quot;{refreshToken && (
                    <>
                      <br/>
                      QB_REFRESH_TOKEN=&quot;{refreshToken}&quot;
                    </>
                  )}
                </Code>
                
                <Group justify="center" mt="md">
                  <Button 
                    leftSection={<IconCopy size={16} />}
                    onClick={handleCopyToClipboard}
                    variant={copied ? 'filled' : 'outline'}
                    color={copied ? 'green' : 'blue'}
                  >
                    {copied ? 'Copied!' : 'Copy Environment Variables'}
                  </Button>
                  <Button 
                    leftSection={<IconCopy size={16} />}
                    onClick={handleCopyCommand}
                    variant="outline"
                    color="gray"
                  >
                    Copy Update Command
                  </Button>
                </Group>
              </Stack>
            </Card>

            <Alert color="orange" title="Quick Update Option">
              <Text size="sm">
                You can also use our helper script to automatically update your .env.local file:
              </Text>
              <Code block style={{ padding: '8px', fontSize: '12px', marginTop: '8px' }}>
                node update-qb-tokens.js &quot;{accessToken}&quot; &quot;{companyId}&quot;{refreshToken && ` "${refreshToken}"`}
              </Code>
            </Alert>

            {refreshToken && (
              <Card withBorder style={{ backgroundColor: '#fff3cd' }}>
                <Text fw={500} mb="xs">Refresh Token (backup):</Text>
                <Code block style={{ padding: '8px', fontSize: '12px', wordBreak: 'break-all' }}>
                  {refreshToken}
                </Code>
              </Card>
            )}
          </Stack>
        </Alert>

        <Alert color="green" title="What happens next?">
          <Stack gap="xs">
            <Text>• Customer data will now sync automatically between DES-BOMS and QuickBooks</Text>
            <Text>• New customers created in your orders will appear in QuickBooks</Text>
            <Text>• Changes made in QuickBooks will be reflected in your system</Text>
            <Text>• You can view sync status in your customer management interface</Text>
          </Stack>
        </Alert>

        <Group justify="center" mt="xl">
          <Link href="/orders">
            <Button size="lg" variant="filled">
              Go to Orders & Test Integration
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
