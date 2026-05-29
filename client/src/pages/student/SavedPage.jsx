import { useState, useEffect } from 'react';
import api from '../../lib/api';
import OpportunityCard from '../../components/opportunity/OpportunityCard';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SavedPage() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = () => {
    api.get('/saved').then(({ data }) => setSaved(data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchSaved(); }, []);

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Peluang Tersimpan</h1>
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-48 rounded-glass" />)}
        </div>
      ) : saved.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={{ ...opp, isSaved: true }} showMatchScore onSaveToggle={fetchSaved} />
          ))}
        </div>
      ) : (
        <div className="glass-card-static p-12 text-center">
          <Bookmark className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Belum ada peluang tersimpan</h3>
          <p className="text-text-secondary text-sm mb-4">Kamu belum menyimpan peluang apapun. Simpan peluang yang menarik agar mudah ditemukan nanti.</p>
          <Link to="/peluang" className="btn btn-primary btn-sm">Jelajahi Peluang</Link>
        </div>
      )}
    </div>
  );
}
