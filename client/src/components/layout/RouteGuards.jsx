import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="skeleton w-12 h-12 rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function RoleRoute({ roles, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="skeleton w-12 h-12 rounded-full" />
      </div>
    );
  }

  if (!user || !roles.includes(user.role)) {
    const redirectMap = {
      MAHASISWA: '/dashboard',
      INDUSTRI: '/perusahaan/dashboard',
      ADMIN: '/admin/dashboard',
    };
    return <Navigate to={user ? redirectMap[user.role] || '/' : '/login'} replace />;
  }

  return children;
}
