import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, ADMIN_EMAILS } from './lib/firebase';
import ModernResumeView from './components/ModernResumeView';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check if user's email is in the admin whitelist
        const email = currentUser.email?.toLowerCase();
        const authorized = ADMIN_EMAILS.some(
          (adminEmail) => adminEmail.toLowerCase() === email
        );

        if (authorized) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          // User is not authorized - sign them out
          console.warn('Unauthorized access attempt:', email);
          await signOut(auth);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeViewWrapper />} />
        <Route
          path="/admin"
          element={
            user && isAdmin ? <AdminDashboardWrapper /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            user && isAdmin ? <Navigate to="/admin" replace /> : <LoginWrapper />
          }
        />
      </Routes>
    </Router>
  );
}

// Wrapper components to use navigation
function ResumeViewWrapper() {
  const navigate = useNavigate();
  return <ModernResumeView onAdminClick={() => navigate('/admin')} />;
}

function LoginWrapper() {
  const navigate = useNavigate();
  return (
    <Login
      onLoginSuccess={() => navigate('/admin')}
      onBackToResume={() => navigate('/')}
    />
  );
}

function AdminDashboardWrapper() {
  const navigate = useNavigate();
  return (
    <AdminDashboard
      onLogout={() => navigate('/')}
      onViewResume={() => navigate('/')}
    />
  );
}

export default App;

