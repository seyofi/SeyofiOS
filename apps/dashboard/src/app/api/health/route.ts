import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'seyofi-os-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      api: 'healthy',
      database: 'connected (mocked)',
      redis: 'healthy (in-memory)',
      makanago: 'online',
      nilefly: 'online',
    },
  });
}
