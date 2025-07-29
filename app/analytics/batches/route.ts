import { NextRequest, NextResponse } from 'next/server';

// Simple analytics dashboard route
export async function GET(request: NextRequest) {
  const analytics = {
    message: 'Advanced Batch Analytics Dashboard',
    features: [
      'Real-time completion trends',
      'Workstation utilization metrics',
      'Priority distribution analysis',
      'Efficiency performance indicators',
      'Overdue batch alerts',
      'Completion rate tracking'
    ],
    navigation: {
      batches: '/batches',
      analytics: '/api/analytics/batches'
    }
  };

  return NextResponse.json(analytics);
}
