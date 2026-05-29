import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { STATUS_MAP, formatDateShort } from '../../lib/constants';
import { Users, ArrowLeft, CheckCircle2, XCircle, Eye, User, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApplicantsPage() {
  const { opportunityId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = () => {
    const url = opportunityId ? `/applications/opportunity/${opportunityId}` : '/applications/opportunity/all';
    api.get(url).then(({ data }) => setApplicants(data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchApplicants(); }, [opportunityId]);

  const updateStatus = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status });
      toast.success(status === 'ACCEPTED' ? 'Pelamar diterima' : status === 'REJECTED' ? 'Pelamar ditolak' : 'Status diperbarui');
      fetchApplicants();
    } catch { toast.error('Gagal memperbarui status'); }
  };

  return (
    <div>
      {opportunityId && (
        <Link to="/perusahaan/kelola" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Kelola Peluang
        </Link>
      )}
      <h1 className="font-heading text-h1 mb-6">
        {opportunityId ? 'Daftar Pelamar' : 'Semua Pelamar'}
      </h1>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-glass" />)}</div>
      ) : applicants.length > 0 ? (
        <div className="space-y-3">
          {applicants.map((app) => {
            const status = STATUS_MAP[app.status] || { label: app.status, color: '' };
            return (
              <div key={app.id} className="glass-card-static p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {app.student?.avatarUrl ? (
                      <img src={app.student.avatarUrl} className="w-10 h-10 rounded-full object-cover" alt="" />
                    ) : (
                      <User className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary">{app.student?.name}</p>
                    <p className="text-xs text-text-secondary">
                      {app.student?.university} · {app.student?.studyProgram} · Semester {app.student?.semester}
                    </p>
                    {app.student?.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {app.student.skills.slice(0, 4).map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-text-secondary">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`badge ${status.color}`}>{status.label}</span>
                  {app.status === 'APPLIED' || app.status === 'VIEWED' ? (
                    <>
                      <button onClick={() => updateStatus(app.id, 'ACCEPTED')} className="btn btn-ghost btn-sm text-success" title="Terima">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(app.id, 'REJECTED')} className="btn btn-ghost btn-sm text-danger" title="Tolak">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  ) : null}
                  {app.student?.id && (
                    <Link to={`/profil/${app.student.id}`} className="btn btn-ghost btn-sm" title="Lihat Profil">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card-static p-12 text-center">
          <Users className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Belum ada pelamar</h3>
          <p className="text-text-secondary text-sm">Pelamar akan muncul di sini setelah mahasiswa melamar ke peluang kamu.</p>
        </div>
      )}
    </div>
  );
}
