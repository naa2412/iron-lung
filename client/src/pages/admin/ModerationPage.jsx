import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { CATEGORY_MAP, formatDateShort } from '../../lib/constants';
import { CheckSquare, CheckCircle2, XCircle, Clock, AlertTriangle, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ModerationPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState('');

  const fetchPending = () => {
    api.get('/admin/opportunities/pending').then(({ data }) => setOpportunities(data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/opportunities/${id}/approve`);
      toast.success('Peluang berhasil disetujui');
      fetchPending();
    } catch { toast.error('Gagal menyetujui peluang'); }
  };

  const handleReject = async () => {
    if (!reason.trim()) { toast.error('Alasan penolakan wajib diisi'); return; }
    try {
      await api.put(`/admin/opportunities/${rejectId}/reject`, { reason });
      toast.success('Peluang berhasil ditolak');
      setRejectId(null);
      setReason('');
      fetchPending();
    } catch { toast.error('Gagal menolak peluang'); }
  };

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Moderasi Peluang</h1>

      {/* Reject Modal */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setRejectId(null)}>
          <div className="glass-card-static p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-h3 mb-4">Tolak Peluang</h3>
            <div>
              <label className="input-label">Alasan Penolakan</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)}
                rows={3} placeholder="Berikan alasan penolakan..." className="input-field resize-none" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => { setRejectId(null); setReason(''); }} className="btn btn-ghost btn-md">Batal</button>
              <button onClick={handleReject} className="btn btn-danger btn-md">
                <XCircle className="w-4 h-4" /> Tolak
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-glass" />)}</div>
      ) : opportunities.length > 0 ? (
        <div className="space-y-3">
          {opportunities.map((opp) => {
            const cat = CATEGORY_MAP[opp.category] || {};
            return (
              <div key={opp.id} className="glass-card-static p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-text-primary text-sm">{opp.title}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {opp.company?.companyName} · {formatDateShort(opp.createdAt)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`badge ${cat.color}`}>{cat.label}</span>
                    <span className="badge badge-viewed"><Clock className="w-3 h-3" /> Menunggu</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleApprove(opp.id)} className="btn btn-sm bg-success text-white hover:brightness-105">
                    <CheckCircle2 className="w-4 h-4" /> Setujui
                  </button>
                  <button onClick={() => setRejectId(opp.id)} className="btn btn-danger btn-sm">
                    <XCircle className="w-4 h-4" /> Tolak
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card-static p-12 text-center">
          <CheckSquare className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Tidak ada peluang menunggu review</h3>
          <p className="text-text-secondary text-sm">Semua peluang sudah dimoderasi. Peluang baru akan muncul di sini setelah dikirim oleh perusahaan.</p>
        </div>
      )}
    </div>
  );
}
