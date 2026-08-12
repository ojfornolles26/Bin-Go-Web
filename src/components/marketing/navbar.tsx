"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const navLinks = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About", href: "/#about" },
  { id: "features", label: "Features", href: "/#features" },
  { id: "faq", label: "FAQ", href: "/#faq" },
  { id: "register-link", label: "Register", href: "/register" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) < 10) return;

      if (currentScrollY > 100 && scrollDelta > 0) {
        setVisible(false);
      } else if (scrollDelta < 0) {
        setVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string, href: string) => {
    setActiveTab(id);
    window.dispatchEvent(new CustomEvent("bingo-tab-change", { detail: id }));
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
      visible || mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0 pointer-events-none"
    }`}>
      <nav className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full px-5 py-2 shadow-lg shadow-slate-900/5 flex items-center justify-between transition-all">
        {/* Prominent Dashboard Logo Image */}
        <Link href="/" className="flex items-center overflow-hidden py-0.5">
          <Image 
            src="/logo.jpg" 
            alt="Bin'Go Logo" 
            width={280} 
            height={100} 
            className="h-12 md:h-14 w-auto object-contain mix-blend-multiply scale-[1.5]"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = link.href === "/register" 
              ? pathname === "/register" 
              : (pathname === "/" && (activeTab === link.id || (!activeTab && link.id === "home")));
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.id, link.href)}
                className={`text-sm font-semibold transition-colors cursor-pointer py-1 px-1.5 ${
                  isActive
                    ? "text-emerald-600 font-bold"
                    : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/register">
            <Button variant="primary" size="sm" className="rounded-full px-5 font-semibold shadow-2xs">
              Request a Demo
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" strokeWidth={2} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = link.href === "/register" 
              ? pathname === "/register" 
              : (pathname === "/" && (activeTab === link.id || (!activeTab && link.id === "home")));
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => handleNavClick(link.id, link.href)}
                  className={`text-sm font-semibold text-left py-2 px-3 rounded-xl transition-colors ${
                    isActive
                      ? "text-emerald-600 font-bold bg-slate-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="sm" className="w-full mt-2 rounded-full font-semibold">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
