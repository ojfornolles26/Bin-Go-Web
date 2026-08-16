"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QrCode, Smartphone, Apple, Play, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 1500);
  };
  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-white relative overflow-hidden">
      
      {/* Left Pane: Web Registration */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-16 lg:px-20 xl:px-32 relative z-20 bg-white shadow-xl">
        {/* Back Button */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm">
              Sign up to track your local waste collection schedules and report issues in your neighborhood.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-slate-700">First Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Maria"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-slate-700">Last Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Cabrera"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="mariacabrera@yahoo.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-2">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 h-auto text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Google Sign In */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-slate-500 mt-8 px-4">
            After registering, download the Bin-Go mobile app to log in and start tracking bins in your neighborhood.
          </p>
        </div>
      </div>

      {/* Right Pane: Mobile App Download with Website Aesthetic */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-sky-50/80 via-emerald-50/30 to-slate-100/90 relative flex flex-col justify-center px-6 py-16 lg:px-20 overflow-hidden min-h-[500px]">
        
        {/* Atmospheric Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />

        {/* The Sun */}
        <div className="absolute top-12 right-12 md:top-20 md:right-24 w-24 h-24 bg-amber-100 rounded-full blur-[2px] opacity-70 pointer-events-none" />
        <div className="absolute top-12 right-12 md:top-20 md:right-24 w-24 h-24 bg-amber-200/40 rounded-full blur-xl pointer-events-none" />

        {/* Layered Vector Mountain Landscape (From Hero) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-end z-0">
          <svg
            className="w-full h-[160px] md:h-[220px] text-emerald-900/10 fill-current opacity-60"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,229.3C840,224,960,160,1080,138.7C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
          <div className="relative -mt-16">
            <svg
              className="w-full h-[100px] md:h-[160px] text-emerald-600/20 fill-current"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path d="M0,256L120,240C240,224,480,192,720,202.7C960,213,1200,267,1320,293.3L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" />
              
              {/* Trees */}
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
          <div className="w-full h-8 md:h-12 bg-gradient-to-b from-slate-200/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-md mx-auto md:ml-0 md:mr-auto p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight text-slate-900">
            Waste management, simplified.
          </h2>
          <p className="text-slate-600 text-base mb-10 max-w-sm leading-relaxed">
            Download the mobile app to report overflowing bins, track collection trucks live, and get instant schedule updates.
          </p>

          <motion.div 
            className="relative flex flex-col sm:flex-row items-center gap-6 bg-white/70 border border-white p-5 rounded-xl shadow-sm backdrop-blur-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-500 overflow-hidden group"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
          >
            {/* Modern Frosted Glass Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[1px] opacity-100 transition-opacity">
              <div className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                App Coming Soon
              </div>
            </div>

            {/* Mock QR Code */}
            <div className="shrink-0 bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 rotate-[-2deg] opacity-80 grayscale">
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://bin-go.app" 
                  alt="Download Bin-Go App"
                  className="w-24 h-24 rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full opacity-80 grayscale">
              <div className="text-sm font-bold text-slate-600 mb-2">
                Scan to download
              </div>
              <div className="flex flex-col gap-3 pointer-events-none">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on the App Store"
                  className="h-10 w-auto brightness-110"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play"
                  className="h-10 w-auto brightness-110"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
