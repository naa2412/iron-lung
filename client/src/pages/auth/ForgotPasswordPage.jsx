import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email wajib diisi'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Format email tidak valid'); return; }
    
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
      toast.success('Link reset password telah dikirim');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
        <div className="glass-card-static p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h2 className="font-heading text-h2 mb-2">Email Terkirim</h2>
          <p className="text-text-secondary text-sm mb-6">
            Jika email <strong>{email}</strong> terdaftar, link reset password telah dikirim. Silakan cek inbox kamu.
          </p>
          <Link to="/login" className="btn btn-primary btn-md">
            Kembali ke Halaman Masuk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Masuk
        </Link>
        <div className="glass-card-static p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-h2">Lupa Password</h1>
            <p className="text-sm text-text-secondary mt-2">Masukkan email untuk menerima link reset password</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="forgot-email" className="input-label">Email</label>
              <input id="forgot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com" className={`input-field ${error ? 'input-error' : ''}`} />
              {error && <p className="error-message">{error}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
              {loading ? 'Mengirim...' : 'Kirim Link Reset'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
