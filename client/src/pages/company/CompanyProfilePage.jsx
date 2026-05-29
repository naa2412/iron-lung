import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { Building2, Globe, Mail, Save, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CompanyProfilePage() {
  const { user, refreshProfile } = useAuth();
  const profile = user?.companyProfile;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    description: '',
    website: '',
    contactEmail: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        companyName: profile.companyName || '',
        description: profile.description || '',
        website: profile.website || '',
        contactEmail: profile.contactEmail || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/profile', {
        companyName: form.companyName,
        description: form.description || null,
        website: form.website || null,
        contactEmail: form.contactEmail || null,
      });
      await refreshProfile();
      toast.success('Profil perusahaan berhasil diperbarui!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Profil Perusahaan</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="glass-card-static p-6 text-center lg:sticky lg:top-4 lg:self-start">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            {profile?.logoUrl ? (
              <img src={profile.logoUrl} alt={profile.companyName} className="w-20 h-20 rounded-2xl object-contain" />
            ) : (
              <Building2 className="w-10 h-10 text-primary" />
            )}
          </div>
          <h3 className="font-heading text-h3 mb-1">{profile?.companyName}</h3>
          {profile?.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer"
              className="text-sm text-primary flex items-center justify-center gap-1 hover:underline">
              <Globe className="w-3 h-3" /> {profile.website}
            </a>
          )}
          <p className="text-xs text-text-secondary mt-2">{user?.email}</p>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card-static p-6 space-y-5">
            <div>
              <label className="input-label">Nama Perusahaan</label>
              <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="input-field" required />
            </div>

            <div>
              <label className="input-label">Deskripsi Perusahaan</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4} placeholder="Ceritakan tentang perusahaan kamu..."
                className="input-field resize-none" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Website</label>
                <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://www.perusahaan.com" className="input-field" />
              </div>
              <div>
                <label className="input-label">Email Kontak</label>
                <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  placeholder="hr@perusahaan.com" className="input-field" />
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
