"use client";

import { useState } from "react";
import TicketTable from "@/components/admin/ticket-table";
import { mockTickets } from "@/lib/mock-data";
import { Search } from "lucide-react";

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchSearch =
      ticket.location.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.reporter.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || ticket.status === statusFilter;
    const matchUrgency =
      urgencyFilter === "All" || ticket.urgency === urgencyFilter;
    return matchSearch && matchStatus && matchUrgency;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets by ID, location, or reporter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-600 w-full bg-white text-slate-900"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-emerald-600 bg-white text-slate-900 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-emerald-600 bg-white text-slate-900 font-medium"
          >
            <option value="All">All Urgencies</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      <TicketTable tickets={filteredTickets} />
    </div>
  );
}
