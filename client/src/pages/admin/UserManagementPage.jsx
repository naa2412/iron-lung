import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Users, Search, Shield, Ban, CheckCircle2, User, Building2 } from 'lucide-react';
import { formatDateShort } from '../../lib/constants';
import toast from 'react-hot-toast';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);

  const fetchUsers = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (roleFilter) params.set('role', roleFilter);
    params.set('page', page);
    params.set('limit', 15);

    api.get(`/admin/users?${params.toString()}`).then(({ data }) => {
      setUsers(data.data);
      setPagination(data.pagination);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, [roleFilter, page]);

  const handleSuspend = async (id) => {
    if (!confirm('Yakin ingin menangguhkan pengguna ini?')) return;
    try {
      await api.put(`/admin/users/${id}/suspend`);
      toast.success('Pengguna berhasil ditangguhkan');
      fetchUsers();
    } catch { toast.error('Gagal menangguhkan pengguna'); }
  };

  const handleActivate = async (id) => {
    try {
      await api.put(`/admin/users/${id}/activate`);
      toast.success('Pengguna berhasil diaktifkan kembali');
      fetchUsers();
    } catch { toast.error('Gagal mengaktifkan pengguna'); }
  };

  const getRoleIcon = (role) => {
    if (role === 'MAHASISWA') return <User className="w-4 h-4 text-primary" />;
    if (role === 'INDUSTRI') return <Building2 className="w-4 h-4 text-emerald-600" />;
    return <Shield className="w-4 h-4 text-amber-600" />;
  };

  const getRoleLabel = (role) => {
    if (role === 'MAHASISWA') return 'Mahasiswa';
    if (role === 'INDUSTRI') return 'Industri';
    return 'Admin';
  };

  return (
    <div>
      <h1 className="font-heading text-h1 mb-6">Manajemen Pengguna</h1>

      <div className="glass-card-static p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={(e) => { e.preventDefault(); fetchUsers(); }} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari berdasarkan email..." className="input-field pl-10" />
            </div>
          </form>
          <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            className="input-field w-auto min-w-[150px]">
            <option value="">Semua Role</option>
            <option value="MAHASISWA">Mahasiswa</option>
            <option value="INDUSTRI">Industri</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-14 rounded-glass" />)}</div>
      ) : (
        <>
          <div className="glass-card-static overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-4 py-3 font-medium text-text-secondary">Pengguna</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Email</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Role</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Status</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Terdaftar</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-text-primary">
                          {u.studentProfile?.name || u.companyProfile?.companyName || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5">
                          {getRoleIcon(u.role)}
                          <span className="text-text-primary">{getRoleLabel(u.role)}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {u.isActive ? (
                          <span className="badge badge-accepted">Aktif</span>
                        ) : (
                          <span className="badge badge-rejected">Tersuspensi</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{formatDateShort(u.createdAt)}</td>
                      <td className="px-4 py-3">
                        {u.role !== 'ADMIN' && (
                          u.isActive ? (
                            <button onClick={() => handleSuspend(u.id)} className="btn btn-ghost btn-sm text-danger" title="Tangguhkan">
                              <Ban className="w-4 h-4" /> Suspend
                            </button>
                          ) : (
                            <button onClick={() => handleActivate(u.id)} className="btn btn-ghost btn-sm text-success" title="Aktifkan">
                              <CheckCircle2 className="w-4 h-4" /> Aktifkan
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {[...Array(pagination.totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    pagination.page === i + 1 ? 'bg-primary text-white' : 'bg-white text-text-secondary hover:bg-surface-secondary'
                  }`}>{i + 1}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
