'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
const MapCanvas = dynamic(() => import('@/components/admin/map-canvas'), { ssr: false });
import { mockTickets } from '@/lib/mock-data';

export default function LiveMapPage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [mapMode, setMapMode] = useState<'pins' | 'heatmap' | 'combined'>('heatmap');

  const filteredTickets = mockTickets.filter(ticket => {
    const matchStatus = statusFilter === 'All' || ticket.status === statusFilter;
    const matchUrgency = urgencyFilter === 'All' || ticket.urgency === urgencyFilter;
    return matchStatus && matchUrgency;
  });

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Top Header Filter & Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-emerald-600 bg-white text-slate-900 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Urgency</label>
            <select 
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-emerald-600 bg-white text-slate-900 font-medium"
            >
              <option value="All">All Urgencies</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {/* View Mode Switcher outside the map */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">Map View Mode</label>
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setMapMode('pins')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mapMode === 'pins'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Pins
            </button>
            <button
              type="button"
              onClick={() => setMapMode('heatmap')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mapMode === 'heatmap'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Heatmap
            </button>
            <button
              type="button"
              onClick={() => setMapMode('combined')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mapMode === 'combined'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Combined
            </button>
          </div>
        </div>
      </div>

      {/* Map & Legend Section */}
      <div className="flex flex-col gap-3">
        <div className="w-full h-[390px] relative rounded-lg overflow-hidden border border-slate-200 shadow-xs">
          <MapCanvas tickets={filteredTickets} mapMode={mapMode} />
        </div>

        {/* Accumulation Density Bar positioned below the map at bottom left */}
        {mapMode !== 'pins' && (
          <div className="self-start max-w-full flex-wrap sm:flex-nowrap bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 text-xs font-bold text-slate-700">
            <span className="text-slate-500 font-semibold text-xs whitespace-nowrap">Accumulation Density:</span>
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> Low</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" /> Medium</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" /> High</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" /> Critical</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
