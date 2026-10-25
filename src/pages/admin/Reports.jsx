import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  CheckSquare,
  Clock,
  AlertTriangle,
  FileText,
  UserCircle,
} from 'lucide-react';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import useFormValidation from '../../hooks/useFormValidation';
import { maxLength, oneOf } from '../../utils/validation';

const DOCUMENT_SUMMARY = {
  submitted: 48,
  approved: 24,
  pending: 24,
  missing: 15,
};

const REPORT_SUMMARY = {
  submitted: 48,
  approved: 24,
  pending: 24,
  missing: 15,
};

const REPORT_ROWS = [
  {
    id: 1,
    name: 'John Doe',
    team: 'UI/UX Designer',
    time: '09:00 AM',
    type: 'Daily Report',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 2,
    name: 'Jane Smith',
    team: 'Frontend - AVAA',
    time: '09:10 AM',
    type: 'Daily Report',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    team: 'UI/UX Designer',
    time: '09:00 AM',
    type: 'Documents',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 4,
    name: 'Liam Carter',
    team: 'Frontend Developer',
    time: '09:00 AM',
    type: 'Documents',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 5,
    name: 'Mia Johnson',
    team: 'QA Engineer',
    time: '---',
    type: '---',
    status: 'Did not submit',
    remarks: 'Did not submit',
    rowTone: 'danger',
  },
  {
    id: 6,
    name: 'Noah Brown',
    team: 'Product Design',
    time: '10:00 AM',
    type: 'Daily Report',
    status: 'Waiting...',
    remarks: 'Late Submitted',
    rowTone: 'warning',
  },
  {
    id: 7,
    name: 'Olivia Green',
    team: 'Data Analyst',
    time: '09:05 AM',
    type: 'Daily Report',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 8,
    name: 'Ethan Rivera',
    team: 'Marketing',
    time: '09:15 AM',
    type: 'Documents',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 9,
    name: 'Sophia Clark',
    team: 'UI/UX Designer',
    time: '09:20 AM',
    type: 'Daily Report',
    status: 'Waiting...',
    remarks: 'Needs review',
    rowTone: 'warning',
  },
  {
    id: 10,
    name: 'Lucas Martin',
    team: 'Frontend Developer',
    time: '---',
    type: 'Documents',
    status: 'Did not submit',
    remarks: 'Missing documents',
    rowTone: 'danger',
  },
  {
    id: 11,
    name: 'Ava Lopez',
    team: 'QA - Team 1',
    time: '09:02 AM',
    type: 'Daily Report',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 12,
    name: 'Jackson Lee',
    team: 'Backend Developer',
    time: '09:18 AM',
    type: 'Daily Report',
    status: 'Waiting...',
    remarks: 'Late Submitted',
    rowTone: 'warning',
  },
  {
    id: 13,
    name: 'Isabella Young',
    team: 'Product Design',
    time: '09:01 AM',
    type: 'Documents',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 14,
    name: 'Henry Walker',
    team: 'Frontend - AVAA',
    time: '---',
    type: 'Daily Report',
    status: 'Did not submit',
    remarks: 'No report',
    rowTone: 'danger',
  },
  {
    id: 15,
    name: 'Grace Hall',
    team: 'Data Analyst',
    time: '09:07 AM',
    type: 'Documents',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
];

const PENDING_VERIFICATIONS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'JohnDoeWork@gmail.com',
    status: 'Pending Applicant',
    documents: [
      { id: 1, title: 'Documents - Non-Disclosure Agreement', file: 'Agreement.pdf' },
      { id: 2, title: 'Documents - Memorandum of Agreement', file: 'Agreement.pdf' },
    ],
  },
];

const rowToneStyles = {
  default: 'hover:bg-gray-50 dark:hover:bg-slate-700/40',
  warning: 'bg-amber-500/20 hover:bg-amber-500/30',
  danger: 'bg-red-500/20 hover:bg-red-500/30',
};

function SummaryCard({ title, summary, onViewAll }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <CheckSquare className="h-4 w-4 text-emerald-400" />
          Submitted <span className="ml-auto text-slate-900 dark:text-white">{summary.submitted}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4 text-amber-400" />
          Pending <span className="ml-auto text-slate-900 dark:text-white">{summary.pending}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <CheckSquare className="h-4 w-4 text-sky-400" />
          Approved <span className="ml-auto text-slate-900 dark:text-white">{summary.approved}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          Missing <span className="ml-auto text-slate-900 dark:text-white">{summary.missing}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="mt-4 w-full rounded-lg bg-amber-500/80 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-500"
      >
        View All
      </button>
    </div>
  );
}

function VerificationPanel({ requests }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasRequests = requests.length > 0;
  const current = requests[currentIndex] || null;
  const [feedback, setFeedback] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { values, errors, handleChange, handleBlur, validateForm, resetForm } = useFormValidation(
    { message: '', remarks: '' },
    {
      message: [maxLength(500)],
      remarks: [maxLength(1000)],
    }
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % requests.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + requests.length) % requests.length);
  };

  const handleDecision = (action) => {
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setConfirmAction({ action });
  };

  const handleConfirmDecision = async () => {
    if (!confirmAction) {
      return;
    }
    setIsProcessing(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const label = confirmAction.action === 'approve' ? 'approved' : 'rejected';
      setFeedback({ type: 'success', message: `Request ${label} successfully.` });
      setConfirmAction(null);
      resetForm();
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to process the request.' });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    resetForm();
  }, [currentIndex, resetForm]);

  if (!hasRequests) {
    return (
      <div className="flex min-h-[420px] flex-col rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Document Verification</h3>
        <Toast
          type={feedback?.type}
          message={feedback?.message}
          onDismiss={() => setFeedback(null)}
        />
        <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/40 p-6 text-center">
          <FileText className="h-8 w-8 text-slate-500 dark:text-slate-400" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No pending document verification requests.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[420px] rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Document Verification</h3>
      <Toast
        type={feedback?.type}
        message={feedback?.message}
        onDismiss={() => setFeedback(null)}
      />
      <div className="mt-4 flex items-center gap-3">
        <UserCircle className="h-10 w-10 text-amber-400" />
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{current.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{current.email}</p>
          <p className="text-xs text-amber-300">{current.status}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {current.documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/40 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              <div>
                <p className="text-sm text-slate-900 dark:text-white">{doc.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{doc.file}</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg bg-gray-200 dark:bg-slate-600 px-3 py-1 text-xs font-semibold text-slate-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-500"
            >
              View
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Message</label>
        <textarea
          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/40 p-3 text-sm text-slate-700 dark:text-slate-200"
          rows={2}
          placeholder="message..."
          value={values.message}
          onChange={(event) => handleChange('message', event.target.value)}
          onBlur={() => handleBlur('message')}
        />
        {errors.message && <p className="mt-2 text-xs text-red-400">{errors.message}</p>}
      </div>

      <div className="mt-4">
        <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Remarks</label>
        <textarea
          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/40 p-3 text-sm text-slate-700 dark:text-slate-200"
          rows={3}
          value={values.remarks}
          onChange={(event) => handleChange('remarks', event.target.value)}
          onBlur={() => handleBlur('remarks')}
        />
        {errors.remarks && <p className="mt-2 text-xs text-red-400">{errors.remarks}</p>}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleDecision('reject')}
          className={`flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-500 ${
            isProcessing ? 'cursor-not-allowed opacity-70' : ''
          }`}
          disabled={isProcessing}
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => handleDecision('approve')}
          className={`flex-1 rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-500 ${
            isProcessing ? 'cursor-not-allowed opacity-70' : ''
          }`}
          disabled={isProcessing}
        >
          Approve
        </button>
      </div>

      {requests.length > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-lg bg-gray-100 dark:bg-slate-700 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            Previous
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {currentIndex + 1} / {requests.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-gray-100 dark:bg-slate-700 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            Next
          </button>
        </div>
      )}
      <ConfirmDialog
        isOpen={!!confirmAction}
        title={confirmAction?.action === 'approve' ? 'Approve request?' : 'Reject request?'}
        description="This action will update the verification status."
        confirmLabel={confirmAction?.action === 'approve' ? 'Approve' : 'Reject'}
        tone={confirmAction?.action === 'approve' ? 'primary' : 'danger'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={handleConfirmDecision}
        isProcessing={isProcessing}
      />
    </div>
  );
}

function Reports() {
  const navigate = useNavigate();
  const [internFilter] = useState('All Interns');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const typeOptions = ['All', 'Daily Report', 'Documents'];
  const { values, errors, handleChange, handleBlur } = useFormValidation(
    { search: '', typeFilter: 'All' },
    {
      search: [maxLength(100)],
      typeFilter: [oneOf(typeOptions)],
    }
  );

  const filteredRows = useMemo(() => {
    const query = values.search.trim().toLowerCase();
    return REPORT_ROWS.filter((row) => {
      const matchesQuery =
        query.length === 0 ||
        [row.name, row.team, row.type, row.status].some((field) =>
          field.toLowerCase().includes(query)
        );
      const matchesType = values.typeFilter === 'All' || row.type === values.typeFilter;
      return matchesQuery && matchesType;
    });
  }, [values.search, values.typeFilter]);
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
  }, [values.search, values.typeFilter]);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-slate-600 bg-gradient-to-br from-gray-100 to-white dark:from-slate-700 dark:to-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800')" }}
        />
        <div className="relative px-4 py-6 sm:px-8 sm:py-10">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">Document and Reports Verification</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">Approve, Reject, and Give Remarks on Intern's Documents</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SummaryCard
              title="Documents"
              summary={DOCUMENT_SUMMARY}
              onViewAll={() => navigate('/admin/reports/documents')}
            />
            <SummaryCard
              title="Daily Reports"
              summary={REPORT_SUMMARY}
              onViewAll={() => navigate('/admin/reports/daily')}
            />
          </div>

          <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                value={values.search}
                onChange={(event) => handleChange('search', event.target.value)}
                onBlur={() => handleBlur('search')}
                placeholder="Search"
                className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 py-2 pl-9 pr-3 text-sm text-slate-700 dark:text-slate-200"
              />
              {errors.search && <p className="mt-1 text-xs text-red-400">{errors.search}</p>}
            </div>
            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
              <label className="relative w-full sm:w-auto">
                <span className="mb-1 block text-sm font-semibold text-slate-900 dark:text-white sm:mb-0 sm:mr-2 sm:inline">Type:</span>
                <select
                  className="w-full appearance-none rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 pr-9 text-sm text-slate-700 dark:text-slate-200 sm:w-auto"
                  value={values.typeFilter}
                  onChange={(event) => handleChange('typeFilter', event.target.value)}
                  onBlur={() => handleBlur('typeFilter')}
                >
                  {typeOptions.map((option) => (
                    <option key={option} value={option} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              </label>
              {errors.typeFilter && <p className="text-xs text-red-400">{errors.typeFilter}</p>}
            </div>
          </div>

          <DataTable
            footer={
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pages={pageNumbers}
                variant="slate"
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
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-200">
                {paginatedRows.map((row) => (
                  <tr key={row.id} className={rowToneStyles[row.rowTone]}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-8 w-8 text-amber-400" />
                        <span className="font-medium text-slate-900 dark:text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-gray-200 dark:bg-slate-600 px-2.5 py-0.5 text-xs text-slate-700 dark:text-slate-200">
                        {row.team}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.time}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>
        </div>
        <VerificationPanel requests={PENDING_VERIFICATIONS} />
      </div>
    </div>
  );
}

export default Reports;
