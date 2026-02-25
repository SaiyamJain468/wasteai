import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ToastContainer';
import SidebarLayout from './components/layout/SidebarLayout';
import OfflineIndicator from './components/OfflineIndicator';

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ImpactReport = lazy(() => import('./pages/ImpactReport'));
const EducationHub = lazy(() => import('./pages/EducationHub'));
const Profile = lazy(() => import('./pages/Profile'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <div>Loading...</div>
  </div>
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" replace />;

  return <SidebarLayout>{children}</SidebarLayout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingFallback />;
  if (user) return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <OfflineIndicator />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/impact" element={<ProtectedRoute><ImpactReport /></ProtectedRoute>} />
                <Route path="/quiz" element={<ProtectedRoute><EducationHub /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <ToastContainer />
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
