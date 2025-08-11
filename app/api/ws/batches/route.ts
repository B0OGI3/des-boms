import { NextRequest, NextResponse } from 'next/server';

// Server-Sent Events implementation for real-time updates - PERMANENTLY DISABLED

// Simple WebSocket-like endpoint for batch updates
export async function GET() {
  // Return 404 to stop browser from retrying
  return new Response('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export async function POST(request: NextRequest) {
  const { batchId, status, priority, type } = await request.json();

  // Mock broadcasting update to all connected clients
  const update = {
    type,
    batchId,
    status,
    priority,
    timestamp: new Date().toISOString()
  };

  // In a real implementation, you'd broadcast this to WebSocket clients
  console.log('Broadcasting batch update:', update);

  return NextResponse.json({ success: true, update });
}
