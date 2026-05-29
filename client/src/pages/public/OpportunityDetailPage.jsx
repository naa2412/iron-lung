import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { CATEGORY_MAP, LOCATION_MAP, getDeadlineInfo, formatDate } from '../../lib/constants';
import {
  ArrowLeft, MapPin, Clock, Calendar, ExternalLink, Send,
  Bookmark, BookmarkCheck, AlertTriangle, CheckCircle2, Building2,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const [opp, setOpp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    api.get(`/opportunities/${id}`).then(({ data }) => setOpp(data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    try {
      if (opp.isSaved) {
        await api.delete(`/saved/${id}`);
        setOpp({ ...opp, isSaved: false });
        toast.success('Dihapus dari simpanan');
      } else {
        await api.post(`/saved/${id}`);
        setOpp({ ...opp, isSaved: true });
        toast.success('Peluang disimpan');
      }
    } catch { toast.error('Gagal menyimpan'); }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplying(true);
    try {
      await api.post('/applications', { opportunityId: id, coverLetter, portfolioUrl });
      setOpp({ ...opp, hasApplied: true });
      setShowApplyForm(false);
      toast.success('Lamaran berhasil dikirim!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal mengirim lamaran');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-1/3" />
      <div className="skeleton h-6 w-2/3" />
      <div className="skeleton h-64 w-full rounded-glass" />
    </div>
  );

  if (!opp) return (
    <div className="text-center py-16">
      <AlertTriangle className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
      <h2 className="font-heading text-h2 mb-2">Peluang Tidak Ditemukan</h2>
      <Link to="/peluang" className="btn btn-primary btn-md mt-4">Kembali ke Jelajahi</Link>
    </div>
  );

  const category = CATEGORY_MAP[opp.category] || {};
  const deadline = getDeadlineInfo(opp.deadline);

  return (
    <div>
      <Link to="/peluang" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Jelajahi
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card-static p-6">
            <div className="flex items-start gap-4 mb-4">
              {opp.company?.logoUrl ? (
                <img src={opp.company.logoUrl} alt={opp.company.companyName}
                  className="w-14 h-14 rounded-xl object-contain bg-white border border-slate-100 p-1" />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
              )}
              <div>
                <p className="text-sm text-text-secondary">{opp.company?.companyName}</p>
                <h1 className="font-heading text-h2 text-text-primary">{opp.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`badge ${category.color}`}>{category.label}</span>
                  <span className={`badge ${deadline.urgency === 'urgent' ? 'badge-urgent' : deadline.urgency === 'soon' ? 'badge-soon' : 'badge-normal'}`}>
                    {deadline.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-text-body mb-6">
              <h3 className="font-heading text-h3 mb-3">Deskripsi</h3>
              <p className="whitespace-pre-line">{opp.description}</p>
            </div>

            {opp.requirements?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-heading text-h3 mb-3">Persyaratan</h3>
                <ul className="space-y-2">
                  {opp.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {opp.skillsRequired?.length > 0 && (
              <div>
                <h3 className="font-heading text-h3 mb-3">Skill yang Dibutuhkan</h3>
                <div className="flex flex-wrap gap-2">
                  {opp.skillsRequired.map((skill) => (
                    <span key={skill} className="inline-flex items-center text-xs leading-5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium whitespace-nowrap">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <div className="glass-card-static p-5 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-text-secondary" />
              <span>Deadline: <strong>{formatDate(opp.deadline)}</strong></span>
            </div>
            {opp.locationType && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-text-secondary" />
                <span>{LOCATION_MAP[opp.locationType]}{opp.city ? `, ${opp.city}` : ''}</span>
              </div>
            )}
            {opp.duration && (
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-text-secondary" />
                <span>{opp.duration}</span>
              </div>
            )}

            {/* Match Score */}
            {opp.matchScore && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Kecocokan</span>
                  <span className="font-bold text-primary">{opp.matchScore.score}%</span>
                </div>
                <div className="match-bar">
                  <div className="match-bar-fill" style={{ width: `${opp.matchScore.score}%` }} />
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Bidang minatmu cocok {opp.matchScore.interestOverlap} dari {opp.matchScore.totalInterestFields} dengan peluang ini
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            {opp.hasApplied ? (
              <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                <CheckCircle2 className="w-5 h-5 text-success mx-auto mb-1" />
                <p className="text-sm font-medium text-success">Kamu sudah melamar</p>
              </div>
            ) : opp.registrationUrl ? (
              <a href={opp.registrationUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary btn-lg w-full">
                <ExternalLink className="w-4 h-4" /> Daftar via Link Eksternal
              </a>
            ) : (
              <button onClick={() => setShowApplyForm(!showApplyForm)} className="btn btn-primary btn-lg w-full">
                <Send className="w-4 h-4" /> Lamar Sekarang
              </button>
            )}

            <button onClick={handleSave} className="btn btn-secondary btn-md w-full">
              {opp.isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              {opp.isSaved ? 'Tersimpan' : 'Simpan Peluang'}
            </button>
          </div>

          {/* Apply Form */}
          {showApplyForm && (
            <div className="glass-card-static p-5">
              <h3 className="font-heading text-h3 mb-4">Form Lamaran</h3>
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="input-label">Surat Pengantar</label>
                  <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4} placeholder="Tulis motivasi kamu..."
                    className="input-field resize-none" />
                </div>
                <div>
                  <label className="input-label">Link Portofolio (opsional)</label>
                  <input type="url" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/username" className="input-field" />
                </div>
                <button type="submit" disabled={applying} className="btn btn-primary btn-md w-full">
                  {applying ? 'Mengirim...' : 'Kirim Lamaran'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
