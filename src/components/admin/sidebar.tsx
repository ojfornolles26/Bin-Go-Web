'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Ticket, BarChart3, Bell, Settings, LogOut, Database } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'CRUD Module', href: '/crud', icon: Database },
  { name: 'Live Map', href: '/live-map', icon: Map },
  { name: 'Tickets', href: '/tickets', icon: Ticket },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  return (
    <aside className="sticky top-0 flex flex-col h-[100dvh] bg-white border-r border-slate-200 w-64 shrink-0 z-40">
      <div className="flex h-24 items-center justify-center px-2 border-b border-slate-200 overflow-hidden">
        <Image 
          src="/logo.jpg" 
          alt="Bin'Go Logo" 
          width={280} 
          height={100} 
          className="h-20 w-auto object-contain mix-blend-multiply scale-[1.65]"
          priority
        />
      </div>
      
      <div className="flex flex-col py-4 gap-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href) || pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto px-3 mb-4 flex flex-col gap-2.5">
        <div className="p-3 border border-slate-200/80 rounded-[22px] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
            GC
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900 truncate leading-tight">Brgy. Guadalupe</span>
            <span className="text-[10px] text-emerald-600 font-semibold tracking-wide uppercase mt-0.5">
              Admin
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link 
            href="/settings"
            className={`flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer w-full ${
              pathname === '/settings'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200/80 active:scale-[0.98]'
            }`}
          >
            Settings
          </Link>
          <button 
            onClick={() => setShowSignOutModal(true)}
            className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold border border-rose-700/30 shadow-xs hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer w-full"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Sleek Dark Architectural Sign Out Confirmation Dialog */}
      {showSignOutModal && (
        <div 
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          onClick={() => setShowSignOutModal(false)}
        >
          <div 
            className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl max-w-[320px] w-full p-4 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <span className="text-xs font-semibold text-slate-300 tracking-tight">
                Sign Out
              </span>
            </div>

            <p className="text-xs text-slate-400 font-normal leading-snug">
              Are you sure you want to sign out?
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="flex-1 h-9 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSignOutModal(false)}
                className="flex-1 h-9 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
