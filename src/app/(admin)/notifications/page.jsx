"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  AlertTriangle,
  Truck,
  Ticket as TicketIcon,
  MapPin,
  Info,
  CheckCheck,
} from "lucide-react";

const initialNotifications = [
  {
    id: "NOTIF-001",
    type: "Emergency",
    title: "Critical Illegal Dumping Alert",
    message:
      "Illegal waste disposal reported near Guadalupe Riverbank. High environmental hazard.",
    location: "Sitio Riverfront, Brgy. Guadalupe",
    barangay: "Guadalupe",
    timestamp: "10 mins ago",
    ticketId: "TKT-008",
    actionUrl: "/tickets",
    actionLabel: "View Ticket",
    isRead: false,
  },
  {
    id: "NOTIF-002",
    type: "Dispatch",
    title: "Truck 04 Arrived at Site",
    message:
      "Compactor Truck 04 (Plate GW-8821) reached Sitio Kamagong collection area.",
    location: "Sitio Kamagong",
    barangay: "Guadalupe",
    timestamp: "25 mins ago",
    actionUrl: "/live-map",
    actionLabel: "View Live Map",
    isRead: false,
  },
  {
    id: "NOTIF-003",
    type: "System",
    title: "Truck 02 GPS Signal Lost",
    message:
      "GPS telemetry connection lost for Compactor Truck 02 near Banawa area.",
    location: "Banawa Heights",
    barangay: "Guadalupe",
    timestamp: "1 hour ago",
    actionUrl: "/live-map",
    actionLabel: "View Live Map",
    isRead: true,
  },
  {
    id: "NOTIF-004",
    type: "Ticket",
    title: "New Sanitation Incident Filed",
    message:
      "Resident reported overflowing communal bin near Guadalupe Public Market.",
    location: "Public Market Access Rd",
    barangay: "Guadalupe",
    timestamp: "2 hours ago",
    ticketId: "TKT-001",
    actionUrl: "/tickets",
    actionLabel: "View Ticket",
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("All");
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setDeleteTargetId(null);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "Emergency Reports") return n.type === "Emergency";
    if (activeTab === "System Alerts")
      return n.type === "System" || n.type === "Dispatch";
    if (activeTab === "Ticket Reports") return n.type === "Ticket";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case "Emergency":
        return <AlertTriangle className="w-6 h-6 text-red-600 stroke-[2]" />;
      case "Dispatch":
        return <Truck className="w-6 h-6 text-blue-600 stroke-[2]" />;
      case "Ticket":
        return <TicketIcon className="w-6 h-6 text-amber-600 stroke-[2]" />;
      case "System":
      default:
        return <Info className="w-6 h-6 text-emerald-600 stroke-[2]" />;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "Emergency":
        return "text-red-600";
      case "Dispatch":
        return "text-blue-600";
      case "Ticket":
        return "text-amber-600";
      case "System":
      default:
        return "text-emerald-600";
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      {/* Category Filter Bar & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Emergency Reports", "System Alerts", "Ticket Reports"].map(
            (tab) => {
              const isActive = activeTab === tab;
              let count = notifications.length;
              if (tab === "Emergency Reports")
                count = notifications.filter(
                  (n) => n.type === "Emergency",
                ).length;
              if (tab === "System Alerts")
                count = notifications.filter(
                  (n) => n.type === "System" || n.type === "Dispatch",
                ).length;
              if (tab === "Ticket Reports")
                count = notifications.filter((n) => n.type === "Ticket").length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                      isActive
                        ? "bg-emerald-700 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            },
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors mr-1 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Clean Notification Feed Panel */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[260px]">
            <div className="w-12 h-12 flex items-center justify-center text-slate-400 mb-2">
              <Bell className="w-8 h-8 stroke-[1.75]" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              No notifications found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              There are no notifications matching the selected filter category
              at this time.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-5 flex items-start justify-between gap-4 transition-colors ${
                !notification.isRead
                  ? "bg-slate-50/50 hover:bg-slate-100/50"
                  : "bg-white hover:bg-slate-50/30"
              }`}
            >
              {/* Left Content Area */}
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Unread Indicator Dot */}
                <div className="flex items-center pt-2.5 w-2">
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`flex items-center justify-center shrink-0 mt-0.5 ${getIconColor(notification.type)}`}
                >
                  {getTypeIcon(notification.type)}
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-1 min-w-0 flex-1 pt-0.5">
                  <h4
                    className={`text-sm tracking-tight ${!notification.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}
                  >
                    {notification.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed pr-4">
                    {notification.message}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-1">
                    <span className="text-emerald-600 font-semibold">
                      {notification.timestamp}
                    </span>
                    {notification.location && (
                      <span className="flex items-center gap-1 text-slate-500 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {notification.location}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 self-start pt-1">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Mark as Read
                  </button>
                )}

                <Link
                  href={notification.actionUrl}
                  className="inline-flex shrink-0"
                >
                  <button className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors shadow-xs cursor-pointer">
                    View
                  </button>
                </Link>

                <button
                  onClick={() => setDeleteTargetId(notification.id)}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Compact Minimalist Delete Confirmation Modal */}
      {deleteTargetId && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            className="bg-white text-slate-900 rounded-xl shadow-xl max-w-[280px] w-full p-5 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <h4 className="text-sm font-bold text-slate-900">Delete Notification</h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Are you sure you want to delete this notification? This cannot be undone.
            </p>

            <div className="flex items-center gap-2 pt-3 mt-1">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteNotification(deleteTargetId)}
                className="flex-1 h-8 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition-all"
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
