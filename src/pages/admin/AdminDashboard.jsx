import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, User, Users, CheckCircle } from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import bgImage from '../../assets/bg.png';
import MetricCard from '../../components/MetricCard';
import Avatar from '../../components/Avatar';
import InternManagement from './InternManagement';
import AttendanceMonitoring from './AttendanceMonitoring';
import Notifications from './Notifications';
import Reports from './Reports';
import ViewDocuments from './ViewDocuments';
import ViewDailyReports from './ViewDailyReports';
import DocumentUpload from './DocumentUpload';
import Profile from './Profile';

const MOCK_INTERNS = [
  { id: 1, name: 'John Doe', time: '2 hours ago', team: 'UI/UX - Team 1', status: 'Present - On time', statusType: 'present' },
  { id: 2, name: 'Jane Smith', time: '2 hours ago', team: 'Frontend - AVAA', status: 'Present - On time', statusType: 'present' },
  { id: 3, name: 'Bob Wilson', time: '2 hours ago', team: 'QA - Team 1', status: 'Absent', statusType: 'absent' },
];
const MOCK_SUBMISSIONS = [
  { id: 1, name: 'John Doe', time: '2 hours ago', type: 'Documents', status: 'Pending Applicant' },
  { id: 2, name: 'Jane Smith', time: '2 hours ago', type: 'Daily Reports', status: 'Frontend - AVAA' },
  { id: 3, name: 'Bob Wilson', time: '2 hours ago', type: 'Documents', status: 'Pending Applicant' },
];

function AdminLayout() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let mainContent = null;
  if (pathname === '/admin' || pathname === '/admin/') {
    mainContent = <DashboardHome currentTime={currentTime} />;
  } else if (pathname.startsWith('/admin/interns')) {
    mainContent = <InternManagement />;
  } else if (pathname.startsWith('/admin/attendance')) {
    mainContent = <AttendanceMonitoring />;
  } else if (pathname.startsWith('/admin/notifications')) {
    mainContent = <Notifications />;
  } else if (pathname.startsWith('/admin/reports/documents/upload')) {
    mainContent = <DocumentUpload />;
  } else if (pathname.startsWith('/admin/reports/documents')) {
    mainContent = <ViewDocuments />;
  } else if (pathname.startsWith('/admin/reports/daily')) {
    mainContent = <ViewDailyReports />;
  } else if (pathname.startsWith('/admin/reports')) {
    mainContent = <Reports />;
  } else if (pathname.startsWith('/admin/profile')) {
    mainContent = <Profile />;
  } else {
    mainContent = <DashboardHome currentTime={currentTime} />;
  }

  return (
    <div
      className="min-h-screen text-slate-900 dark:text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {mainContent}
      </main>
    </div>
  );
}

function DashboardHome({ currentTime }) {
  const navigate = useNavigate();
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <>
      <section className="relative mb-6 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 to-white dark:border-slate-600 dark:from-slate-700 dark:to-slate-800 sm:mb-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800')] bg-cover bg-center opacity-20 dark:opacity-30" />
        <div className="relative px-4 py-6 sm:px-8 sm:py-10">
          <h1 className="mb-1 text-2xl font-bold sm:text-3xl">Welcome, Admin</h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
            {formattedDate} {formattedTime}
          </p>
          <p className="text-slate-700 dark:text-slate-200 mb-1">Monitor and manage your interns efficiently</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Track attendance, review reports, and verify documents in a centralized dashboard.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/reports')}
            className="w-full rounded-lg bg-amber-500 px-5 py-2.5 font-medium text-white transition-colors hover:bg-amber-600 sm:w-auto"
          >
            View Reports
          </button>
        </div>
      </section>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <MetricCard icon={<Users className="w-10 h-10" />} label="Total Interns" value="128" />
        <MetricCard icon={<CheckCircle className="w-10 h-10" />} label="Today's Attendance" value="42 | 128" />
        <MetricCard icon={<FileText className="w-10 h-10" />} label="Pending Reports" value="21" />
        <MetricCard icon={<FileText className="w-10 h-10" />} label="Pending Documents" value="9" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_2fr_1fr]">
        <ManageInternsCard interns={MOCK_INTERNS} />
        <RecentSubmissionsCard submissions={MOCK_SUBMISSIONS} />
        <AttendanceSummaryCard present={42} late={10} absent={7} />
      </div>
    </>
  );
}

function ManageInternsCard({ interns }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 dark:bg-slate-800 dark:border-slate-600 rounded-xl overflow-hidden">
      <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-200 dark:border-slate-600">Manage Interns</h2>
      <ul className="divide-y divide-gray-200 dark:divide-slate-600">
        {interns.map((intern) => (
          <li key={intern.id} className="px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar size="h-10 w-10">
                  <User className="w-5 h-5" />
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium truncate">{intern.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{intern.time}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        intern.statusType === 'present' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {intern.team} · {intern.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin/interns')}
                className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 sm:w-auto"
              >
                Manage
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecentSubmissionsCard({ submissions }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 dark:bg-slate-800 dark:border-slate-600 rounded-xl overflow-hidden">
      <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-200 dark:border-slate-600">Recent Submissions</h2>
      <ul className="divide-y divide-gray-200 dark:divide-slate-600">
        {submissions.map((sub) => (
          <li key={sub.id} className="px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar size="h-10 w-10">
                  <User className="w-5 h-5" />
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium truncate">{sub.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{sub.time}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {sub.type} · {sub.status}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin/reports')}
                className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 sm:w-auto"
              >
                Review
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AttendanceSummaryCard({ present, late, absent }) {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800 p-6">
      <div className="flex h-full flex-col items-center justify-center text-center text-2xl">
        <span className="font-semibold text-green-600 dark:text-green-400">Present</span>
        <span className="mt-2 text-xl">{present}</span>
        <span className="my-4 h-px w-full bg-gray-200 dark:bg-slate-600" />
        <span className="font-semibold text-amber-600 dark:text-amber-400">Late</span>
        <span className="mt-2 text-xl">{late}</span>
        <span className="my-4 h-px w-full bg-gray-200 dark:bg-slate-600" />
        <span className="font-semibold text-red-600 dark:text-red-400">Absent</span>
        <span className="mt-2 text-xl">{absent}</span>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return <AdminLayout />;
}

export default AdminDashboard;
