'use client';

import { useEffect, useState } from 'react';
import { Ticket } from '@/lib/mock-data';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues in React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom trash bin pin icons color-coded for urgency
const createIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-trash-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2.5px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">
        <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            <line x1="10" x2="10" y1="11" y2="17"/>
            <line x1="14" x2="14" y1="11" y2="17"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

const icons = {
  Critical: createIcon('#dc2626'), // red-600
  High: createIcon('#ea580c'), // orange-600
  Medium: createIcon('#d97706'), // amber-600
  Low: createIcon('#059669'), // emerald-600
};

interface MapCanvasProps {
  tickets: Ticket[];
  mapMode?: 'pins' | 'heatmap' | 'combined';
}

export default function MapCanvas({ tickets, mapMode = 'heatmap' }: MapCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
        Loading Map...
      </div>
    );
  }

  // We require react-leaflet here so it doesn't break during SSR
  const { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } = require('react-leaflet');

  const getHeatmapColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return '#ef4444'; // red-500
      case 'High': return '#f97316'; // orange-500
      case 'Medium': return '#f59e0b'; // amber-500
      default: return '#10b981'; // emerald-500
    }
  };

  const getHeatmapRadius = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 500;
      case 'High': return 380;
      case 'Medium': return 280;
      default: return 200;
    }
  };

  const showPins = mapMode === 'pins' || mapMode === 'combined';
  const showHeatmap = mapMode === 'heatmap' || mapMode === 'combined';

  return (
    <div className="w-full h-full min-h-[400px] relative rounded-lg overflow-hidden border border-slate-200 z-0">
      <MapContainer 
        center={[10.3157, 123.8854]} 
        zoom={12} 
        style={{ height: '100%', width: '100%', position: 'absolute', inset: 0 }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          detectRetina={true}
          maxZoom={19}
        />

        {/* Heatmap Density Circles (Soft & Subtle Background Layer) */}
        {showHeatmap && tickets.flatMap((ticket) => {
          const color = getHeatmapColor(ticket.urgency);
          const baseRadius = getHeatmapRadius(ticket.urgency);

          return [
            // Inner Core Heat Circle
            <Circle
              key={`heat-core-${ticket.id}`}
              center={[ticket.lat, ticket.lng]}
              radius={baseRadius * 0.5}
              pathOptions={{
                color: 'transparent',
                fillColor: color,
                fillOpacity: 0.28,
              }}
            />,
            // Mid Intensity Circle
            <Circle
              key={`heat-mid-${ticket.id}`}
              center={[ticket.lat, ticket.lng]}
              radius={baseRadius}
              pathOptions={{
                color: 'transparent',
                fillColor: color,
                fillOpacity: 0.16,
              }}
            />,
            // Outer Ambient Gradient Halo Circle
            <Circle
              key={`heat-outer-${ticket.id}`}
              center={[ticket.lat, ticket.lng]}
              radius={baseRadius * 1.5}
              pathOptions={{
                color: 'transparent',
                fillColor: color,
                fillOpacity: 0.07,
              }}
            />
          ];
        })}

        {/* Standard Teardrop Trash Bin Pin Markers */}
        {showPins && tickets.map((ticket) => (
          <Marker 
            key={ticket.id} 
            position={[ticket.lat, ticket.lng]}
            icon={icons[ticket.urgency]}
          >
            <Tooltip 
              permanent={true} 
              direction="top" 
              offset={[0, -36]} 
              className="location-tooltip"
            >
              <div className="px-2.5 py-1 bg-slate-900/90 text-white font-bold text-xs rounded-xl shadow-md border border-slate-700/80 whitespace-nowrap tracking-wide">
                {ticket.location} • <span className="text-emerald-400 font-semibold">{ticket.barangay}</span>
              </div>
            </Tooltip>

            <Popup>
              <div className="p-1 font-sans flex flex-col gap-1.5 min-w-[165px]">
                <h3 className="font-bold text-slate-900 text-sm m-0 pb-1 border-b border-slate-100">{ticket.id}</h3>
                <p className="text-xs font-semibold text-slate-700 m-0 leading-tight">{ticket.location}, {ticket.barangay}</p>
                
                <div className="mt-1 flex flex-col gap-1.5 pt-1.5 border-t border-slate-100">
                  {/* Urgency Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">URGENCY</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-2xs ${
                      ticket.urgency === 'Critical' ? 'bg-red-600' :
                      ticket.urgency === 'High' ? 'bg-orange-500' :
                      ticket.urgency === 'Medium' ? 'bg-amber-500' :
                      'bg-emerald-600'
                    }`}>
                      {ticket.urgency}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">STATUS</span>
                    <span className={`text-xs font-bold ${
                      ticket.status === 'Pending' ? 'text-amber-700' :
                      ticket.status === 'In Progress' ? 'text-blue-700' :
                      'text-emerald-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
