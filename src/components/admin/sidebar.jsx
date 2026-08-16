"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Ticket,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Database,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "CRUD Module", href: "/crud", icon: Database },
  { name: "Live Map", href: "/live-map", icon: Map },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell, badge: 2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  return (
    <aside className="sticky top-0 flex flex-col h-[100dvh] bg-slate-100 border-r border-slate-200 w-72 shrink-0 z-40">
      <div className="flex h-24 items-center justify-center px-2 overflow-visible pb-2">
        <Image
          src="/logo-green-v2.png"
          alt="Bin'Go Logo"
          width={280}
          height={100}
          className="h-20 w-auto object-contain mix-blend-multiply scale-[1.65]"
          priority
        />
      </div>

      <div className="flex flex-col py-4 gap-2 px-2">
        {navItems.map((item) => {
          const isActive =
            pathname?.startsWith(item.href) || pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all ${isActive ? "bg-white shadow-sm ring-1 ring-slate-200 text-emerald-600 font-bold" : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"}`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}`}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto px-3 mb-4 flex flex-col gap-4">
        {/* Minimalist Profile Section */}
        <div className="px-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white ring-1 ring-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
            GC
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 truncate leading-tight">
              Brgy. Guadalupe
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
              Admin
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-4 border-t border-slate-200/60">
          <Link
            href="/settings"
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-bold transition-all shadow-sm w-full ${
              pathname === "/settings"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700 ring-1 ring-emerald-500/20"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <Settings className={`w-4 h-4 ${pathname === "/settings" ? "text-emerald-600" : "text-slate-500"}`} />
            <span className="text-xs tracking-wide">Settings</span>
          </Link>

          <button
            onClick={() => setShowSignOutModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm w-full group"
          >
            <LogOut className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
            <span className="text-xs tracking-wide">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Compact Minimalist Sign Out Modal */}
      {showSignOutModal && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSignOutModal(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-xl shadow-xl max-w-[280px] w-full p-5 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-1">
              <LogOut className="w-4 h-4 text-rose-500" />
              <h4 className="text-sm font-bold text-slate-900">Sign Out</h4>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Are you sure you want to sign out? You will need to log back in.
            </p>
            
            <div className="flex items-center gap-2 pt-3 mt-1">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="flex-1 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSignOutModal(false)}
                className="flex-1 h-8 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition-all"
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
