import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Briefcase, ArrowLeft, User, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { registerMahasiswa, registerIndustri } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mahasiswa');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mahasiswa fields
  const [mForm, setMForm] = useState({ name: '', email: '', password: '', university: '', studyProgram: '', semester: '' });
  // Industri fields
  const [iForm, setIForm] = useState({ companyName: '', email: '', password: '', website: '' });

  const handleMahasiswaSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!mForm.name) errs.name = 'Nama wajib diisi';
    if (!mForm.email) errs.email = 'Email wajib diisi';
    if (!mForm.password || mForm.password.length < 8) errs.password = 'Password minimal 8 karakter';
    if (!mForm.university) errs.university = 'Universitas wajib diisi';
    if (!mForm.studyProgram) errs.studyProgram = 'Program studi wajib diisi';
    if (!mForm.semester || mForm.semester < 1) errs.semester = 'Semester wajib diisi';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await registerMahasiswa({ ...mForm, semester: parseInt(mForm.semester) });
      toast.success('Registrasi berhasil!');
      navigate('/onboarding');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  const handleIndustriSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!iForm.companyName) errs.companyName = 'Nama perusahaan wajib diisi';
    if (!iForm.email) errs.email = 'Email wajib diisi';
    if (!iForm.password || iForm.password.length < 8) errs.password = 'Password minimal 8 karakter';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await registerIndustri(iForm);
      toast.success('Registrasi berhasil!');
      navigate('/perusahaan/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (id, label, value, onChange, type = 'text', placeholder = '', error = null) => (
    <div>
      <label htmlFor={id} className="input-label">{label}</label>
      {type === 'password' ? (
        <div className="relative">
          <input id={id} type={showPassword ? 'text' : 'password'} value={value} onChange={onChange}
            placeholder={placeholder} className={`input-field pr-10 ${error ? 'input-error' : ''}`} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-placeholder hover:text-text-secondary">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      ) : (
        <input id={id} type={type} value={value} onChange={onChange}
          placeholder={placeholder} className={`input-field ${error ? 'input-error' : ''}`} />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
        <div className="glass-card-static p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-h2 text-text-primary">Daftar di IRON LUNG</h1>
          </div>

          {/* Tab Switch */}
          <div className="flex gap-1 p-1 bg-surface-secondary rounded-lg mb-6">
            <button onClick={() => { setActiveTab('mahasiswa'); setErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === 'mahasiswa' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'
              }`}>
              <User className="w-4 h-4" /> Mahasiswa
            </button>
            <button onClick={() => { setActiveTab('industri'); setErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === 'industri' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'
              }`}>
              <Building2 className="w-4 h-4" /> Industri
            </button>
          </div>

          {/* Mahasiswa Form */}
          {activeTab === 'mahasiswa' && (
            <form onSubmit={handleMahasiswaSubmit} className="space-y-4">
              {renderField('reg-name', 'Nama Lengkap', mForm.name, (e) => setMForm({ ...mForm, name: e.target.value }), 'text', 'Nama lengkap kamu', errors.name)}
              {renderField('reg-email', 'Email', mForm.email, (e) => setMForm({ ...mForm, email: e.target.value }), 'email', 'nama@email.com', errors.email)}
              {renderField('reg-university', 'Universitas', mForm.university, (e) => setMForm({ ...mForm, university: e.target.value }), 'text', 'Nama universitas', errors.university)}
              {renderField('reg-study', 'Program Studi', mForm.studyProgram, (e) => setMForm({ ...mForm, studyProgram: e.target.value }), 'text', 'Teknik Informatika', errors.studyProgram)}
              {renderField('reg-semester', 'Semester', mForm.semester, (e) => setMForm({ ...mForm, semester: e.target.value }), 'number', '1-14', errors.semester)}
              {renderField('reg-password', 'Password', mForm.password, (e) => setMForm({ ...mForm, password: e.target.value }), 'password', 'Minimal 8 karakter', errors.password)}
              <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
                {loading ? 'Mendaftar...' : 'Daftar sebagai Mahasiswa'}
              </button>
            </form>
          )}

          {/* Industri Form */}
          {activeTab === 'industri' && (
            <form onSubmit={handleIndustriSubmit} className="space-y-4">
              {renderField('reg-company', 'Nama Perusahaan', iForm.companyName, (e) => setIForm({ ...iForm, companyName: e.target.value }), 'text', 'Nama organisasi', errors.companyName)}
              {renderField('reg-iemail', 'Email Resmi', iForm.email, (e) => setIForm({ ...iForm, email: e.target.value }), 'email', 'hr@perusahaan.com', errors.email)}
              {renderField('reg-website', 'Website (opsional)', iForm.website, (e) => setIForm({ ...iForm, website: e.target.value }), 'url', 'https://www.perusahaan.com')}
              {renderField('reg-ipassword', 'Password', iForm.password, (e) => setIForm({ ...iForm, password: e.target.value }), 'password', 'Minimal 8 karakter', errors.password)}
              <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
                {loading ? 'Mendaftar...' : 'Daftar sebagai Industri'}
              </button>
            </form>
          )}

          <p className="text-sm text-text-secondary text-center mt-6">
            Sudah punya akun? <Link to="/login" className="text-primary font-medium hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
