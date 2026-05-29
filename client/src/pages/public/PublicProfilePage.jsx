import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { PORTFOLIO_TYPE_MAP, BADGE_MAP, formatDate } from '../../lib/constants';
import {
  User, MapPin, GraduationCap, Copy, CheckCircle2, ExternalLink,
  Briefcase, Trophy, Code2, Award, FolderOpen, Send, Bookmark,
  Handshake, Star, Flame,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BADGE_ICONS = { Send, FolderOpen, Bookmark, Trophy, Handshake, Briefcase, Star, Flame };
const TYPE_ICONS = { INTERNSHIP: Briefcase, PROJECT: Code2, COMPETITION: Trophy, CERTIFICATION: Award, TRAINING: GraduationCap };

export default function PublicProfilePage() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/profile/${profileId}`)
      .then(({ data }) => setProfile(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [profileId]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link profil berhasil disalin!');
  };

  if (loading) return (
    <div className="min-h-screen bg-mesh p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-48 rounded-glass" />
        <div className="skeleton h-32 rounded-glass" />
      </div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="glass-card-static p-12 text-center max-w-md">
        <User className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
        <h2 className="font-heading text-h2 mb-2">Profil Tidak Ditemukan</h2>
        <p className="text-text-secondary text-sm mb-4">Profil yang kamu cari tidak tersedia.</p>
        <Link to="/" className="btn btn-primary btn-md">Kembali ke Beranda</Link>
      </div>
    </div>
  );

  const allBadgeTypes = Object.keys(BADGE_MAP);
  const earnedBadges = profile.badges?.map((b) => b.badgeType) || [];

  return (
    <div className="min-h-screen bg-mesh p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="glass-card-static p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-20 h-20 rounded-2xl object-cover" />
              ) : (
                <User className="w-10 h-10 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-h1 mb-1">{profile.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" /> {profile.university}
                </span>
                <span>{profile.studyProgram} · Semester {profile.semester}</span>
              </div>
              {profile.bio && <p className="text-sm text-text-body leading-relaxed">{profile.bio}</p>}

              {/* Skills */}
              {profile.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="badge bg-primary/10 text-primary">{skill}</span>
                  ))}
                </div>
              )}
            </div>
            <button onClick={copyLink} className="btn btn-secondary btn-sm flex-shrink-0">
              <Copy className="w-4 h-4" /> Bagikan Profil
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="glass-card-static p-6 mb-6">
          <h2 className="font-heading text-h3 mb-4">Badge Pencapaian</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allBadgeTypes.map((badgeType) => {
              const info = BADGE_MAP[badgeType];
              const earned = earnedBadges.includes(badgeType);
              const IconComponent = BADGE_ICONS[info.icon] || Award;
              return (
                <div key={badgeType} className={`p-4 rounded-xl text-center transition-all ${
                  earned ? 'bg-primary/5 border border-primary/20' : 'bg-slate-50 opacity-40 grayscale'
                }`} title={info.description}>
                  <IconComponent className={`w-6 h-6 mx-auto mb-2 ${earned ? 'text-primary' : 'text-text-secondary'}`} />
                  <p className={`text-xs font-medium ${earned ? 'text-text-primary' : 'text-text-secondary'}`}>{info.label}</p>
                  <p className="text-[10px] text-text-placeholder mt-0.5">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio Entries */}
        {profile.portfolioEntries?.length > 0 && (
          <div className="glass-card-static p-6">
            <h2 className="font-heading text-h3 mb-4">Portofolio</h2>
            <div className="space-y-3">
              {profile.portfolioEntries.map((entry) => {
                const Icon = TYPE_ICONS[entry.type] || Code2;
                return (
                  <div key={entry.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-white/60">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-primary">{PORTFOLIO_TYPE_MAP[entry.type]}</span>
                      <h3 className="font-heading font-semibold text-text-primary text-sm">{entry.title}</h3>
                      <p className="text-xs text-text-secondary">{entry.organization}{entry.date ? ` · ${formatDate(entry.date)}` : ''}</p>
                      {entry.description && <p className="text-xs text-text-body mt-1 line-clamp-2">{entry.description}</p>}
                      {entry.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.skills.map((s) => <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-text-secondary">{s}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
