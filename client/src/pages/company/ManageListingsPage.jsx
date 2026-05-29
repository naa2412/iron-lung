import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { CATEGORY_MAP, formatDateShort, getDeadlineInfo } from '../../lib/constants';
import { ClipboardList, PlusCircle, Trash2, Users, Eye, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = () => {
    api.get('/opportunities/company').then(({ data }) => setListings(data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchListings(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus peluang ini? Tindakan ini tidak bisa dibatalkan.')) return;
    try {
      await api.delete(`/opportunities/${id}`);
      toast.success('Peluang berhasil dihapus');
      fetchListings();
    } catch { toast.error('Gagal menghapus peluang'); }
  };

  const statusColors = { ACTIVE: 'badge-accepted', PENDING: 'badge-viewed', REJECTED: 'badge-rejected' };
  const statusLabels = { ACTIVE: 'Aktif', PENDING: 'Menunggu Review', REJECTED: 'Ditolak' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-h1">Kelola Peluang</h1>
        <Link to="/perusahaan/buat-peluang" className="btn btn-primary btn-md">
          <PlusCircle className="w-4 h-4" /> Buat Baru
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-glass" />)}</div>
      ) : listings.length > 0 ? (
        <div className="space-y-3">
          {listings.map((listing) => {
            const cat = CATEGORY_MAP[listing.category] || {};
            const deadline = getDeadlineInfo(listing.deadline);
            return (
              <div key={listing.id} className="glass-card-static p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-text-primary text-sm">{listing.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`badge ${cat.color}`}>{cat.label}</span>
                    <span className={`badge ${statusColors[listing.status] || ''}`}>{statusLabels[listing.status]}</span>
                    <span className="text-xs text-text-secondary">{deadline.label}</span>
                  </div>
                  {listing.status === 'REJECTED' && listing.rejectionReason && (
                    <p className="text-xs text-danger mt-1">Alasan: {listing.rejectionReason}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link to={`/perusahaan/pelamar/${listing.id}`} className="btn btn-ghost btn-sm">
                    <Users className="w-4 h-4" /> {listing._count?.applications || 0} Pelamar
                  </Link>
                  <Link to={`/peluang/${listing.id}`} className="btn btn-ghost btn-sm">
                    <Eye className="w-4 h-4" /> Lihat
                  </Link>
                  <button onClick={() => handleDelete(listing.id)} className="btn btn-ghost btn-sm text-danger">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card-static p-12 text-center">
          <Building2 className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Belum ada peluang</h3>
          <p className="text-text-secondary text-sm mb-4">Mulai buat peluang untuk menjangkau mahasiswa terbaik Indonesia.</p>
          <Link to="/perusahaan/buat-peluang" className="btn btn-primary btn-sm"><PlusCircle className="w-4 h-4" /> Buat Peluang</Link>
        </div>
      )}
    </div>
  );
}
