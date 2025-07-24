'use client';

import React from 'react';
import { Text, Button, Card } from '@mantine/core';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card
          padding="xl"
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "12px",
            backdropFilter: "blur(12px)",
            textAlign: "center",
            margin: "20px auto",
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              fontSize: "24px",
              border: "2px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            ⚠️
          </div>
          <Text size="lg" fw={600} style={{ color: "#f87171", marginBottom: 12 }}>
            Something went wrong
          </Text>
          <Text size="md" style={{ color: "#fca5a5", marginBottom: 20 }}>
            An unexpected error occurred. Please try refreshing the page.
          </Text>
          <Button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Refresh Page
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}
