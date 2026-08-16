"use client";

import { useState } from "react";
import { ArrowUpDown, CheckCircle2, Clock, Loader } from "lucide-react";

const SortHeader = ({ field, label, onSort }) => (
  <th
    className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors"
    onClick={() => onSort(field)}
  >
    <div className="flex items-center gap-1">
      {label}
      <ArrowUpDown className="w-3 h-3 text-slate-400" />
    </div>
  </th>
);

export default function TicketTable({ tickets }) {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <SortHeader field="id" label="ID" onSort={handleSort} />
              <SortHeader field="location" label="Location" onSort={handleSort} />
              <SortHeader field="reporter" label="Reporter" onSort={handleSort} />
              <SortHeader field="urgency" label="Urgency" onSort={handleSort} />
              <SortHeader field="status" label="Status" onSort={handleSort} />
              <SortHeader field="date" label="Date" onSort={handleSort} />
            </tr>
          </thead>
          <tbody>
            {sortedTickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {ticket.id}
                </td>
                <td className="px-6 py-4">
                  {ticket.location}, {ticket.barangay}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ticket.reporter}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                      ticket.urgency === "Critical"
                        ? "bg-red-600 text-white"
                        : ticket.urgency === "High"
                          ? "bg-orange-500 text-white"
                          : ticket.urgency === "Medium"
                            ? "bg-amber-500 text-white"
                            : "bg-emerald-500 text-white"
                    }`}
                  >
                    {ticket.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    {ticket.status === "Resolved" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : ticket.status === "Pending" ? (
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Loader className="w-3.5 h-3.5 text-blue-500" />
                    )}
                    <span className="text-sm font-medium text-slate-700">
                      {ticket.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
