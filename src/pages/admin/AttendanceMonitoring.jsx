import { useEffect, useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import Avatar from '../../components/Avatar';
import StatusBadge from '../../components/StatusBadge';
import Pagination from '../../components/Pagination';
import DataTable from '../../components/DataTable';
import Toast from '../../components/Toast';
import useFormValidation from '../../hooks/useFormValidation';
import { date, dateAfter, dateBefore, oneOf, required } from '../../utils/validation';

const ATTENDANCE_ROWS = [
  { id: 1, name: 'John Doe', team: 'UI/UX Designer', timeIn: '09:00 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 2, name: 'Jane Smith', team: 'Frontend - AVAA', timeIn: '09:10 AM', timeOut: '---', hours: '2 hours', status: 'Present - Late', statusType: 'late' },
  { id: 3, name: 'Bob Wilson', team: 'QA - Team 1', timeIn: '---', timeOut: '---', hours: '---', status: 'Absent', statusType: 'absent' },
  { id: 4, name: 'Emma Wilson', team: 'UI/UX Designer', timeIn: '09:00 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 5, name: 'Liam Carter', team: 'Frontend Developer', timeIn: '09:05 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 6, name: 'Mia Johnson', team: 'QA Engineer', timeIn: '09:15 AM', timeOut: '---', hours: '2 hours', status: 'Present - Late', statusType: 'late' },
  { id: 7, name: 'Noah Brown', team: 'Product Design', timeIn: '09:02 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 8, name: 'Olivia Green', team: 'Data Analyst', timeIn: '---', timeOut: '---', hours: '---', status: 'Absent', statusType: 'absent' },
  { id: 9, name: 'Ethan Rivera', team: 'Marketing', timeIn: '09:00 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 10, name: 'Sophia Clark', team: 'UI/UX Designer', timeIn: '09:18 AM', timeOut: '---', hours: '2 hours', status: 'Present - Late', statusType: 'late' },
  { id: 11, name: 'Lucas Martin', team: 'Frontend Developer', timeIn: '09:00 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 12, name: 'Ava Lopez', team: 'QA - Team 1', timeIn: '09:22 AM', timeOut: '---', hours: '2 hours', status: 'Present - Late', statusType: 'late' },
  { id: 13, name: 'Jackson Lee', team: 'Backend Developer', timeIn: '---', timeOut: '---', hours: '---', status: 'Absent', statusType: 'absent' },
  { id: 14, name: 'Isabella Young', team: 'Product Design', timeIn: '09:01 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 15, name: 'Henry Walker', team: 'Frontend - AVAA', timeIn: '09:12 AM', timeOut: '---', hours: '2 hours', status: 'Present - Late', statusType: 'late' },
  { id: 16, name: 'Grace Hall', team: 'Data Analyst', timeIn: '09:03 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 17, name: 'Daniel Scott', team: 'Marketing', timeIn: '---', timeOut: '---', hours: '---', status: 'Absent', statusType: 'absent' },
  { id: 18, name: 'Chloe Adams', team: 'UI/UX Designer', timeIn: '09:08 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
];

function AttendanceMonitoring() {
  const reportTypeOptions = [
    'All',
    'Present - On Time',
    'Present - Late',
    'Present - Undertime',
    'Absent',
  ];
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormValidation(
    {
      startDate: '2026-04-21',
      endDate: '2026-06-24',
      reportType: 'Present - On Time',
    },
    {
      startDate: [required(), date(), dateBefore('endDate')],
      endDate: [required(), date(), dateAfter('startDate')],
      reportType: [required(), oneOf(reportTypeOptions)],
    }
  );
  const [statusFilter, setStatusFilter] = useState('All');
  const [feedback, setFeedback] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const statusOptions = ['All', 'Present - On Time', 'Present - Late', 'Present - Undertime', 'Absent'];

  const filteredRows = ATTENDANCE_ROWS.filter((row) => {
    if (statusFilter === 'All') {
      return true;
    }
    return row.status.toLowerCase() === statusFilter.toLowerCase();
  });
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + index;
  }).filter((page) => page <= totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const handleGenerateReport = async () => {
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsGenerating(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setFeedback({ type: 'success', message: 'Attendance report generated successfully.' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to generate the report. Please try again.' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toast
        type={feedback?.type}
        message={feedback?.message}
        onDismiss={() => setFeedback(null)}
      />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-slate-600 bg-gradient-to-br from-gray-100 to-white dark:from-slate-700 dark:to-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800')" }}
        />
        <div className="relative px-4 py-6 sm:px-8 sm:py-10">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">Attendance Monitoring & Reports</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">Monitor and generate attendance reports of your interns.</p>
        </div>
      </section>

      {/* Attendance Overview */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Attendance Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Present" value="42" variant="teal" />
          <MetricCard label="Late" value="10" variant="warning" />
          <MetricCard label="Absent" value="7" variant="danger" />
          <MetricCard label="Undertime" value="0" variant="default" />
        </div>
      </section>

      {/* Two columns: table + sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Intern Attendance table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Intern Attendance</h2>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Filter:</span>
              <label className="relative min-w-0 flex-1 sm:flex-none">
                <select
                  className="w-full appearance-none rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 pr-9 text-sm text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              </label>
            </div>
          </div>
          <DataTable
            footer={
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pages={pageNumbers}
                variant="teal"
                nextLabel="Next >"
                className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-500 dark:text-slate-400"
                onPageChange={setCurrentPage}
                onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              />
            }
          >
            <table className="min-w-[900px] divide-y divide-gray-200 dark:divide-slate-700 lg:min-w-full">
              <thead className="bg-gray-50 dark:bg-slate-700/60">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-3">Intern</th>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-4 py-3">Time In</th>
                  <th className="px-4 py-3">Time Out</th>
                  <th className="px-4 py-3">Hours Rendered</th>
                  <th className="px-4 py-3">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-200">
                {paginatedRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={row.name} size="h-9 w-9" />
                        <span className="font-medium text-slate-900 dark:text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-gray-200 dark:bg-slate-600 px-2.5 py-0.5 text-xs text-slate-700 dark:text-slate-200">
                        {row.team}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.timeIn}</td>
                    <td className="px-4 py-3">{row.timeOut}</td>
                    <td className="px-4 py-3">{row.hours}</td>
                    <td className="px-4 py-3">
                      <StatusBadge label={row.status} tone={row.statusType} variant="text" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>

        {/* Right: Generate Reports + Attendance Summary */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Generate Reports</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={values.startDate}
                    onChange={(event) => handleChange('startDate', event.target.value)}
                    onBlur={() => handleBlur('startDate')}
                    className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 py-2.5 px-3 text-slate-800 dark:text-slate-100"
                  />
                </div>
                {errors.startDate && <p className="mt-1 text-xs text-red-400">{errors.startDate}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={values.endDate}
                    onChange={(event) => handleChange('endDate', event.target.value)}
                    onBlur={() => handleBlur('endDate')}
                    className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 py-2.5 px-3 text-slate-800 dark:text-slate-100"
                  />
                </div>
                {errors.endDate && <p className="mt-1 text-xs text-red-400">{errors.endDate}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Type
                </label>
                <label className="relative block">
                  <select
                    className="w-full appearance-none rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 px-3 py-2.5 text-left text-slate-700 dark:text-slate-200"
                    value={values.reportType}
                    onChange={(event) => handleChange('reportType', event.target.value)}
                    onBlur={() => handleBlur('reportType')}
                  >
                    {reportTypeOptions.map((option) => (
                      <option key={option} value={option} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                </label>
                {errors.reportType && <p className="mt-1 text-xs text-red-400">{errors.reportType}</p>}
              </div>
              <button
                type="button"
                className={`w-full rounded-lg bg-teal-500 py-2.5 font-medium text-white hover:bg-teal-600 ${
                  isGenerating ? 'cursor-not-allowed opacity-70' : ''
                }`}
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Attendance Summary</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              January 25 - 31, 2026
              <Calendar className="h-4 w-4" />
            </p>
            <div className="mt-4 h-48 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
              Bar chart placeholder (S M T W T F S)
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-green-500" /> Present
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-red-500" /> Absent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-amber-500" /> Late
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-sky-400" /> Undertime
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceMonitoring;
