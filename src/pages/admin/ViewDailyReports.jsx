import { useMemo, useState } from 'react';
import { CheckSquare, Check, Clock, AlertTriangle, FileText, UserCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportPageHeader from '../../components/reports/ReportPageHeader';
import ReportStatsGrid from '../../components/reports/ReportStatsGrid';
import ComplianceTable from '../../components/reports/ComplianceTable';
import MissingSubmissionsTable from '../../components/reports/MissingSubmissionsTable';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import useFormValidation from '../../hooks/useFormValidation';
import { maxLength } from '../../utils/validation';

const STATS = [
  { id: 'submitted', label: 'Submitted', value: 48, icon: CheckSquare, tone: 'text-emerald-400' },
  { id: 'approved', label: 'Approved', value: 24, icon: Check, tone: 'text-sky-400' },
  { id: 'pending', label: 'Pending', value: 24, icon: Clock, tone: 'text-amber-400' },
  { id: 'missing', label: 'Missing', value: 15, icon: AlertTriangle, tone: 'text-red-400' },
];

const COMPLIANCE_ROWS = [
  { id: 1, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Verified' },
  { id: 2, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Verified' },
  { id: 3, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Verified' },
  { id: 4, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Pending' },
  { id: 5, name: 'Emma Wilson', email: 'emma.wilson@gmail.com', date: 'January 27, 2026', status: 'Verified' },
  { id: 6, name: 'Liam Carter', email: 'liam.carter@gmail.com', date: 'January 27, 2026', status: 'Verified' },
  { id: 7, name: 'Mia Johnson', email: 'mia.johnson@gmail.com', date: 'January 28, 2026', status: 'Pending' },
  { id: 8, name: 'Noah Brown', email: 'noah.brown@gmail.com', date: 'January 28, 2026', status: 'Verified' },
  { id: 9, name: 'Olivia Green', email: 'olivia.green@gmail.com', date: 'January 29, 2026', status: 'Verified' },
  { id: 10, name: 'Ethan Rivera', email: 'ethan.rivera@gmail.com', date: 'January 29, 2026', status: 'Verified' },
  { id: 11, name: 'Sophia Clark', email: 'sophia.clark@gmail.com', date: 'January 30, 2026', status: 'Pending' },
  { id: 12, name: 'Lucas Martin', email: 'lucas.martin@gmail.com', date: 'January 30, 2026', status: 'Verified' },
];

// Mock daily report documents shown in the verification modal (keyed by row id for demo)
const PENDING_DAILY_REPORTS_BY_ROW = {
  4: [{ id: 1, title: 'Daily Report', file: 'daily-report-jan-26.pdf', date: 'January 26, 2026' }],
  7: [{ id: 1, title: 'Daily Report', file: 'daily-report-jan-28.pdf', date: 'January 28, 2026' }],
  11: [{ id: 1, title: 'Daily Report', file: 'daily-report-jan-30.pdf', date: 'January 30, 2026' }],
};

const MISSING_ROWS = [
  { id: 1, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026' },
  { id: 2, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026' },
  { id: 3, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026' },
  { id: 4, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026' },
  { id: 5, name: 'Emma Wilson', email: 'emma.wilson@gmail.com', date: 'January 27, 2026' },
  { id: 6, name: 'Liam Carter', email: 'liam.carter@gmail.com', date: 'January 27, 2026' },
  { id: 7, name: 'Mia Johnson', email: 'mia.johnson@gmail.com', date: 'January 28, 2026' },
  { id: 8, name: 'Noah Brown', email: 'noah.brown@gmail.com', date: 'January 28, 2026' },
  { id: 9, name: 'Olivia Green', email: 'olivia.green@gmail.com', date: 'January 29, 2026' },
  { id: 10, name: 'Ethan Rivera', email: 'ethan.rivera@gmail.com', date: 'January 29, 2026' },
  { id: 11, name: 'Sophia Clark', email: 'sophia.clark@gmail.com', date: 'January 30, 2026' },
  { id: 12, name: 'Lucas Martin', email: 'lucas.martin@gmail.com', date: 'January 30, 2026' },
];

function ViewDailyReports() {
  const navigate = useNavigate();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [remindToast, setRemindToast] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { values, errors, handleChange, handleBlur, validateForm, resetForm } = useFormValidation(
    { message: '', remarks: '' },
    {
      message: [maxLength(500)],
      remarks: [maxLength(1000)],
    }
  );

  const openVerification = (row) => {
    const documents = PENDING_DAILY_REPORTS_BY_ROW[row.id] ?? [
      { id: 1, title: 'Daily Report', file: `daily-report-${row.date.replace(/,?\s/g, '-').toLowerCase()}.pdf`, date: row.date },
    ];
    setActiveRequest({
      name: row.name,
      email: row.email,
      status: 'Pending',
      documents,
    });
    setIsVerificationOpen(true);
    resetForm();
  };

  const closeVerification = () => {
    setIsVerificationOpen(false);
    setActiveRequest(null);
    resetForm();
    setFeedback(null);
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
      setFeedback({ type: 'success', message: `Daily report ${label} successfully.` });
      setConfirmAction(null);
      resetForm();
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to process the request.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemind = (row) => {
    setRemindToast({ type: 'success', message: `Reminder sent to ${row.email}.` });
  };

  const complianceRows = useMemo(
    () =>
      COMPLIANCE_ROWS.map((row) =>
        row.status === 'Pending'
          ? {
              ...row,
              statusNode: (
                <button
                  type="button"
                  onClick={() => openVerification(row)}
                  className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/30"
                >
                  {row.status}
                </button>
              ),
            }
          : row
      ),
    []
  );
  const missingRows = useMemo(() => MISSING_ROWS, []);

  return (
    <div className="space-y-6">
      <ReportPageHeader title="Daily Reports" onBack={() => navigate('/admin/reports')} />

      <ReportStatsGrid stats={STATS} />

      <Toast
        type={remindToast?.type}
        message={remindToast?.message}
        onDismiss={() => setRemindToast(null)}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ComplianceTable title="All Compliance" rows={complianceRows} />
        <MissingSubmissionsTable
          title="Missing Submissions"
          rows={missingRows}
          dateLabel="Date"
          onAction={handleRemind}
        />
      </div>

      {isVerificationOpen && activeRequest && (
        <Modal
          isOpen={isVerificationOpen}
          overlayClassName="bg-slate-900/80"
          panelClassName="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 shadow-xl sm:p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Daily Report Verification</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Review and approve the submitted daily report.</p>
            </div>
            <button
              type="button"
              onClick={closeVerification}
              className="rounded-full p-1 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Toast
            type={feedback?.type}
            message={feedback?.message}
            onDismiss={() => setFeedback(null)}
          />

          <div className="mt-4 flex items-center gap-3">
            <UserCircle className="h-10 w-10 text-amber-400" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{activeRequest.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{activeRequest.email}</p>
              <p className="text-xs text-amber-300">{activeRequest.status}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {activeRequest.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/40 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                  <div>
                    <p className="text-sm text-slate-900 dark:text-white">{doc.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{doc.file}</p>
                    {doc.date && <p className="text-xs text-slate-400 dark:text-slate-500">{doc.date}</p>}
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
        </Modal>
      )}
      <ConfirmDialog
        isOpen={!!confirmAction}
        title={confirmAction?.action === 'approve' ? 'Approve daily report?' : 'Reject daily report?'}
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

export default ViewDailyReports;
