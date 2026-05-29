import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Users, Building2, Briefcase, Send, TrendingUp, BarChart3, PieChart } from 'lucide-react';

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="glass-card-static p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-text-primary">{value}</p>
        <p className="text-xs text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

function SimpleBarChart({ data, labelKey, valueKey }) {
  const maxVal = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-text-secondary">{item[labelKey]}</span>
            <span className="font-semibold text-text-primary">{item[valueKey]}</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${(item[valueKey] / maxVal) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SimplePieVisual({ data }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500'];
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${colors[i] || 'bg-slate-400'}`} />
          <span className="text-sm text-text-secondary flex-1">{item.role}</span>
          <span className="text-sm font-semibold text-text-primary">{item.count}</span>
          <span className="text-xs text-text-placeholder">({total > 0 ? Math.round((item.count / total) * 100) : 0}%)</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [regData, setRegData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/analytics/registrations'),
      api.get('/admin/analytics/categories'),
      api.get('/admin/analytics/roles'),
    ]).then(([s, r, c, ro]) => {
      setStats(s.data);
      setRegData(r.data);
      setCatData(c.data);
      setRoleData(ro.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 rounded-glass" />)}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-64 rounded-glass" />)}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Dashboard Admin</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} value={stats?.totalUsers || 0} label="Total Mahasiswa" />
        <StatCard icon={Building2} value={stats?.totalCompanies || 0} label="Total Perusahaan" />
        <StatCard icon={Briefcase} value={stats?.activeOpportunities || 0} label="Peluang Aktif" />
        <StatCard icon={Send} value={stats?.todayApplications || 0} label="Lamaran Hari Ini" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <div className="glass-card-static p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-h3">Registrasi per Minggu</h3>
          </div>
          <SimpleBarChart data={regData} labelKey="week" valueKey="count" />
        </div>

        {/* Category Distribution */}
        <div className="glass-card-static p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-h3">Peluang per Kategori</h3>
          </div>
          <SimpleBarChart data={catData} labelKey="label" valueKey="count" />
        </div>

        {/* Role Distribution */}
        <div className="glass-card-static p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-h3">Distribusi Pengguna</h3>
          </div>
          <SimplePieVisual data={roleData} />
        </div>
      </div>
    </div>
  );
}
