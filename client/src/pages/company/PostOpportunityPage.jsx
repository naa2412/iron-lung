import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { CATEGORY_MAP } from '../../lib/constants';
import { Send, Plus, X, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PostOpportunityPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '', category: 'INTERNSHIP', description: '', requirements: [''],
    locationType: 'REMOTE', city: '', duration: '', deadline: '',
    skillsRequired: [''], registrationUrl: '',
  });

  const updateArrayField = (field, index, value) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm({ ...form, [field]: arr });
  };

  const addArrayItem = (field) => setForm({ ...form, [field]: [...form[field], ''] });
  const removeArrayItem = (field, index) => setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.title.length < 5) errs.title = 'Judul minimal 5 karakter';
    if (form.description.length < 20) errs.description = 'Deskripsi minimal 20 karakter';
    if (!form.deadline) errs.deadline = 'Deadline wajib diisi';
    const cleanReqs = form.requirements.filter(Boolean);
    if (cleanReqs.length === 0) errs.requirements = 'Minimal 1 persyaratan';
    const cleanSkills = form.skillsRequired.filter(Boolean);
    if (cleanSkills.length === 0) errs.skillsRequired = 'Minimal 1 skill';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await api.post('/opportunities', {
        ...form,
        requirements: cleanReqs,
        skillsRequired: cleanSkills,
        city: form.city || null,
        duration: form.duration || null,
        registrationUrl: form.registrationUrl || null,
      });
      toast.success('Peluang berhasil dibuat! Menunggu persetujuan admin.');
      navigate('/perusahaan/kelola');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal membuat peluang');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>
      <h1 className="font-heading text-h1 mb-6">Buat Peluang Baru</h1>

      <div className="glass-card-static p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="input-label">Judul Peluang</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="cth. Frontend Developer Intern" className={`input-field ${errors.title ? 'input-error' : ''}`} />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Kategori</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                {Object.entries(CATEGORY_MAP).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Tipe Lokasi</label>
              <select value={form.locationType} onChange={(e) => setForm({ ...form, locationType: e.target.value })} className="input-field">
                <option value="REMOTE">Remote</option>
                <option value="ONSITE">On-site</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Kota (opsional)</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Jakarta" className="input-field" />
            </div>
            <div>
              <label className="input-label">Durasi (opsional)</label>
              <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="3 bulan" className="input-field" />
            </div>
            <div>
              <label className="input-label">Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className={`input-field ${errors.deadline ? 'input-error' : ''}`} />
              {errors.deadline && <p className="error-message">{errors.deadline}</p>}
            </div>
          </div>

          <div>
            <label className="input-label">Deskripsi</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={5} placeholder="Jelaskan detail peluang ini secara lengkap..."
              className={`input-field resize-none ${errors.description ? 'input-error' : ''}`} />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          {/* Requirements */}
          <div>
            <label className="input-label">Persyaratan</label>
            {errors.requirements && <p className="error-message mb-2">{errors.requirements}</p>}
            <div className="space-y-2">
              {form.requirements.map((req, i) => (
                <div key={i} className="flex gap-2">
                  <input value={req} onChange={(e) => updateArrayField('requirements', i, e.target.value)}
                    placeholder={`Persyaratan ${i + 1}`} className="input-field flex-1" />
                  {form.requirements.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem('requirements', i)} className="p-2 text-danger hover:bg-danger/10 rounded-lg">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addArrayItem('requirements')} className="btn btn-ghost btn-sm mt-2">
              <Plus className="w-4 h-4" /> Tambah Persyaratan
            </button>
          </div>

          {/* Skills */}
          <div>
            <label className="input-label">Skill yang Dibutuhkan</label>
            {errors.skillsRequired && <p className="error-message mb-2">{errors.skillsRequired}</p>}
            <div className="space-y-2">
              {form.skillsRequired.map((skill, i) => (
                <div key={i} className="flex gap-2">
                  <input value={skill} onChange={(e) => updateArrayField('skillsRequired', i, e.target.value)}
                    placeholder={`Skill ${i + 1}`} className="input-field flex-1" />
                  {form.skillsRequired.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem('skillsRequired', i)} className="p-2 text-danger hover:bg-danger/10 rounded-lg">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addArrayItem('skillsRequired')} className="btn btn-ghost btn-sm mt-2">
              <Plus className="w-4 h-4" /> Tambah Skill
            </button>
          </div>

          <div>
            <label className="input-label">Link Pendaftaran Eksternal (opsional)</label>
            <input type="url" value={form.registrationUrl} onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
              placeholder="https://forms.google.com/..." className="input-field" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost btn-md">Batal</button>
            <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
              <Send className="w-4 h-4" /> {loading ? 'Menyimpan...' : 'Kirim untuk Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
