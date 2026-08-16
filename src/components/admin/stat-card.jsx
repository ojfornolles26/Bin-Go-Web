export default function StatCard({ label, value, icon: Icon, trend }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3.5 shadow-xs">
      <div className="flex items-center gap-2.5">
        <Icon className="w-6.5 h-6.5 text-slate-700 stroke-[2] shrink-0" />
        <span className="text-sm font-medium text-slate-600">{label}</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </div>
        {trend && (
          <div
            className={`text-xs font-medium mt-1 flex items-center gap-1 ${trend.isPositive ? "text-emerald-600" : "text-red-600"}`}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
