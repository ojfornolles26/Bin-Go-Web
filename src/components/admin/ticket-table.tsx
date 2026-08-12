'use client';

import { useState } from 'react';
import { Ticket } from '@/lib/mock-data';
import { ArrowUpDown } from 'lucide-react';

interface TicketTableProps {
  tickets: Ticket[];
}

type SortField = keyof Ticket;

export default function TicketTable({ tickets }: TicketTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortHeader = ({ field, label }: { field: SortField, label: string }) => (
    <th 
      className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-3 h-3 text-slate-400" />
      </div>
    </th>
  );

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <SortHeader field="id" label="ID" />
              <SortHeader field="location" label="Location" />
              <SortHeader field="reporter" label="Reporter" />
              <SortHeader field="urgency" label="Urgency" />
              <SortHeader field="status" label="Status" />
              <SortHeader field="date" label="Date" />
            </tr>
          </thead>
          <tbody>
            {sortedTickets.map((ticket, index) => (
              <tr key={ticket.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.location}, {ticket.barangay}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.reporter}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-2xs ${
                    ticket.urgency === 'Critical' ? 'bg-red-600' :
                    ticket.urgency === 'High' ? 'bg-orange-500' :
                    ticket.urgency === 'Medium' ? 'bg-amber-500' :
                    'bg-emerald-600'
                  }`}>
                    {ticket.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs font-bold ${
                    ticket.status === 'Pending' ? 'text-amber-700' :
                    ticket.status === 'In Progress' ? 'text-blue-700' :
                    'text-emerald-700'
                  }`}>
                    {ticket.status}
                  </span>
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
