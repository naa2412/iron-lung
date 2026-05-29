import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Briefcase, Trophy, Handshake, GraduationCap, ArrowRight,
  Users, Building2, Target, ChevronRight, Search, Star, Zap,
  TrendingUp, Award, Globe,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString('id-ID')}</span>;
}

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'INDUSTRI') return '/perusahaan/dashboard';
    return '/dashboard';
  };

  const features = [
    {
      icon: Search,
      title: 'Temukan Peluang',
      desc: 'Jelajahi ratusan peluang magang, kompetisi, dan pelatihan dari perusahaan teknologi terkemuka Indonesia.',
    },
    {
      icon: Target,
      title: 'Rekomendasi Cerdas',
      desc: 'Algoritma matching kami menemukan peluang yang paling sesuai dengan minat dan skill kamu.',
    },
    {
      icon: Award,
      title: 'Bangun Portofolio',
      desc: 'Dokumentasikan pengalaman dan raih badge pencapaian untuk profil yang lebih menonjol.',
    },
    {
      icon: Globe,
      title: 'Koneksi Industri',
      desc: 'Terhubung langsung dengan Gojek, Tokopedia, Bukalapak, dan perusahaan teknologi lainnya.',
    },
  ];

  const categories = [
    { icon: Briefcase, label: 'Magang', desc: 'Pengalaman kerja nyata di perusahaan teknologi', color: 'text-blue-600 bg-blue-50' },
    { icon: Handshake, label: 'Kolaborasi', desc: 'Proyek open source dan riset bersama industri', color: 'text-emerald-600 bg-emerald-50' },
    { icon: Trophy, label: 'Kompetisi', desc: 'Hackathon, CTF, dan design challenge', color: 'text-amber-600 bg-amber-50' },
    { icon: GraduationCap, label: 'Pelatihan', desc: 'Bootcamp, workshop, dan sertifikasi profesional', color: 'text-purple-600 bg-purple-50' },
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      university: 'Universitas Indonesia',
      text: 'Berkat IRON LUNG, saya mendapatkan magang di Tokopedia sebagai Data Analyst. Fitur rekomendasi sangat membantu menemukan peluang yang sesuai dengan minat saya.',
    },
    {
      name: 'Siti Nurhaliza',
      university: 'Institut Teknologi Bandung',
      text: 'Platform ini memudahkan saya menemukan kompetisi CTF dan security challenge. Sekarang portofolio saya jauh lebih kuat untuk melamar pekerjaan.',
    },
    {
      name: 'Raka Pratama',
      university: 'Universitas Gadjah Mada',
      text: 'IRON LUNG menjadi one-stop platform untuk semua kebutuhan pengembangan karier saya. Dari magang sampai sertifikasi, semuanya ada di sini.',
    },
  ];

  return (
    <div className="min-h-screen bg-mesh">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-primary text-lg">IRON LUNG</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to={getDashboardLink()} className="btn btn-primary btn-md">
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-md">Masuk</Link>
                <Link to="/register" className="btn btn-primary btn-md">Daftar</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            Temukan Peluang Magang, Kolaborasi & Kompetisi{' '}
            <span className="text-primary">Terbaik</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Platform terpusat untuk mahasiswa Informatika Indonesia berkembang dan mempersiapkan karier profesional
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={isAuthenticated ? getDashboardLink() : '/register'} className="btn btn-primary btn-lg w-full sm:w-auto">
              Mulai Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="btn btn-outline btn-lg w-full sm:w-auto">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, value: 1250, label: 'Mahasiswa Terdaftar' },
            { icon: Briefcase, value: 48, label: 'Peluang Aktif' },
            { icon: Building2, value: 15, label: 'Perusahaan Mitra' },
            { icon: TrendingUp, value: 320, label: 'Lamaran Terkirim' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="glass-card-static p-5 text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
                <AnimatedCounter end={value} />
                <span className="text-primary">+</span>
              </p>
              <p className="text-sm text-text-secondary mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-h2 text-center mb-12">
            Kenapa <span className="text-primary">IRON LUNG</span>?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-surface-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-h2 text-center mb-12">Kategori Peluang</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="glass-card p-6 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">{label}</h3>
                <p className="text-sm text-text-secondary mb-4">{desc}</p>
                <Link
                  to={isAuthenticated ? '/peluang' : '/register'}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all"
                >
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-h2 text-center mb-12">Cerita Mahasiswa</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, university, text }) => (
              <div key={name} className="glass-card-static p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-text-body leading-relaxed mb-4">"{text}"</p>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{name}</p>
                  <p className="text-xs text-text-secondary">{university}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto glass-card-static p-8 sm:p-12 text-center">
          <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-h2 mb-4">Siap Memulai Perjalananmu?</h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            Bergabunglah dengan ribuan mahasiswa Informatika Indonesia yang sudah menemukan peluang terbaik melalui IRON LUNG.
          </p>
          <Link to={isAuthenticated ? getDashboardLink() : '/register'} className="btn btn-primary btn-lg">
            Daftar Gratis Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-footer border-t border-slate-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading font-bold text-primary">IRON LUNG</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Jembatan Mahasiswa Menuju Dunia Profesional
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link to="/peluang" className="hover:text-primary transition-colors">Jelajahi Peluang</Link></li>
                <li><Link to="/register" className="hover:text-primary transition-colors">Daftar</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Masuk</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm">Kategori</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>Magang</li>
                <li>Kompetisi</li>
                <li>Kolaborasi</li>
                <li>Pelatihan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm">Kontak</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>info@ironlung.id</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 text-center text-sm text-text-secondary">
            <p>&copy; {new Date().getFullYear()} IRON LUNG. Hak cipta dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
