import { TrendingUp, AlertTriangle, Users, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  note: string;
}

const stats: Stat[] = [
  {
    icon: AlertTriangle,
    value: "68%",
    label: "of residents report illegal dumping",
    note: "Community survey, Metro Cebu 2024",
  },
  {
    icon: Truck,
    value: "42%",
    label: "miss regular waste pickup",
    note: "Barangay-level survey, n=1,200",
  },
  {
    icon: Users,
    value: "87%",
    label: "would use a reporting app",
    note: "Respondents from 6 LGUs",
  },
  {
    icon: TrendingUp,
    value: "3.2x",
    label: "faster LGU response with GPS reports",
    note: "Pilot data, Cebu City Q1 2024",
  },
];

export function DataSummary() {
  return (
    <section id="data" className="py-16 md:py-24 bg-white border-y border-slate-200">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Context */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              The data behind Bin&apos;Go
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Metro Cebu generates over 2,500 metric tons of solid waste daily
              across its 13 cities and municipalities. Our community surveys
              reveal a clear demand for better waste management tools at the
              barangay level.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Data sourced from community surveys conducted across Metro Cebu
              barangays in partnership with local government units.
            </p>
          </div>

          {/* Right: Stats Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="border border-slate-200 rounded-lg p-5 bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon
                          className="w-4 h-4 text-emerald-600"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-slate-900 tracking-tight">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-sm text-slate-700 leading-snug">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          {stat.note}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
