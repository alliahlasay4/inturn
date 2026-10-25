import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import InternDashboard from './pages/InternDashboard';
import InternAttendance from './pages/InternAttendance';
import InternReports from './pages/InternReports';
import InternLayout from './layouts/InternLayout';
import InternNotifications from './pages/InternNotifications';
import InternDocuments from './pages/InternDocuments';
import { AttendanceProvider } from './context/AttendanceContext';
import { DocumentsProvider } from './context/DocumentsContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  // Temporary fake authentication state (frontend-only)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' | 'intern'

  // Load fake auth state from localStorage so refresh keeps you "logged in"
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        if (parsed?.role === 'admin' || parsed?.role === 'intern') {
          setIsAuthenticated(true);
          setUserRole(parsed.role);
        }
      } catch {
        // ignore bad data
      }
    }
  }, []);

  // Called by LoginPage after a successful fake login
  const handleFakeLogin = ({ role }) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('auth', JSON.stringify({ role }));
  };

  return (
    <ThemeProvider>
    <NotificationProvider>
      <DocumentsProvider>
        <AttendanceProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/loginpage" />} />

              <Route
                path="/loginpage"
                element={
                  isAuthenticated && userRole
                    ? <Navigate to={userRole === 'admin' ? '/admin' : '/intern'} />
                    : <LoginPage onLogin={handleFakeLogin} />
                }
              />

              {/* Protected routes - Person A will add proper auth later */}
              <Route
                path="/admin/*"
                element={
                  isAuthenticated && userRole === 'admin'
                    ? <AdminDashboard />
                    : <Navigate to="/loginpage" />
                }
              />

              <Route
                path="/intern/*"
                element={
                  isAuthenticated && userRole === 'intern'
                    ? <InternLayout />
                    : <Navigate to="/loginpage" />
                }
              >
                <Route index element={<InternDashboard />} />
                <Route path="reports" element={<InternReports />} />
                <Route path="attendance" element={<InternAttendance />} />
                <Route path="notifications" element={<InternNotifications />} />
                <Route path="documents" element={<InternDocuments />} />
              </Route>

              <Route
                path="*"
                element={
                  isAuthenticated && userRole
                    ? <Navigate to={userRole === 'admin' ? '/admin' : '/intern'} />
                    : <Navigate to="/loginpage" />
                }
              />
            </Routes>
          </Router>
        </AttendanceProvider>
      </DocumentsProvider>
    </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;