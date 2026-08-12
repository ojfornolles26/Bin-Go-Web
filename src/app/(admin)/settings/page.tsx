'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  Eye, 
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 1. Profile State
  const [profile, setProfile] = useState({
    entityName: 'LGU City of Cebu - Solid Waste Management Division',
    adminName: 'Officer Maria Santos',
    email: 'm.santos@cebucity.gov.ph',
    phone: '+63 (032) 253-1111',
    jurisdiction: 'Brgy. Guadalupe (Metro Cebu)',
    officeAddress: 'City Hall Bldg, M.C. Briones St, Cebu City',
  });

  const [savingProfile, setSavingProfile] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      showToast('Profile settings saved.');
    }, 600);
  };

  // 2. Notification Preferences State
  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    gpsWarnings: true,
    dailySummary: true,
    citizenDisputes: false,
    soundChime: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Notification preferences updated.');
      return updated;
    });
  };

  // 3. Operational Parameters State
  const [params, setParams] = useState({
    geofenceRadius: '500',
    maxOpenTickets: '10',
    slaEscalationHours: '24',
    routingMode: 'auto-nearest',
  });

  const [savingParams, setSavingParams] = useState(false);

  const handleParamsSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingParams(true);
    setTimeout(() => {
      setSavingParams(false);
      showToast('Operational parameters saved.');
    }, 600);
  };

  // 4. Security & Password State
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword) {
      showToast('Please fill out all required password fields.');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast('New passwords do not match.');
      return;
    }
    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Password updated successfully.');
    }, 700);
  };

  // Sessions state
  const [sessions, setSessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows 11',
      location: 'Cebu City Hall Command Center (112.198.118.2)',
      activeNow: true,
      lastActive: 'Active Now',
    },
    {
      id: '2',
      device: 'Safari on iPad OS',
      location: 'Field Inspector Unit 4 (112.198.120.45)',
      activeNow: false,
      lastActive: '2 hours ago',
    },
  ]);

  const revokeOtherSessions = () => {
    setSessions(prev => prev.filter(s => s.activeNow));
    showToast('Other administrative sessions revoked.');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Toast Feedback Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: Administrator Profile */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                LGU Entity Name
              </label>
              <input
                type="text"
                value={profile.entityName}
                onChange={e => setProfile({ ...profile, entityName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Administrator Name
              </label>
              <input
                type="text"
                value={profile.adminName}
                onChange={e => setProfile({ ...profile, adminName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Barangay Jurisdiction
              </label>
              <select
                value={profile.jurisdiction}
                onChange={e => setProfile({ ...profile, jurisdiction: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900 cursor-pointer"
              >
                <option value="Brgy. Guadalupe (Metro Cebu)">Brgy. Guadalupe (Metro Cebu)</option>
                <option value="Brgy. Lahug (Metro Cebu)">Brgy. Lahug (Metro Cebu)</option>
                <option value="Brgy. Mabolo (Metro Cebu)">Brgy. Mabolo (Metro Cebu)</option>
                <option value="Brgy. Kasambagan (Metro Cebu)">Brgy. Kasambagan (Metro Cebu)</option>
                <option value="Brgy. Tisa (Metro Cebu)">Brgy. Tisa (Metro Cebu)</option>
                <option value="Brgy. Labangon (Metro Cebu)">Brgy. Labangon (Metro Cebu)</option>
                <option value="Brgy. Talamban (Metro Cebu)">Brgy. Talamban (Metro Cebu)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Office Address
              </label>
              <input
                type="text"
                value={profile.officeAddress}
                onChange={e => setProfile({ ...profile, officeAddress: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={savingProfile}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-2xl text-xs transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs active:scale-[0.98]"
            >
              {savingProfile && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Profile</span>
            </Button>
          </div>
        </form>
      </section>

      {/* SECTION 2: Notification Preferences */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="divide-y divide-slate-100">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Critical Dumping Alerts</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Immediate dispatch notification for high & critical priority dumping reports.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleNotification('criticalAlerts')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                notifications.criticalAlerts ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  notifications.criticalAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Truck GPS Signal & Idle Warnings</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Notify when garbage trucks lose GPS connection or idle over 15 minutes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleNotification('gpsWarnings')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                notifications.gpsWarnings ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  notifications.gpsWarnings ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Daily Fleet Summary Reports</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated morning report on collection metrics at 07:00 AM PHT.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleNotification('dailySummary')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                notifications.dailySummary ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  notifications.dailySummary ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4 */}
          <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Audio Chime on Emergency Reports</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Play audible alert sound in command center tab for emergency reports.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleNotification('soundChime')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                notifications.soundChime ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  notifications.soundChime ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: LGU Operational Parameters */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <form onSubmit={handleParamsSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Arrival Radius (meters)
              </label>
              <input
                type="number"
                min="100"
                max="2000"
                step="50"
                value={params.geofenceRadius}
                onChange={e => setParams({ ...params, geofenceRadius: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Tickets per Truck
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={params.maxOpenTickets}
                onChange={e => setParams({ ...params, maxOpenTickets: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Auto-Escalation SLA (hours)
              </label>
              <input
                type="number"
                min="1"
                max="72"
                value={params.slaEscalationHours}
                onChange={e => setParams({ ...params, slaEscalationHours: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Ticket Routing
              </label>
              <select
                value={params.routingMode}
                onChange={e => setParams({ ...params, routingMode: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900 cursor-pointer"
              >
                <option value="auto-nearest">Auto-Assign Nearest Available Truck</option>
                <option value="manual">Manual Command Center Dispatch</option>
                <option value="barangay-supervisor">Barangay Supervisor Approval Required</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={savingParams}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-2xl text-xs transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs active:scale-[0.98]"
            >
              {savingParams && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Parameters</span>
            </Button>
          </div>
        </form>
      </section>

      {/* SECTION 4: Security & Access Control */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={passwords.currentPassword}
                  onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pr-9 pl-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={passwords.newPassword}
                  onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pr-9 pl-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
              />
            </div>
          </div>

          <div className="pt-1 flex justify-end">
            <Button
              type="submit"
              disabled={savingPassword}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-2xl text-xs transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs active:scale-[0.98]"
            >
              {savingPassword && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>Update Password</span>
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
