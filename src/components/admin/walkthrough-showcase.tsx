'use client';

import { useState, useEffect } from 'react';
import { 
  Camera, 
  Truck, 
  CheckCircle2, 
  Play, 
  Pause, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw,
  Wifi,
  Battery,
  Bell,
  Star,
  Navigation
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: '1. Citizen Mobile Waste Report',
    subtitle: 'Resident snaps photo & location in Bin\'Go App',
    tag: 'Resident Mobile',
    details: 'Auto-geotags Sitio Riverfront, Brgy. Guadalupe with AI waste classification.',
  },
  {
    id: 2,
    title: '2. LGU Automated Dispatch',
    subtitle: 'Command Center routes nearest compactor truck',
    tag: 'Sanitation Desk',
    details: 'Truck #04 (Plate GW-8821) dispatched with optimal 4-minute ETA route.',
  },
  {
    id: 3,
    title: '3. Verified Cleanup & SLA Closure',
    subtitle: 'Sanitation crew uploads proof & resolves ticket',
    tag: 'Resolution',
    details: 'Riverbank cleared in 18 minutes. Resident receives instant confirmation.',
  },
];

export default function WalkthroughShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
      {/* Top Header & Playback Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase">
            Mobile Interface Simulation
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Bin'Go Mobile App Walkthrough
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                0{step.id}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
            className="h-8 w-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shrink-0"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 stroke-[2]" /> : <Play className="w-3.5 h-3.5 stroke-[2]" />}
          </button>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2">
        {/* Left Side: Photorealistic iPhone 15 Pro Device Frame */}
        <div className="lg:col-span-6 flex justify-center py-4">
          <div className="relative w-[310px] h-[600px] bg-slate-900 border-[7px] border-slate-800 rounded-[50px] p-2.5 shadow-2xl shadow-slate-950/25 flex flex-col overflow-hidden ring-1 ring-slate-700/60">
            
            {/* Hardware Side Buttons */}
            <div className="absolute -left-[10px] top-20 w-[4px] h-6 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[10px] top-32 w-[4px] h-10 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[10px] top-46 w-[4px] h-10 bg-slate-700 rounded-l-md" />
            <div className="absolute -right-[10px] top-28 w-[4px] h-14 bg-slate-700 rounded-r-md" />

            {/* Dynamic Island Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto shrink-0 z-30 flex items-center justify-between px-2.5 my-1 shadow-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
            </div>

            {/* Phone Screen Display Canvas */}
            <div className="flex-1 bg-slate-100 rounded-[40px] overflow-hidden flex flex-col relative border border-slate-200/80 shadow-inner">
              
              {/* iOS Top Status Bar */}
              <div className="flex items-center justify-between px-5 pt-1.5 pb-1 text-[11px] font-bold text-slate-800 font-mono shrink-0 z-20">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Wifi className="w-3 h-3 stroke-[2.5]" />
                  <Battery className="w-4 h-3 text-emerald-600 fill-emerald-600 stroke-[1.5]" />
                </div>
              </div>

              {/* Mobile App Navigation Header */}
              <div className="px-4 py-2 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-extrabold text-[11px] flex items-center justify-center shadow-2xs">
                    B
                  </div>
                  <span className="text-xs font-bold text-slate-900 tracking-tight">Bin'Go Mobile</span>
                </div>
                <div className="relative">
                  <Bell className="w-4 h-4 text-slate-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
              </div>

              {/* Dynamic App Viewport Content */}
              <div className="flex-1 p-3.5 flex flex-col overflow-y-auto">
                
                {/* Step 1: Resident Waste Report Screen */}
                {activeStep === 0 && (
                  <div className="flex-1 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">New Incident</span>
                      <span className="text-[10px] bg-red-50 text-red-600 font-bold px-2.5 py-0.5 rounded-full border border-red-200/80">
                        High Priority
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col gap-2.5">
                      <div className="h-32 bg-slate-900 rounded-xl overflow-hidden relative flex flex-col items-center justify-center border border-slate-800">
                        {/* Simulated Camera Viewfinder Grid */}
                        <div className="absolute inset-2 border border-white/20 border-dashed rounded-lg" />
                        <Camera className="w-7 h-7 text-emerald-400 stroke-[2] animate-pulse" />
                        <span className="text-[10px] font-mono font-semibold text-slate-200 mt-1">waste_riverbank.png</span>
                        
                        <div className="absolute bottom-2 right-2 bg-emerald-600 text-white rounded-full p-1 shadow-sm flex items-center gap-1 px-2 text-[9px] font-bold">
                          <CheckCircle2 className="w-3 h-3 stroke-[2]" />
                          <span>AI Geotagged</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-800 truncate">
                          Sitio Riverfront, Brgy. Guadalupe
                        </span>
                      </div>
                    </div>

                    {/* Simulated Finger Touch Cursor */}
                    <div className="relative mt-auto">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/40 border-2 border-emerald-600 shadow-md animate-ping" />
                      </div>
                      <div className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-full flex items-center justify-between shadow-xs transition-colors">
                        <span>Submit Incident Report</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: LGU Dispatch Screen */}
                {activeStep === 1 && (
                  <div className="flex-1 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Dispatch</span>
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200/80">
                        Truck #04 Active
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                          <Truck className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900">Compactor Truck #04</h4>
                          <p className="text-[10px] text-slate-500 font-medium">Plate GW-8821 • Assigned</p>
                        </div>
                      </div>

                      {/* Mini Live Map Viewport */}
                      <div className="h-24 bg-slate-100 rounded-xl border border-slate-200 p-2 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between text-[10px] z-10">
                          <span className="font-mono text-slate-500">Route Telemetry</span>
                          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            4 min ETA
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 z-10">
                          <Navigation className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                          <span className="truncate">Heading to Brgy. Guadalupe</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto bg-slate-900 text-white font-bold text-xs py-3 px-4 rounded-full flex items-center justify-between shadow-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live GPS Telemetry
                      </span>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-400" />
                    </div>
                  </div>
                )}

                {/* Step 3: Verified Cleanup Screen */}
                {activeStep === 2 && (
                  <div className="flex-1 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Incident Cleared</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Closed SLA
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center text-center gap-2 my-auto">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60 shadow-2xs">
                        <ShieldCheck className="w-7 h-7 stroke-[2]" />
                      </div>

                      <h4 className="text-xs font-extrabold text-slate-900">Site Fully Cleaned</h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Ticket #TKT-008 resolved in 18 mins. Verification photo logged.
                      </p>

                      <div className="flex items-center gap-1 text-amber-400 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                    </div>

                    <div className="mt-auto bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs py-3 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2]" />
                      <span>Resident Notified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-28 h-1 bg-slate-400/80 rounded-full mx-auto my-1.5 shrink-0 z-30" />
            </div>
          </div>
        </div>

        {/* Right Side: Step Explanations & Progress Bar */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                  activeStep === idx
                    ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200/70 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      activeStep === idx
                        ? 'bg-white text-emerald-700 border-emerald-300'
                        : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{step.subtitle}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{step.details}</p>
              </div>
            ))}
          </div>

          {/* Step Progress Line */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-emerald-600 h-full transition-all duration-500 ease-in-out"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
