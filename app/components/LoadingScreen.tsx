'use client';

import { Title, Text, Progress } from '@mantine/core';

interface LoadingScreenProps {
  readonly title?: string;
  readonly description?: string;
  readonly icon?: string;
  readonly pageInitialization?: Record<string, boolean>;
  readonly progress?: number;
}

export function LoadingScreen({ 
  title = "Loading System", 
  description = "Initializing components...", 
  icon = "📊",
  pageInitialization,
  progress
}: LoadingScreenProps) {
  // Calculate progress from pageInitialization if provided
  let calculatedProgress = progress;
  if (pageInitialization && !progress) {
    const completedTasks = Object.values(pageInitialization).filter(Boolean).length;
    const totalTasks = Object.keys(pageInitialization).length;
    calculatedProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))',
      color: '#cbd5e1'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ marginBottom: '24px', fontSize: '3rem' }}>{icon}</div>
        <Title order={2} style={{ marginBottom: '16px', fontWeight: 700 }}>
          {title}
        </Title>
        <Text style={{ marginBottom: '32px', opacity: 0.8, fontSize: '1.1rem' }}>
          {description}
        </Text>
        
        {calculatedProgress !== undefined && (
          <>
            <Progress 
              value={calculatedProgress} 
              size="lg" 
              radius="xl" 
              style={{ marginBottom: '20px' }} 
            />
            <Text style={{ fontSize: '0.95rem', opacity: 0.6 }}>
              {Math.round(calculatedProgress)}% complete
            </Text>
          </>
        )}

        {pageInitialization && (
          <Text style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '12px' }}>
            {Object.values(pageInitialization).filter(Boolean).length} of {Object.keys(pageInitialization).length} components ready
          </Text>
        )}
      </div>
    </div>
  );
}
