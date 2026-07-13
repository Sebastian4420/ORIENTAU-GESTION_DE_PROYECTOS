import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { initDB } from './utils/database';
import Sidebar from './components/layout/Sidebar';
import AuthPage from './pages/auth/AuthPage';
import DashboardPage from './pages/student/DashboardPage';
import TestPage from './pages/student/TestPage';
import GradePage from './pages/student/GradePage';
import ReportPage from './pages/student/ReportPage';
import SenecytPage from './pages/student/SenecytPage';
import CounselorDashboardPage from './pages/counselor/CounselorDashboardPage';
import CounselorResultsPage from './pages/counselor/CounselorResultsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminQuestionsPage from './pages/admin/AdminQuestionsPage';
import AdminCareersPage from './pages/admin/AdminCareersPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

const DEFAULT_PAGES = {
  postulante: 'dashboard',
  counselor: 'counselor-dashboard',
  admin: 'admin-dashboard'
};

function AppContent() {
  const { currentUser, loading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCurrentPage(DEFAULT_PAGES[currentUser.role] || 'dashboard');
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--gray-100)' }}>
        <p style={{ color: 'var(--gray-500)' }}>Cargando...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage onNavigate={setCurrentPage} />;
      case 'test': return <TestPage onNavigate={setCurrentPage} />;
      case 'grade': return <GradePage />;
      case 'report': return <ReportPage onNavigate={setCurrentPage} />;
      case 'senecyt': return <SenecytPage />;
      case 'counselor-dashboard': return <CounselorDashboardPage onNavigate={setCurrentPage} />;
      case 'counselor-results': return <CounselorResultsPage />;
      case 'admin-dashboard': return <AdminDashboardPage />;
      case 'admin-questions': return <AdminQuestionsPage />;
      case 'admin-careers': return <AdminCareersPage />;
      case 'admin-users': return <AdminUsersPage />;
      default: return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={logout} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
