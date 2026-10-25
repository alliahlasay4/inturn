import WelcomeCard from '../components/Intern/WelcomeCard';
import AttendanceTracker from '../components/Intern/AttendanceTracker';
import SubmissionStatus from '../components/Intern/SubmissionStatus';
import AttendanceSummary from '../components/Intern/AttendanceSummary';
import Notifications from '../components/Intern/Notifications';
import PerformaceReview from '../components/Intern/PerformanceReview';
import DocumentsSummary from '../components/Intern/DocumentSummary';

import "../styles/dashboard.css";

export default function InternDashboard() {
  return (
    <main className="dashboard">
      <WelcomeCard title="Welcome, Intern!" />

      <div className="dashboard-grid">
        <AttendanceTracker />
        <SubmissionStatus />

        <AttendanceSummary />
        <DocumentsSummary />

        <Notifications />
        <PerformaceReview />
      </div>
    </main>
  );
}

