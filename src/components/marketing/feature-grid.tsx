import { MapPin, Bell, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: MapPin,
    title: "Live GPS Tracking",
    description:
      "Track garbage truck positions in real time across Metro Cebu barangays. Know exactly when collection arrives at your area.",
  },
  {
    icon: Bell,
    title: "Proximity Push Alerts",
    description:
      "Receive automatic notifications when a collection vehicle is approaching your registered pickup point.",
  },
  {
    icon: Camera,
    title: "Geotagged Camera Reporter",
    description:
      "Snap a photo of illegal dumping. The app automatically tags the GPS coordinates and sends the report to your LGU.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Built for communities, powered by data
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Three core modules designed to solve Metro Cebu&apos;s
            waste management challenges at the barangay level.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Icon
                    className="w-5 h-5 text-emerald-600"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
