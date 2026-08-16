"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Wifi, Battery, MapPin, Truck } from "lucide-react";

export function HeroSection() {
  const [phTime, setPhTime] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const prevTabRef = useRef("home");

  useEffect(() => {
    prevTabRef.current = activeTab;
  }, [activeTab]);

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

  useEffect(() => {
    // Check initial hash on mount (e.g. when landing on /#faqs)
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(hash);
      }
    }

    const handleTabChange = (e) => {
      const customEvent = e;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("bingo-tab-change", handleTabChange);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("bingo-tab-change", handleTabChange);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const faqs = [
    {
      q: "How to report illegal dumping?",
      a: "Snap a photo in the app. Bin'Go automatically tags your GIS location and dispatches the compactor truck.",
    },
    {
      q: "How to track trucks live?",
      a: "Open the Live GIS Map view to see real-time GPS positions and estimated pickup arrival times.",
    },
    {
      q: "Barangay pickup schedules?",
      a: "Schedules sync daily. Push notifications alert residents 15 mins before truck arrival.",
    },
  ];

  return (
    <section className="relative min-h-[660px] md:min-h-[720px] bg-gradient-to-b from-sky-50/80 via-emerald-50/30 to-slate-100/90 border-b border-slate-200 overflow-hidden flex flex-col justify-end pt-28">
      {/* Truck Drive Animation Keyframes */}
      <style jsx>{`
        @keyframes truckDrive {
          0% {
            transform: translateX(-110%);
          }
          100% {
            transform: translateX(280%);
          }
        }
        .animate-truck-drive {
          animation: truckDrive 5s linear infinite;
        }
      `}</style>

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

        {/* Middle Mountain Peaks & Tree Clusters */}
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

      {/* Hero Canvas: Container for Text and Phone */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pb-8 md:pb-12 h-[540px] flex items-center">
        
        {/* Dynamic Text Content: Home Section */}
        <div
          className={`absolute right-4 sm:right-8 md:right-12 max-w-lg lg:max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-start ${
            activeTab === "home"
              ? "opacity-100 translate-y-0 delay-300 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-6 drop-shadow-sm">
            Smart Waste Collection, <br/>
            <span className="text-emerald-500 relative inline-block">
              Simplified.
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-emerald-300 -z-10" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M0,10 Q100,20 200,5" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-slate-700 font-bold leading-relaxed mb-8 max-w-md">
            Never miss a collection day again. Live track garbage trucks, receive instant arrival alerts, and help keep your community clean.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Coming Soon Download Button Container */}
            <div className="relative group overflow-hidden rounded-2xl">
              {/* Modern Frosted Glass Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[1px] opacity-100 transition-opacity">
                <div className="bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                  Coming Soon
                </div>
              </div>
              
              <button className="bg-emerald-500 text-white font-semibold text-lg py-4 px-8 rounded-2xl shadow-lg opacity-80 grayscale pointer-events-none flex items-center justify-center gap-2 w-full sm:w-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download App
              </button>
            </div>
            <button className="bg-white text-slate-700 font-semibold text-lg py-4 px-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Dynamic Text Content: About Section */}
        <div
          className={`absolute left-8 sm:left-16 md:left-24 lg:left-32 max-w-lg lg:max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-start ${
            activeTab === "about"
              ? "opacity-100 translate-y-0 delay-300 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none -rotate-2 relative z-10">
              Who is <br />
              <span className="text-emerald-500 inline-block rotate-2 drop-shadow-sm">Bin'Go?</span>
            </h1>
            {/* Playful thick underline */}
            <svg className="absolute -bottom-4 left-0 w-[110%] h-6 text-emerald-300 -rotate-2 z-0" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M5,15 Q100,25 195,5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          
          <p className="text-xl text-slate-800 font-extrabold leading-relaxed mb-4 mt-8 max-w-md">
            We are just a bunch of folks who got tired of messy streets! 
          </p>
          <p className="text-lg text-slate-600 font-semibold leading-relaxed max-w-md">
            Bin'Go makes taking out the trash actually fun. Track trucks live, snap a pic to report dumping, and keep your community sparkling clean with a tap.
          </p>
          
          <div className="mt-8 flex gap-4">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl px-6 py-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-default flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-emerald-500">Zero</span>
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Mess Left</span>
            </div>
            <div className="bg-emerald-500 border border-emerald-400 shadow-sm rounded-2xl px-6 py-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-default flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">100%</span>
              <span className="block text-[11px] font-bold text-emerald-50 uppercase tracking-widest mt-1">Real-Time</span>
            </div>
          </div>
        </div>

        {/* Dynamic Text Content: Features Section */}
        <div
          className={`absolute right-4 sm:right-8 md:right-12 max-w-lg lg:max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-start ${
            activeTab === "features"
              ? "opacity-100 translate-y-0 delay-300 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none -rotate-2 relative z-10">
              Packed With <br />
              <span className="text-emerald-500 inline-block rotate-2 drop-shadow-sm">Features.</span>
            </h1>
            <svg className="absolute -bottom-4 left-0 w-[110%] h-6 text-emerald-300 -rotate-2 z-0" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M5,15 Q100,25 195,5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          
          <p className="text-xl text-slate-800 font-extrabold leading-relaxed mb-4 mt-8 max-w-md">
            Everything you need for a cleaner community.
          </p>
          <p className="text-lg text-slate-600 font-semibold leading-relaxed max-w-md">
            Live telemetry tracking, instant dumping reports, push notifications for garbage arrival, and a complete history of collections in your barangay.
          </p>
          
          <div className="mt-8 flex gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all">
              Explore All Features
            </button>
          </div>
        </div>

        {/* Dynamic Text Content: FAQ Section */}
        <div
          className={`absolute left-8 sm:left-16 md:left-24 lg:left-32 max-w-lg lg:max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-start ${
            activeTab === "faq" || activeTab === "faqs"
              ? "opacity-100 translate-y-0 delay-300 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none -rotate-2 relative z-10">
              Got <br />
              <span className="text-emerald-500 inline-block rotate-2 drop-shadow-sm">Questions?</span>
            </h1>
            <svg className="absolute -bottom-4 left-0 w-[110%] h-6 text-emerald-300 -rotate-2 z-0" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M5,15 Q100,25 195,5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          
          <p className="text-xl text-slate-800 font-extrabold leading-relaxed mb-4 mt-8 max-w-md">
            Everything you need to know about using Bin'Go.
          </p>
          <p className="text-lg text-slate-600 font-semibold leading-relaxed max-w-md">
            From tracking garbage trucks to reporting illegal dumping, we've got you covered. Can't find what you're looking for? Just drop us a line!
          </p>
          
          <div className="mt-8 flex gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all">
              Contact Support
            </button>
          </div>
        </div>

        {/* Smooth Gliding Phone Frame */}
        <div
          className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeTab === "faq" || activeTab === "faqs"
              ? `left-[calc(100%-300px)] sm:left-[calc(100%-340px)] md:left-[calc(100%-360px)] translate-x-0 ${prevTabRef.current === "about" ? "animate-slide-down-phone" : ""}`
            : activeTab === "about"
              ? "left-[calc(100%-300px)] sm:left-[calc(100%-340px)] md:left-[calc(100%-360px)] translate-x-0"
              : activeTab === "features"
                ? `left-4 sm:left-8 md:left-12 translate-x-0 ${prevTabRef.current === "home" ? "animate-slide-up-phone" : ""}`
              : activeTab === "home"
                ? "left-4 sm:left-8 md:left-12 translate-x-0"
                : "left-1/2 -translate-x-1/2"
          }`}
        >
          <div className="relative w-[285px] sm:w-[320px] h-[500px] sm:h-[530px] bg-slate-950 rounded-[42px] p-2.5 border-[5px] border-slate-800 shadow-2xl shadow-emerald-950/20 ring-1 ring-slate-900/10 flex flex-col box-border animate-in fade-in slide-in-from-bottom-[100px] duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] fill-mode-both">
            {/* Side Hardware Buttons */}
            <div className="absolute -left-[7px] top-20 w-[3px] h-6 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[7px] top-28 w-[3px] h-6 bg-slate-700 rounded-l-md" />
            <div className="absolute -right-[7px] top-24 w-[3px] h-9 bg-slate-700 rounded-r-md" />

            {/* Screen Display Box (Dynamic Minimalist Content Container) */}
            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col relative border border-slate-200/80 box-border transition-all duration-300">
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

              {/* Viewport Content Container */}
              <div className="flex-1 p-3.5 flex flex-col justify-between overflow-y-auto bg-white">
                {/* FAQ VIEW (Only Section with Internal Phone Content) */}
                {activeTab === "faq" || activeTab === "faqs" ? (
                  /* Empty FAQ View */
                  <div className="flex-1 bg-white relative"></div>
                ) : activeTab === "about" ? (
                  /* Empty About View */
                  <div className="flex-1 bg-white relative"></div>
                ) : activeTab === "home" ? (
                  /* Empty Home View */
                  <div className="flex-1 bg-white relative"></div>
                ) : (
                  /* Empty Features View */
                  <div className="flex-1 bg-white relative"></div>
                )}
              </div>

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
