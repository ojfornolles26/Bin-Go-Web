import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#faq", label: "FAQ" },
  { href: "/register", label: "Request a Demo" },
];

const legalLinks = [
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#terms", label: "Terms of Service" },
  { href: "#contact", label: "Contact Support" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white text-slate-600">
      <div className="container-page max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-200/80">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <Link href="/" className="flex items-center overflow-hidden py-1 w-fit">
              <Image
                src="/logo.jpg"
                alt="Bin'Go Logo"
                width={240}
                height={80}
                className="h-12 w-auto object-contain mix-blend-multiply scale-[1.4]"
                priority
              />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md font-normal">
              Empowering Metro Cebu barangays with smart waste management, live compactor truck telemetry, and rapid illegal dumping response.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Platform</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Legal & Support</h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Bin&apos;Go Waste Management Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
