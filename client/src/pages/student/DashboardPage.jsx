import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OpportunityCard from '../../components/opportunity/OpportunityCard';
import api from '../../lib/api';
import {
  Send, Bookmark, FolderOpen, Award, ArrowRight,
  Briefcase, Trophy, Search, Clock, CheckCircle2,
  AlertTriangle, TrendingUp,
} from 'lucide-react';

function StatCard({ icon: Icon, value, label, color = 'text-primary' }) {
  return (
    <div className="glass-card-static p-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-text-primary">{value}</p>
        <p className="text-xs text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

function ProfileCompletionBar({ completion }) {
  if (!completion) return null;

  const linkMap = {
    'Foto profil': '/profil',
    'Bio': '/profil',
    'Skill (minimal 3)': '/profil',
    'Minat diisi': '/profil',
    'Upload CV': '/profil',
    'Tambah 1 portofolio': '/portofolio',
  };

  return (
    <div className="glass-card-static p-5 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-heading font-semibold text-sm text-text-primary">Kelengkapan Profil</h3>
        <span className="text-sm font-bold text-primary">{completion.percentage}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${completion.percentage}%` }} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {completion.items?.map((item) => {
          const to = linkMap[item.label] || '/profil';
          return (
            <Link key={item.label} to={item.done ? '#' : to}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                !item.done ? 'hover:text-primary cursor-pointer' : ''
              }`}>
              {item.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
              )}
              <span className={item.done ? 'text-text-secondary' : 'text-text-primary font-medium'}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {completion.percentage < 100 && (
        <Link to="/profil" className="inline-block text-xs text-primary mt-2 font-medium hover:underline">
          {completion.percentage >= 80
            ? 'Hampir sempurna! Klik untuk melengkapi profilmu.'
            : 'Lengkapi profilmu untuk rekomendasi yang lebih baik.'}
        </Link>
      )}
    </div>
  );
}


export default function StudentDashboard() {
  const { user } = useAuth();
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const profile = user?.studentProfile;
  const stats = profile?._count || {};
  const completion = user?.profileCompletion;

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/opportunities/recommended?limit=6');
        setRecommended(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="font-heading text-h1 mb-1">
          Selamat datang kembali, {profile?.name?.split(' ')[0]}
        </h1>
        <p className="text-text-secondary">
          Temukan peluang baru yang cocok dengan minat dan skillmu.
        </p>
      </div>

      {/* Profile Completion */}
      <ProfileCompletionBar completion={completion} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Send} value={stats.applications || 0} label="Lamaran Terkirim" />
        <StatCard icon={Bookmark} value={stats.savedOpportunities || 0} label="Peluang Tersimpan" />
        <StatCard icon={FolderOpen} value={stats.portfolioEntries || 0} label="Entri Portofolio" />
        <StatCard icon={Award} value={profile?.badges?.length || 0} label="Badge Diraih" />
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { to: '/peluang?category=INTERNSHIP', icon: Briefcase, label: 'Cari Magang' },
          { to: '/peluang?category=COMPETITION', icon: Trophy, label: 'Cari Kompetisi' },
          { to: '/portofolio', icon: FolderOpen, label: 'Portofolio Saya' },
          { to: '/peluang', icon: Search, label: 'Jelajahi Semua' },
        ].map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className="btn btn-secondary btn-sm">
            <Icon className="w-4 h-4" /> {label}
          </Link>
        ))}
      </div>

      {/* Recommended */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-h3">Direkomendasikan Untukmu</h2>
          <Link to="/peluang" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card-static p-5">
                <div className="skeleton h-4 w-1/3 mb-3" />
                <div className="skeleton h-5 w-3/4 mb-2" />
                <div className="skeleton h-4 w-1/2 mb-4" />
                <div className="skeleton h-2 w-full" />
              </div>
            ))}
          </div>
        ) : recommended.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} showMatchScore />
            ))}
          </div>
        ) : (
          <div className="glass-card-static p-8 text-center">
            <Search className="w-10 h-10 text-text-placeholder mx-auto mb-3" />
            <p className="text-text-secondary mb-2">Belum ada rekomendasi yang cocok</p>
            <p className="text-sm text-text-placeholder mb-4">Lengkapi profil dan minat kamu untuk mendapatkan rekomendasi yang lebih baik.</p>
            <Link to="/peluang" className="btn btn-primary btn-sm">Jelajahi Semua Peluang</Link>
          </div>
        )}
      </section>
    </div>
  );
}
