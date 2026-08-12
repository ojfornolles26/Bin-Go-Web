"use client";

import { useEffect, useState } from "react";
import { MapPin, Wifi, Battery } from "lucide-react";

export default function AboutPage() {
  const [phTime, setPhTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setPhTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[660px] md:min-h-[720px] bg-gradient-to-b from-sky-50/80 via-emerald-50/30 to-slate-100/90 border-b border-slate-200 overflow-hidden flex flex-col justify-end pt-28">
      
      {/* Atmospheric Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />

      {/* Layered Vector Mountain Landscape & Forest Trees Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-end z-10">
        
        {/* Back Mountain Ridge */}
        <svg
          className="w-full h-[240px] md:h-[320px] text-emerald-900/10 fill-current opacity-60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,229.3C840,224,960,160,1080,138.7C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>

        {/* Middle Mountain Peaks */}
        <div className="relative -mt-32">
          <svg
            className="w-full h-[180px] md:h-[260px] text-emerald-700/20 fill-current"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,224L80,202.7C160,181,320,139,480,149.3C640,160,800,224,960,224C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
          </svg>
        </div>

        {/* Front Foothills with Pine & Forest Trees Layer */}
        <div className="relative -mt-24">
          <svg
            className="w-full h-[140px] md:h-[200px] text-emerald-600/35 fill-current"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,256L120,240C240,224,480,192,720,202.7C960,213,1200,267,1320,293.3L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" />

            <g className="text-emerald-800/40 opacity-90">
              <polygon points="110,210 120,240 100,240" />
              <polygon points="110,200 118,220 102,220" />
              <polygon points="125,205 135,238 115,238" />
              <polygon points="125,195 133,218 117,218" />

              <polygon points="210,195 222,230 198,230" />
              <polygon points="210,185 219,210 201,210" />

              <polygon points="450,165 462,200 438,200" />
              <polygon points="450,155 459,180 441,180" />
              <polygon points="468,170 480,205 456,205" />
              <polygon points="468,160 477,185 459,185" />
              <polygon points="485,178 495,210 475,210" />

              <polygon points="710,175 722,210 698,210" />
              <polygon points="710,165 719,190 701,190" />
              <polygon points="728,180 738,212 718,212" />

              <polygon points="980,185 992,220 968,220" />
              <polygon points="980,175 989,200 971,200" />
              <polygon points="1000,190 1010,222 990,222" />

              <polygon points="1240,230 1252,270 1228,270" />
              <polygon points="1240,220 1249,250 1231,250" />
              <polygon points="1260,238 1270,272 1250,272" />
              <polygon points="1260,228 1268,252 1252,252" />
            </g>
          </svg>
        </div>

      </div>

      {/* Hero Canvas: Centered Phone Showcase */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pb-8 md:pb-12 flex justify-center items-center">
        
        {/* Centered Phone Frame */}
        <div className="flex justify-center items-center">
          <div className="relative w-[285px] sm:w-[320px] h-[500px] sm:h-[530px] bg-slate-950 rounded-[42px] p-2.5 border-[5px] border-slate-800 shadow-2xl shadow-emerald-950/20 ring-1 ring-slate-900/10 flex flex-col box-border">
          
          {/* Side Hardware Buttons */}
          <div className="absolute -left-[7px] top-20 w-[3px] h-6 bg-slate-700 rounded-l-md" />
          <div className="absolute -left-[7px] top-28 w-[3px] h-6 bg-slate-700 rounded-l-md" />
          <div className="absolute -right-[7px] top-24 w-[3px] h-9 bg-slate-700 rounded-r-md" />

          {/* Screen Display Box */}
          <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col relative border border-slate-200/80 box-border">
            
            {/* iOS Status Bar */}
            <div className="pt-2.5 px-4 pb-1.5 flex items-center justify-between z-30 shrink-0 bg-white border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-900 font-mono tracking-tight min-w-[50px]">
                {phTime || "2:09 AM"}
              </span>
              
              {/* Dynamic Island Notch */}
              <div className="w-16 h-3.5 bg-slate-950 rounded-full flex items-center justify-end px-1 gap-1">
                <div className="w-1 h-1 rounded-full bg-slate-900" />
              </div>

              <div className="flex items-center gap-1.5 text-slate-900">
                <MapPin className="w-2.5 h-2.5 stroke-[2.5] text-emerald-600" />
                <Wifi className="w-2.5 h-2.5 stroke-[2.5]" />
                <Battery className="w-3 h-3 stroke-[2.5]" />
              </div>
            </div>

            {/* Completely Empty Screen Viewport */}
            <div className="flex-1 bg-white" />

            {/* Bottom iOS Home Bar */}
            <div className="pb-1.5 pt-1 flex justify-center shrink-0 z-30 bg-white border-t border-slate-100">
              <div className="w-24 h-1 bg-slate-900 rounded-full" />
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
