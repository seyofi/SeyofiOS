import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seyofi OS - Scalable Mobility & Logistics Platform',
  description: 'Seyofi OS administrative dashboard and platform console powering MakanaGo and NileFly.',
  openGraph: {
    title: 'Seyofi OS - Scalable Mobility & Logistics Platform',
    description: 'Seyofi OS administrative dashboard and platform console powering MakanaGo and NileFly.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
