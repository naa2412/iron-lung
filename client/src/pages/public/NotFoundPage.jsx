import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="glass-card-static p-12 max-w-md w-full text-center">
        <div className="text-7xl font-heading font-bold text-primary/20 mb-4">404</div>
        <h1 className="font-heading text-h2 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-text-secondary text-sm mb-6">
          Halaman yang kamu cari tidak ada atau telah dipindahkan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn btn-primary btn-md">
            <Home className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary btn-md">
            <ArrowLeft className="w-4 h-4" /> Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
}
