import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { PORTFOLIO_TYPE_MAP, formatDate } from '../../lib/constants';
import { FolderOpen, Plus, Pencil, Trash2, Briefcase, Trophy, Code2, Award, GraduationCap, X } from 'lucide-react';
import toast from 'react-hot-toast';

const TYPE_ICONS = { INTERNSHIP: Briefcase, PROJECT: Code2, COMPETITION: Trophy, CERTIFICATION: Award, TRAINING: GraduationCap };

export default function PortfolioPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ type: 'PROJECT', title: '', description: '', date: '', organization: '', skills: '' });

  const fetchEntries = () => {
    api.get('/portfolio').then(({ data }) => setEntries(data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean), date: form.date || null };
    try {
      if (editing) {
        await api.put(`/portfolio/${editing}`, payload);
        toast.success('Entri berhasil diperbarui');
      } else {
        await api.post('/portfolio', payload);
        toast.success('Entri berhasil ditambahkan');
      }
      setShowForm(false);
      setEditing(null);
      setForm({ type: 'PROJECT', title: '', description: '', date: '', organization: '', skills: '' });
      fetchEntries();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal menyimpan');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus entri portofolio ini?')) return;
    try {
      await api.delete(`/portfolio/${id}`);
      toast.success('Entri berhasil dihapus');
      fetchEntries();
    } catch { toast.error('Gagal menghapus'); }
  };

  const startEdit = (entry) => {
    setEditing(entry.id);
    setForm({ type: entry.type, title: entry.title, description: entry.description || '', date: entry.date?.split('T')[0] || '', organization: entry.organization || '', skills: entry.skills?.join(', ') || '' });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-h1">Portofolio Saya</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ type: 'PROJECT', title: '', description: '', date: '', organization: '', skills: '' }); }}
          className="btn btn-primary btn-md">
          <Plus className="w-4 h-4" /> Tambah Entri
        </button>
      </div>

      {showForm && (
        <div className="glass-card-static p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-heading text-h3">{editing ? 'Edit Entri' : 'Tambah Entri Baru'}</h3>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-text-secondary" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Tipe</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                {Object.entries(PORTFOLIO_TYPE_MAP).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Judul</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="input-label">Organisasi</label>
              <input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="input-label">Tanggal</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="input-label">Deskripsi</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-field resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="input-label">Skills (pisahkan dengan koma)</label>
              <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Python, Data Science" className="input-field" />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost btn-md">Batal</button>
              <button type="submit" className="btn btn-primary btn-md">{editing ? 'Perbarui' : 'Simpan'}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-glass" />)}</div>
      ) : entries.length > 0 ? (
        <div className="space-y-3">
          {entries.map((entry) => {
            const Icon = TYPE_ICONS[entry.type] || Code2;
            return (
              <div key={entry.id} className="glass-card-static p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-medium text-primary">{PORTFOLIO_TYPE_MAP[entry.type]}</span>
                      <h3 className="font-heading font-semibold text-text-primary text-sm">{entry.title}</h3>
                      <p className="text-xs text-text-secondary">{entry.organization}{entry.date ? ` · ${formatDate(entry.date)}` : ''}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(entry)} className="p-1.5 rounded-lg hover:bg-surface-secondary"><Pencil className="w-4 h-4 text-text-secondary" /></button>
                      <button onClick={() => handleDelete(entry.id)} className="p-1.5 rounded-lg hover:bg-danger/10"><Trash2 className="w-4 h-4 text-danger" /></button>
                    </div>
                  </div>
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
      ) : (
        <div className="glass-card-static p-12 text-center">
          <FolderOpen className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Portofolio kamu masih kosong</h3>
          <p className="text-text-secondary text-sm mb-4">Mulai tambahkan pengalamanmu! Dokumentasikan magang, proyek, kompetisi, sertifikasi, dan pelatihan.</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm"><Plus className="w-4 h-4" /> Tambah Entri Pertama</button>
        </div>
      )}
    </div>
  );
}
