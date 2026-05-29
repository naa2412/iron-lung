import { useState } from 'react';
import api from '../../lib/api';
import { Search, User, GraduationCap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CandidateSearchPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const params = search ? `?search=${encodeURIComponent(search)}` : '';
      const { data } = await api.get(`/candidates${params}`);
      setCandidates(data);
    } catch {
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Cari Kandidat</h1>

      <div className="glass-card-static p-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan nama, universitas, atau skill..."
              className="input-field pl-10" />
          </div>
          <button type="submit" className="btn btn-primary btn-md">Cari</button>
        </form>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-glass" />)}</div>
      ) : candidates.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {candidates.map((c) => (
            <div key={c.id} className="glass-card-static p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                {c.avatarUrl ? (
                  <img src={c.avatarUrl} className="w-12 h-12 rounded-full object-cover" alt="" />
                ) : (
                  <User className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-text-primary text-sm">{c.name}</h3>
                <p className="text-xs text-text-secondary flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" /> {c.university} · {c.studyProgram} · Sem {c.semester}
                </p>
                {c.bio && <p className="text-xs text-text-body mt-1 line-clamp-2">{c.bio}</p>}
                {c.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skills.slice(0, 5).map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-text-secondary">{s}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-placeholder">{c._count?.portfolioEntries || 0} entri portofolio</span>
                  <Link to={`/profil/${c.id}`} className="text-xs text-primary font-medium flex items-center gap-0.5">
                    Lihat Profil <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : searched ? (
        <div className="glass-card-static p-12 text-center">
          <Search className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Tidak ada kandidat ditemukan</h3>
          <p className="text-text-secondary text-sm">Coba ubah kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="glass-card-static p-12 text-center">
          <User className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Cari Kandidat Terbaik</h3>
          <p className="text-text-secondary text-sm">Gunakan fitur pencarian untuk menemukan mahasiswa yang sesuai dengan kebutuhan perusahaan kamu.</p>
        </div>
      )}
    </div>
  );
}
