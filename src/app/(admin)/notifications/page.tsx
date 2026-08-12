'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  AlertTriangle, 
  Truck, 
  Ticket as TicketIcon, 
  MapPin, 
  Info
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'Emergency' | 'System' | 'Ticket' | 'Dispatch';
  title: string;
  message: string;
  location?: string;
  barangay?: string;
  timestamp: string;
  ticketId?: string;
  actionUrl: string;
  actionLabel: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-001',
    type: 'Emergency',
    title: 'Critical Illegal Dumping Alert',
    message: 'Illegal waste disposal reported near Guadalupe Riverbank. High environmental hazard.',
    location: 'Sitio Riverfront, Brgy. Guadalupe',
    barangay: 'Guadalupe',
    timestamp: '10 mins ago',
    ticketId: 'TKT-008',
    actionUrl: '/tickets',
    actionLabel: 'View Ticket',
  },
  {
    id: 'NOTIF-002',
    type: 'Dispatch',
    title: 'Truck 04 Arrived at Site',
    message: 'Compactor Truck 04 (Plate GW-8821) reached Sitio Kamagong collection area.',
    location: 'Sitio Kamagong',
    barangay: 'Guadalupe',
    timestamp: '25 mins ago',
    actionUrl: '/live-map',
    actionLabel: 'View Live Map',
  },
  {
    id: 'NOTIF-003',
    type: 'System',
    title: 'Truck 02 GPS Signal Lost',
    message: 'GPS telemetry connection lost for Compactor Truck 02 near Banawa area.',
    location: 'Banawa Heights',
    barangay: 'Guadalupe',
    timestamp: '1 hour ago',
    actionUrl: '/live-map',
    actionLabel: 'View Live Map',
  },
  {
    id: 'NOTIF-004',
    type: 'Ticket',
    title: 'New Sanitation Incident Filed',
    message: 'Resident reported overflowing communal bin near Guadalupe Public Market.',
    location: 'Public Market Access Rd',
    barangay: 'Guadalupe',
    timestamp: '2 hours ago',
    ticketId: 'TKT-001',
    actionUrl: '/tickets',
    actionLabel: 'View Ticket',
  },
];

type FilterTab = 'All' | 'Emergency Reports' | 'System Alerts' | 'Ticket Reports';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setDeleteTargetId(null);
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'Emergency Reports') return n.type === 'Emergency';
    if (activeTab === 'System Alerts') return n.type === 'System' || n.type === 'Dispatch';
    if (activeTab === 'Ticket Reports') return n.type === 'Ticket';
    return true;
  });

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'Emergency':
        return <AlertTriangle className="w-5 h-5 text-red-600 stroke-[2]" />;
      case 'Dispatch':
        return <Truck className="w-5 h-5 text-blue-600 stroke-[2]" />;
      case 'Ticket':
        return <TicketIcon className="w-5 h-5 text-amber-600 stroke-[2]" />;
      case 'System':
      default:
        return <Info className="w-5 h-5 text-emerald-600 stroke-[2]" />;
    }
  };

  const getIconColor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'Emergency':
        return 'text-red-600';
      case 'Dispatch':
        return 'text-blue-600';
      case 'Ticket':
        return 'text-amber-600';
      case 'System':
      default:
        return 'text-emerald-600';
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
        {(['All', 'Emergency Reports', 'System Alerts', 'Ticket Reports'] as FilterTab[]).map(tab => {
          const isActive = activeTab === tab;
          let count = notifications.length;
          if (tab === 'Emergency Reports') count = notifications.filter(n => n.type === 'Emergency').length;
          if (tab === 'System Alerts') count = notifications.filter(n => n.type === 'System' || n.type === 'Dispatch').length;
          if (tab === 'Ticket Reports') count = notifications.filter(n => n.type === 'Ticket').length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Clean Notification Feed Panel */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden divide-y divide-slate-200/80">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[260px]">
            <div className="w-12 h-12 flex items-center justify-center text-slate-400 mb-2">
              <Bell className="w-8 h-8 stroke-[1.75]" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">No notifications found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              There are no notifications matching the selected filter category at this time.
            </p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className="p-4 flex items-start justify-between gap-4 transition-colors bg-white hover:bg-slate-50/60"
            >
              {/* Left Vector Icon & Text Content */}
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div className={`w-9 h-9 flex items-center justify-center shrink-0 mt-0.5 ${getIconColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 min-w-0 flex-1 pt-0.5">
                  <p className="text-xs text-slate-800 leading-relaxed">
                    <strong className="font-semibold text-slate-900 mr-1">{notification.title}</strong>
                    <span className="text-slate-600 font-normal">{notification.message}</span>
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-0.5">
                    <span className="text-emerald-600 font-semibold">{notification.timestamp}</span>
                    {notification.location && (
                      <span className="flex items-center gap-1 text-slate-500 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{notification.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-center">
                <Link 
                  href={notification.actionUrl} 
                  className="inline-flex shrink-0"
                >
                  <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors cursor-pointer">
                    View
                  </button>
                </Link>

                <button
                  onClick={() => setDeleteTargetId(notification.id)}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div 
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteTargetId(null)}
        >
          <div 
            className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl max-w-[320px] w-full p-4 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <span className="text-xs font-semibold text-slate-300 tracking-tight">
                Delete Notification
              </span>
            </div>

            <p className="text-xs text-slate-400 font-normal leading-snug">
              Remove this notification permanently from the admin feed?
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteNotification(deleteTargetId)}
                className="flex-1 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
