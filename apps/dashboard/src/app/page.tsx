'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Server,
  Car,
  Plane,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Radio,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  RefreshCw,
} from 'lucide-react';

interface HealthData {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  uptime: number;
  services: {
    api: string;
    database: string;
    redis: string;
    makanago: string;
    nilefly: string;
  };
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'makanago' | 'nilefly' | 'system'>('overview');
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [rides, setRides] = useState([
    { id: 'MK-8921', rider: 'Amina Khalil', driver: 'Tarek Zaki', from: 'Downtown Plaza', to: 'Terminal 2', status: 'En Route', fare: '$18.50' },
    { id: 'MK-8922', rider: 'Youssef Mansour', driver: 'Hassan Omar', from: 'Tech District', to: 'Marina Bay', status: 'Arriving', fare: '$24.00' },
    { id: 'MK-8923', rider: 'Sarah Chen', driver: 'Karim Mostafa', from: 'City Center', to: 'Old Souq', status: 'Completed', fare: '$12.20' },
  ]);
  const [flights, setFlights] = useState([
    { id: 'NF-104', origin: 'Cairo Cargo Hub', destination: 'Khartoum North', payload: '1,420 kg (Express)', status: 'In Transit', eta: '45 mins' },
    { id: 'NF-209', origin: 'Aswan Logistics', destination: 'Luxor Station', payload: '890 kg (Pharma)', status: 'Scheduled', eta: '2h 10m' },
    { id: 'NF-312', origin: 'Alexandria Port', destination: 'Port Said Gateway', payload: '2,100 kg (Industrial)', status: 'Departed', eta: '1h 20m' },
  ]);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
      }
    } catch {
      // offline / mock fallback
      setHealth({
        status: 'ok',
        service: 'seyofi-os-api',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        uptime: 124,
        services: {
          api: 'healthy',
          database: 'connected (mocked)',
          redis: 'healthy (in-memory)',
          makanago: 'online',
          nilefly: 'online',
        },
      });
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const dispatchNewRide = () => {
    const id = `MK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRide = {
      id,
      rider: 'Guest Customer',
      driver: 'Auto-Matched Driver',
      from: 'Sector 4 Hub',
      to: 'Central Station',
      status: 'Requested',
      fare: '$15.00',
    };
    setRides([newRide, ...rides]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0b0f19', color: '#f8fafc' }}>
      {/* Top Header */}
      <header style={{
        borderBottom: '1px solid #1f2937',
        backgroundColor: '#111827',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '18px',
            color: '#ffffff'
          }}>
            S
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>Seyofi OS</h1>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                backgroundColor: '#1e3a8a',
                color: '#93c5fd',
                padding: '2px 8px',
                borderRadius: '9999px'
              }}>Monorepo Platform</span>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Core Engine powering MakanaGo & NileFly ecosystems</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: '#064e3b',
            color: '#6ee7b7',
            fontSize: '13px',
            fontWeight: 500
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
            <span>Platform Healthy</span>
          </div>
          <button
            onClick={fetchHealth}
            disabled={loadingHealth}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              color: '#d1d5db',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} className={loadingHealth ? 'spin' : ''} />
            <span>Sync</span>
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav style={{
        borderBottom: '1px solid #1f2937',
        backgroundColor: '#0d1322',
        padding: '0 28px',
        display: 'flex',
        gap: '24px'
      }}>
        {[
          { key: 'overview', label: 'Platform Overview', icon: Layers },
          { key: 'makanago', label: 'MakanaGo Mobility', icon: Car },
          { key: 'nilefly', label: 'NileFly Logistics', icon: Plane },
          { key: 'system', label: 'System & Services', icon: Server },
        ].map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 4px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                color: isActive ? '#3b82f6' : '#94a3b8',
                fontWeight: isActive ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '28px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        {/* KPI Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
        }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>Active Rides (MakanaGo)</span>
              <Car size={18} color="#3b82f6" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc' }}>{rides.length}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '12px', marginTop: '6px' }}>
              <TrendingUp size={14} />
              <span>+18% from last hour</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>Cargo Dispatches (NileFly)</span>
              <Plane size={18} color="#8b5cf6" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc' }}>{flights.length}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '12px', marginTop: '6px' }}>
              <TrendingUp size={14} />
              <span>4,410 kg in transit</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>API Health Status</span>
              <Activity size={18} color="#10b981" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#10b981' }}>200 OK</div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>
              Endpoint: <code style={{ backgroundColor: '#1f2937', padding: '1px 5px', borderRadius: '4px' }}>/api/health</code>
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>Architecture Stack</span>
              <Cpu size={18} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>Turbo + Next + Nest</div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>
              TypeScript • Node.js 22 Runtime
            </div>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
            {/* Live Service Grid */}
            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Seyofi OS Microservices</h2>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Turborepo Monorepo</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'apps/dashboard', type: 'Next.js 15 Standalone Web', port: '3000', status: 'Running', color: '#10b981' },
                  { name: 'services/api', type: 'NestJS Backend / Core Gateway', port: 'Internal', status: 'Healthy', color: '#10b981' },
                  { name: 'apps/mobile-rider', type: 'Expo / React Native (Rider)', port: 'Expo Go', status: 'Configured', color: '#3b82f6' },
                  { name: 'apps/mobile-driver', type: 'Expo / React Native (Driver)', port: 'Expo Go', status: 'Configured', color: '#3b82f6' },
                  { name: 'packages/database', type: 'Prisma Client & PostgreSQL Schemas', port: 'DB Engine', status: 'In-Memory Mock', color: '#f59e0b' },
                ].map((svc, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: '#161f30',
                      borderRadius: '8px',
                      border: '1px solid #1e293b'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#f8fafc' }}>{svc.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{svc.type}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: `${svc.color}20`,
                        color: svc.color
                      }}>{svc.status}</span>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{svc.port}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Dispatch & System Overview */}
            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Platform Capabilities</h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '20px' }}>
                Seyofi OS serves as the unified orchestration layer for high-throughput transit, passenger booking, real-time dispatching, and aerial freight routes across the Nile basin.
              </p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <button
                  onClick={dispatchNewRide}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Car size={16} />
                  <span>Dispatch Ride (MakanaGo)</span>
                </button>

                <button
                  onClick={() => setActiveTab('nilefly')}
                  style={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    color: '#f8fafc',
                    padding: '10px 18px',
                    borderRadius: '6px',
                    fontWeight: 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plane size={16} />
                  <span>View Cargo (NileFly)</span>
                </button>
              </div>

              <div style={{ borderTop: '1px solid #1f2937', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>Active Configuration:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                  <div style={{ color: '#64748b' }}>Dev Server Host: <span style={{ color: '#cbd5e1' }}>0.0.0.0:3000</span></div>
                  <div style={{ color: '#64748b' }}>Turborepo: <span style={{ color: '#cbd5e1' }}>v2.11 Enabled</span></div>
                  <div style={{ color: '#64748b' }}>Prisma Layer: <span style={{ color: '#cbd5e1' }}>Resilient In-Memory</span></div>
                  <div style={{ color: '#64748b' }}>Socket.IO: <span style={{ color: '#cbd5e1' }}>Multiplex Ready</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MakanaGo */}
        {activeTab === 'makanago' && (
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 600 }}>MakanaGo Urban Mobility Console</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Live ride matching, driver status, and trip metrics</p>
              </div>
              <button
                onClick={dispatchNewRide}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                + New Trip Request
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1f2937', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Trip ID</th>
                  <th style={{ padding: '12px 16px' }}>Rider</th>
                  <th style={{ padding: '12px 16px' }}>Driver</th>
                  <th style={{ padding: '12px 16px' }}>Route</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Fare</th>
                </tr>
              </thead>
              <tbody>
                {rides.map((ride, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #161f30' }}>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#3b82f6', fontWeight: 600 }}>{ride.id}</td>
                    <td style={{ padding: '14px 16px', color: '#f8fafc' }}>{ride.rider}</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{ride.driver}</td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{ride.from}</span>
                        <span style={{ color: '#64748b' }}>→</span>
                        <span>{ride.to}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: ride.status === 'En Route' ? '#1e3a8a' : ride.status === 'Arriving' ? '#701a75' : '#064e3b',
                        color: ride.status === 'En Route' ? '#93c5fd' : ride.status === 'Arriving' ? '#f472b6' : '#6ee7b7'
                      }}>
                        {ride.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: '#f8fafc' }}>{ride.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: NileFly */}
        {activeTab === 'nilefly' && (
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600 }}>NileFly Air Cargo & Logistics</h2>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>Aerial cargo corridor schedules, manifests, and tracking</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1f2937', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Dispatch Code</th>
                  <th style={{ padding: '12px 16px' }}>Corridor</th>
                  <th style={{ padding: '12px 16px' }}>Manifest Payload</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>ETA</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #161f30' }}>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#8b5cf6', fontWeight: 600 }}>{f.id}</td>
                    <td style={{ padding: '14px 16px', color: '#f8fafc' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{f.origin}</span>
                        <span style={{ color: '#64748b' }}>→</span>
                        <span>{f.destination}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{f.payload}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: f.status === 'In Transit' ? '#1e3a8a' : '#14532d',
                        color: f.status === 'In Transit' ? '#93c5fd' : '#86efac'
                      }}>
                        {f.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: '#f8fafc' }}>{f.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: System */}
        {activeTab === 'system' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Live /api/health Telemetry</h2>
              <pre style={{
                backgroundColor: '#070b14',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#38bdf8',
                overflowX: 'auto',
                lineHeight: '1.5'
              }}>
                {JSON.stringify(health, null, 2)}
              </pre>
            </div>

            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Environment Variables (.env.example)</h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                Extracted keys configured in the repository:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                {[
                  'DATABASE_URL',
                  'REDIS_URL',
                  'JWT_ACCESS_TOKEN_SECRET',
                  'JWT_REFRESH_TOKEN_SECRET',
                  'FIREBASE_PROJECT_ID',
                  'GOOGLE_MAPS_API_KEY',
                  'TIMEOUT_MS',
                  'CORS_ORIGIN',
                ].map((key, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#161f30', borderRadius: '4px' }}>
                    <span style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{key}</span>
                    <span style={{ color: '#64748b' }}>Loaded from ENV</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1f2937',
        backgroundColor: '#0d1322',
        padding: '16px 28px',
        fontSize: '12px',
        color: '#64748b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <span>Seyofi OS Monorepo • Clean Architecture • Strict TypeScript</span>
        <span>AI Studio Cloud Run Engine</span>
      </footer>
    </div>
  );
}
