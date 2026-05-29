import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { STATUS_MAP, CATEGORY_MAP, formatDateShort } from '../../lib/constants';
import { ClipboardList, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/my').then(({ data }) => setApps(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div><h1 className="font-heading text-h1 mb-6">Lamaran Saya</h1>
      <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 rounded-glass" />)}</div>
    </div>
  );

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Lamaran Saya</h1>
      {apps.length === 0 ? (
        <div className="glass-card-static p-12 text-center">
          <ClipboardList className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Belum ada lamaran</h3>
          <p className="text-text-secondary text-sm mb-4">Kamu belum mengirim lamaran apapun. Mulai jelajahi peluang sekarang!</p>
          <Link to="/peluang" className="btn btn-primary btn-sm">Jelajahi Peluang</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => {
            const status = STATUS_MAP[app.status] || { label: app.status, color: '' };
            const category = CATEGORY_MAP[app.opportunity?.category] || {};
            return (
              <Link key={app.id} to={`/peluang/${app.opportunityId}`}
                className="glass-card p-4 flex items-center gap-4 block">
                {app.opportunity?.company?.logoUrl ? (
                  <img src={app.opportunity.company.logoUrl} alt="" className="w-10 h-10 rounded-lg object-contain bg-white border p-0.5" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {app.opportunity?.company?.companyName?.[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{app.opportunity?.title}</p>
                  <p className="text-xs text-text-secondary">{app.opportunity?.company?.companyName} · {formatDateShort(app.appliedAt)}</p>
                </div>
                <span className={`badge ${status.color}`}>{status.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
