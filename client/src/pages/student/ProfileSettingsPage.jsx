import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { INTEREST_OPTIONS } from '../../lib/constants';
import { User, Camera, Save, CheckCircle2, Upload, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfileSettingsPage() {
  const { user, refreshProfile } = useAuth();
  const profile = user?.studentProfile;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    university: '',
    studyProgram: '',
    semester: 1,
    bio: '',
    skills: '',
    interests: [],
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        university: profile.university || '',
        studyProgram: profile.studyProgram || '',
        semester: profile.semester || 1,
        bio: profile.bio || '',
        skills: profile.skills?.join(', ') || '',
        interests: profile.interests || [],
      });
    }
  }, [profile]);

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/profile', {
        name: form.name,
        university: form.university,
        studyProgram: form.studyProgram,
        semester: parseInt(form.semester),
        bio: form.bio || null,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        interests: form.interests,
      });
      await refreshProfile();
      toast.success('Profil berhasil diperbarui!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Pengaturan Profil</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="glass-card-static p-6 text-center lg:sticky lg:top-4 lg:self-start">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-20 h-20 rounded-2xl object-cover" />
            ) : (
              <User className="w-10 h-10 text-primary" />
            )}
          </div>
          <h3 className="font-heading text-h3 mb-1">{profile?.name}</h3>
          <p className="text-sm text-text-secondary flex items-center justify-center gap-1">
            <GraduationCap className="w-4 h-4" /> {profile?.university}
          </p>
          <p className="text-xs text-text-placeholder mt-0.5">
            {profile?.studyProgram} · Semester {profile?.semester}
          </p>
          <p className="text-xs text-text-secondary mt-3">{user?.email}</p>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card-static p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Nama Lengkap</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field" required />
              </div>
              <div>
                <label className="input-label">Universitas</label>
                <input value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })}
                  className="input-field" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Program Studi</label>
                <input value={form.studyProgram} onChange={(e) => setForm({ ...form, studyProgram: e.target.value })}
                  className="input-field" required />
              </div>
              <div>
                <label className="input-label">Semester</label>
                <input type="number" min={1} max={14} value={form.semester}
                  onChange={(e) => setForm({ ...form, semester: e.target.value })}
                  className="input-field" required />
              </div>
            </div>

            <div>
              <label className="input-label">Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3} placeholder="Ceritakan sedikit tentang dirimu..."
                className="input-field resize-none" />
            </div>

            <div>
              <label className="input-label">Skills (pisahkan dengan koma)</label>
              <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })}
                placeholder="React, Python, Machine Learning, Figma"
                className="input-field" />
            </div>

            <div>
              <label className="input-label">Bidang Minat</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = form.interests.includes(interest);
                  return (
                    <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary font-medium'
                          : 'border-slate-200 bg-white text-text-primary hover:border-primary/30'
                      }`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-primary' : 'border-2 border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
                <Save className="w-4 h-4" /> {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
