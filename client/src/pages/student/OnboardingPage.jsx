import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { INTEREST_OPTIONS } from '../../lib/constants';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      toast.error('Pilih minimal 1 bidang minat');
      return;
    }
    setLoading(true);
    try {
      await api.put('/users/onboarding', { interests: selected });
      await refreshProfile();
      toast.success('Minat berhasil disimpan!');
      navigate('/dashboard');
    } catch {
      toast.error('Gagal menyimpan minat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="glass-card-static p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-heading text-h1 mb-2">Pilih Bidang Minatmu</h1>
            <p className="text-text-secondary">Pilih bidang yang kamu minati untuk mendapatkan rekomendasi peluang yang lebih relevan.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {INTEREST_OPTIONS.map((interest) => {
              const isSelected = selected.includes(interest);
              return (
                <button key={interest} onClick={() => toggle(interest)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all text-sm font-medium ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 bg-white text-text-primary hover:border-primary/30'
                  }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-primary' : 'border-2 border-slate-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  {interest}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">{selected.length} dipilih</p>
            <button onClick={handleSubmit} disabled={loading || selected.length === 0}
              className="btn btn-primary btn-lg">
              {loading ? 'Menyimpan...' : 'Lanjutkan'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
