import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { CATEGORY_MAP, formatDateShort, getDeadlineInfo } from '../../lib/constants';
import {
  LayoutDashboard, PlusCircle, ClipboardList, Users,
  ArrowRight, Building2, TrendingUp, Eye,
} from 'lucide-react';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const profile = user?.companyProfile;

  useEffect(() => {
    api.get('/opportunities/company').then(({ data }) => setListings(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const totalApplicants = listings.reduce((sum, l) => sum + (l._count?.applications || 0), 0);
  const activeListings = listings.filter((l) => l.status === 'ACTIVE').length;
  const pendingListings = listings.filter((l) => l.status === 'PENDING').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-h1 mb-1">
          Selamat datang, {profile?.companyName || 'Perusahaan'}
        </h1>
        <p className="text-text-secondary">Kelola peluang dan pantau pelamar dari dashboard ini.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: ClipboardList, value: listings.length, label: 'Total Peluang' },
          { icon: TrendingUp, value: activeListings, label: 'Peluang Aktif' },
          { icon: Eye, value: pendingListings, label: 'Menunggu Review' },
          { icon: Users, value: totalApplicants, label: 'Total Pelamar' },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="glass-card-static p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-text-primary">{value}</p>
              <p className="text-xs text-text-secondary">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link to="/perusahaan/buat-peluang" className="btn btn-primary btn-md">
          <PlusCircle className="w-4 h-4" /> Buat Peluang Baru
        </Link>
        <Link to="/perusahaan/kelola" className="btn btn-secondary btn-md">
          <ClipboardList className="w-4 h-4" /> Kelola Peluang
        </Link>
      </div>

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-h3">Peluang Terbaru</h2>
          <Link to="/perusahaan/kelola" className="text-sm text-primary font-medium flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 rounded-glass" />)}
          </div>
        ) : listings.length > 0 ? (
          <div className="space-y-3">
            {listings.slice(0, 5).map((listing) => {
              const cat = CATEGORY_MAP[listing.category] || {};
              const statusColors = {
                ACTIVE: 'badge-accepted',
                PENDING: 'badge-viewed',
                REJECTED: 'badge-rejected',
              };
              const statusLabels = { ACTIVE: 'Aktif', PENDING: 'Menunggu', REJECTED: 'Ditolak' };
              return (
                <Link key={listing.id} to={`/peluang/${listing.id}`}
                  className="glass-card-static p-4 flex items-center gap-4 block">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{listing.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge ${cat.color}`}>{cat.label}</span>
                      <span className={`badge ${statusColors[listing.status] || ''}`}>{statusLabels[listing.status]}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-primary">{listing._count?.applications || 0}</p>
                    <p className="text-xs text-text-secondary">pelamar</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="glass-card-static p-8 text-center">
            <Building2 className="w-10 h-10 text-text-placeholder mx-auto mb-3" />
            <h3 className="font-heading text-h3 mb-2">Belum ada peluang</h3>
            <p className="text-text-secondary text-sm mb-4">Mulai posting peluang magang, kompetisi, atau pelatihan untuk menjangkau mahasiswa terbaik.</p>
            <Link to="/perusahaan/buat-peluang" className="btn btn-primary btn-sm">
              <PlusCircle className="w-4 h-4" /> Buat Peluang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
