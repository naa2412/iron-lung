import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Search, Bookmark, FolderOpen, User, Building2, Shield } from 'lucide-react';

export default function BottomNav() {
  const { isMahasiswa, isIndustri, isAdmin } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-0.5 py-1.5 px-2 text-[11px] font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-text-secondary'
    }`;

  const studentTabs = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Beranda' },
    { to: '/peluang', icon: Search, label: 'Jelajahi' },
    { to: '/tersimpan', icon: Bookmark, label: 'Tersimpan' },
    { to: '/portofolio', icon: FolderOpen, label: 'Portofolio' },
    { to: '/profil', icon: User, label: 'Profil' },
  ];

  const companyTabs = [
    { to: '/perusahaan/dashboard', icon: LayoutDashboard, label: 'Beranda' },
    { to: '/peluang', icon: Search, label: 'Jelajahi' },
    { to: '/perusahaan/kelola', icon: FolderOpen, label: 'Kelola' },
    { to: '/perusahaan/pelamar', icon: User, label: 'Pelamar' },
    { to: '/perusahaan/profil', icon: Building2, label: 'Profil' },
  ];

  const adminTabs = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/moderasi', icon: Search, label: 'Moderasi' },
    { to: '/admin/pengguna', icon: User, label: 'Pengguna' },
    { to: '/profil', icon: Shield, label: 'Profil' },
  ];

  const tabs = isAdmin ? adminTabs : isIndustri ? companyTabs : studentTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 hide-desktop safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={linkClass}>
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
