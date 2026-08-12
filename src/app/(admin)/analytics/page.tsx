import StatCard from '@/components/admin/stat-card';
import { Clock, FileText, CheckCircle } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Avg Response Time" value="4.2 hrs" icon={Clock} trend={{ value: '15% faster', isPositive: true }} />
        <StatCard label="Reports This Month" value="142" icon={FileText} trend={{ value: '8% more', isPositive: true }} />
        <StatCard label="Resolution Rate" value="89%" icon={CheckCircle} trend={{ value: '2% up', isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] shadow-sm">
          <div className="mb-4 text-slate-600">
            <FileText className="w-8 h-8 stroke-[1.75]" />
          </div>
          <h3 className="text-slate-600 font-medium">Reports by Category Chart</h3>
          <p className="text-sm text-slate-400 mt-1">Chart coming soon</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] shadow-sm">
          <div className="mb-4 text-slate-600">
            <Clock className="w-8 h-8 stroke-[1.75]" />
          </div>
          <h3 className="text-slate-600 font-medium">Resolution Time Trends</h3>
          <p className="text-sm text-slate-400 mt-1">Chart coming soon</p>
        </div>
      </div>
    </div>
  );
}
