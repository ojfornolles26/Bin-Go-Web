'use client';

import { usePathname } from 'next/navigation';

const titleMap: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Dashboard Overview',
    subtitle: 'Real-time waste management & dispatch control',
  },
  '/crud': {
    title: 'React + Supabase CRUD Module',
    subtitle: 'Make It Real: Create, Read, Update, Delete records',
  },
  '/live-map': {
    title: 'Live Incident Map',
    subtitle: 'Barangay Metro Cebu illegal dumping & collection tracking',
  },
  '/tickets': {
    title: 'Sanitation Tickets',
    subtitle: 'Community reports, triage & assignment directory',
  },
  '/analytics': {
    title: 'Analytics & Reports',
    subtitle: 'Response times, collection trends & barangay metrics',
  },
  '/notifications': {
    title: 'System Notifications',
    subtitle: 'Real-time alert log & emergency dispatch activity',
  },
  '/settings': {
    title: 'System Settings',
    subtitle: 'Administrative preferences, LGU operational parameters & security',
  },
};

export default function Topbar({ title }: { title?: string }) {
  const pathname = usePathname();
  const current = titleMap[pathname] || {
    title: title || 'Admin Dashboard',
    subtitle: 'Metro Cebu Waste & Sanitation Command Center',
  };

  return (
    <header className="h-24 flex items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-30">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{current.title}</h1>
        <p className="text-sm text-slate-500 font-normal mt-1">{current.subtitle}</p>
      </div>
    </header>
  );
}
