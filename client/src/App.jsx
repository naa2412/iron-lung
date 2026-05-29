import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, RoleRoute } from './components/layout/RouteGuards';
import AppLayout from './components/layout/AppLayout';

// Public pages
import LandingPage from './pages/public/LandingPage';
import OpportunityDetailPage from './pages/public/OpportunityDetailPage';
import PublicProfilePage from './pages/public/PublicProfilePage';
import NotFoundPage from './pages/public/NotFoundPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Student pages
import StudentDashboard from './pages/student/DashboardPage';
import OpportunitiesPage from './pages/student/OpportunitiesPage';
import ApplicationsPage from './pages/student/ApplicationsPage';
import SavedPage from './pages/student/SavedPage';
import PortfolioPage from './pages/student/PortfolioPage';
import OnboardingPage from './pages/student/OnboardingPage';
import NotificationsPage from './pages/student/NotificationsPage';
import ProfileSettingsPage from './pages/student/ProfileSettingsPage';

// Company pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import PostOpportunityPage from './pages/company/PostOpportunityPage';
import ManageListingsPage from './pages/company/ManageListingsPage';
import ApplicantsPage from './pages/company/ApplicantsPage';
import CandidateSearchPage from './pages/company/CandidateSearchPage';
import CompanyProfilePage from './pages/company/CompanyProfilePage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ModerationPage from './pages/admin/ModerationPage';
import UserManagementPage from './pages/admin/UserManagementPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.6)',
              borderRadius: '12px',
              fontSize: '14px',
              boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
            },
            success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
          }}
        />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/lupa-password" element={<ForgotPasswordPage />} />
          <Route path="/profil/:profileId" element={<PublicProfilePage />} />

          {/* Onboarding */}
          <Route path="/onboarding" element={
            <ProtectedRoute><OnboardingPage /></ProtectedRoute>
          } />

          {/* App routes with sidebar layout */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            {/* Student routes */}
            <Route path="/dashboard" element={
              <RoleRoute roles={['MAHASISWA']}><StudentDashboard /></RoleRoute>
            } />
            <Route path="/peluang" element={<OpportunitiesPage />} />
            <Route path="/peluang/:id" element={<OpportunityDetailPage />} />
            <Route path="/lamaran" element={
              <RoleRoute roles={['MAHASISWA']}><ApplicationsPage /></RoleRoute>
            } />
            <Route path="/tersimpan" element={
              <RoleRoute roles={['MAHASISWA']}><SavedPage /></RoleRoute>
            } />
            <Route path="/portofolio" element={
              <RoleRoute roles={['MAHASISWA']}><PortfolioPage /></RoleRoute>
            } />
            <Route path="/notifikasi" element={<NotificationsPage />} />
            <Route path="/profil" element={
              <RoleRoute roles={['MAHASISWA']}><ProfileSettingsPage /></RoleRoute>
            } />

            {/* Company routes */}
            <Route path="/perusahaan/dashboard" element={
              <RoleRoute roles={['INDUSTRI']}><CompanyDashboard /></RoleRoute>
            } />
            <Route path="/perusahaan/buat-peluang" element={
              <RoleRoute roles={['INDUSTRI']}><PostOpportunityPage /></RoleRoute>
            } />
            <Route path="/perusahaan/kelola" element={
              <RoleRoute roles={['INDUSTRI']}><ManageListingsPage /></RoleRoute>
            } />
            <Route path="/perusahaan/pelamar" element={
              <RoleRoute roles={['INDUSTRI']}><ApplicantsPage /></RoleRoute>
            } />
            <Route path="/perusahaan/pelamar/:opportunityId" element={
              <RoleRoute roles={['INDUSTRI']}><ApplicantsPage /></RoleRoute>
            } />
            <Route path="/perusahaan/kandidat" element={
              <RoleRoute roles={['INDUSTRI']}><CandidateSearchPage /></RoleRoute>
            } />
            <Route path="/perusahaan/profil" element={
              <RoleRoute roles={['INDUSTRI']}><CompanyProfilePage /></RoleRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <RoleRoute roles={['ADMIN']}><AdminDashboard /></RoleRoute>
            } />
            <Route path="/admin/moderasi" element={
              <RoleRoute roles={['ADMIN']}><ModerationPage /></RoleRoute>
            } />
            <Route path="/admin/pengguna" element={
              <RoleRoute roles={['ADMIN']}><UserManagementPage /></RoleRoute>
            } />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
