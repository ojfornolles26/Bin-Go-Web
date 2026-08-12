import StatCard from '@/components/admin/stat-card';
import { mockDashboardStats, mockTickets } from '@/lib/mock-data';
import { FileText, Clock, RotateCw, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const recentTickets = mockTickets.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Reports" value={mockDashboardStats.totalReports} icon={FileText} trend={{ value: '12% from last month', isPositive: true }} />
        <StatCard label="Pending" value={mockDashboardStats.pending} icon={Clock} />
        <StatCard label="In Progress" value={mockDashboardStats.inProgress} icon={RotateCw} />
        <StatCard label="Resolved" value={mockDashboardStats.resolved} icon={CheckCircle2} />
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Urgency</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((ticket, index) => (
                <tr key={ticket.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{ticket.id}</td>
                  <td className="px-6 py-4">{ticket.location}, {ticket.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-2xs ${
                      ticket.urgency === 'Critical' ? 'bg-red-600' :
                      ticket.urgency === 'High' ? 'bg-orange-500' :
                      ticket.urgency === 'Medium' ? 'bg-amber-500' :
                      'bg-emerald-600'
                    }`}>
                      {ticket.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-bold ${
                      ticket.status === 'Pending' ? 'text-amber-700' :
                      ticket.status === 'In Progress' ? 'text-blue-700' :
                      'text-emerald-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
