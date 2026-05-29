import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Search, Bookmark, FolderOpen, User, Building2,
  PlusCircle, ClipboardList, Users, Shield, CheckSquare, Bell,
  LogOut, Briefcase, ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const { user, logout, isMahasiswa, isIndustri, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive
        ? 'bg-primary text-white shadow-md'
        : 'text-text-secondary hover:bg-surface-secondary hover:text-primary'
    }`;

  const studentLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/peluang', icon: Search, label: 'Jelajahi Peluang' },
    { to: '/lamaran', icon: ClipboardList, label: 'Lamaran Saya' },
    { to: '/tersimpan', icon: Bookmark, label: 'Tersimpan' },
    { to: '/portofolio', icon: FolderOpen, label: 'Portofolio' },
    { to: '/notifikasi', icon: Bell, label: 'Notifikasi' },
  ];

  const companyLinks = [
    { to: '/perusahaan/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/perusahaan/buat-peluang', icon: PlusCircle, label: 'Buat Peluang' },
    { to: '/perusahaan/kelola', icon: ClipboardList, label: 'Kelola Peluang' },
    { to: '/perusahaan/pelamar', icon: Users, label: 'Pelamar' },
    { to: '/perusahaan/kandidat', icon: Search, label: 'Cari Kandidat' },
    { to: '/notifikasi', icon: Bell, label: 'Notifikasi' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/moderasi', icon: CheckSquare, label: 'Moderasi' },
    { to: '/admin/pengguna', icon: Users, label: 'Pengguna' },
  ];

  const links = isAdmin ? adminLinks : isIndustri ? companyLinks : studentLinks;

  const profileName = isMahasiswa
    ? user?.studentProfile?.name
    : isIndustri
    ? user?.companyProfile?.companyName
    : 'Admin';

  return (
    <aside className={`glass-card-static h-screen sticky top-0 flex flex-col transition-all duration-300 hide-mobile ${
      collapsed ? 'w-[72px]' : 'w-[260px]'
    }`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/30">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-primary text-lg">IRON LUNG</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-surface-secondary transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 text-text-secondary transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={linkClass} title={label}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-white/30">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {isMahasiswa ? <User className="w-4 h-4 text-primary" /> :
               isIndustri ? <Building2 className="w-4 h-4 text-primary" /> :
               <Shield className="w-4 h-4 text-primary" />}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-text-primary truncate">{profileName}</p>
              <p className="text-xs text-text-secondary truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-all w-full"
          title="Keluar"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}
