export const INTEREST_OPTIONS = [
  'Software Engineering',
  'Data Science / Machine Learning',
  'Cybersecurity / CTF / Pentesting',
  'UI/UX Design',
  'Game Development',
  'Mobile Development',
  'Cloud / DevOps',
  'IoT / Embedded Systems',
  'Blockchain',
  'Digital Marketing / Tech',
];

export const CATEGORY_MAP = {
  INTERNSHIP: { label: 'Magang', color: 'badge-magang' },
  COLLABORATION: { label: 'Kolaborasi', color: 'badge-kolaborasi' },
  COMPETITION: { label: 'Kompetisi', color: 'badge-kompetisi' },
  TRAINING: { label: 'Pelatihan', color: 'badge-pelatihan' },
};

export const LOCATION_MAP = {
  REMOTE: 'Remote',
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
};

export const STATUS_MAP = {
  APPLIED: { label: 'Terkirim', color: 'badge-applied' },
  VIEWED: { label: 'Dilihat', color: 'badge-viewed' },
  ACCEPTED: { label: 'Diterima', color: 'badge-accepted' },
  REJECTED: { label: 'Ditolak', color: 'badge-rejected' },
};

export const PORTFOLIO_TYPE_MAP = {
  INTERNSHIP: 'Magang',
  PROJECT: 'Proyek',
  COMPETITION: 'Kompetisi',
  CERTIFICATION: 'Sertifikasi',
  TRAINING: 'Pelatihan',
};

export const BADGE_MAP = {
  PELAMAR_PERTAMA: { label: 'Pelamar Pertama', description: 'Kirim lamaran pertama kali', icon: 'Send' },
  PORTOFOLIO_LENGKAP: { label: 'Portofolio Lengkap', description: 'Isi semua section portofolio', icon: 'FolderOpen' },
  KOLEKTOR: { label: 'Kolektor', description: 'Simpan 5 peluang', icon: 'Bookmark' },
  KOMPETITOR: { label: 'Kompetitor', description: 'Daftar ke 1 kompetisi', icon: 'Trophy' },
  KOLABORATOR: { label: 'Kolaborator', description: 'Daftar ke 1 proyek kolaborasi', icon: 'Handshake' },
  PENCARI_KERJA: { label: 'Pencari Kerja', description: 'Lamar ke 3 magang', icon: 'Briefcase' },
  PROFIL_BINTANG: { label: 'Profil Bintang', description: 'Profil 100% lengkap', icon: 'Star' },
  AKTIF_MINGGU_INI: { label: 'Aktif Minggu Ini', description: 'Login 3 hari berturut-turut', icon: 'Flame' },
};

export function getDeadlineInfo(deadline) {
  const now = new Date();
  const dl = new Date(deadline);
  const diffMs = dl.getTime() - now.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (days < 0) return { label: 'Berakhir', urgency: 'expired', days: 0 };
  if (days <= 3) return { label: `${days} hari lagi`, urgency: 'urgent', days };
  if (days <= 7) return { label: `${days} hari lagi`, urgency: 'soon', days };
  return { label: `${days} hari lagi`, urgency: 'normal', days };
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
