import { useState } from 'react';
import { FileText, X, Upload, CloudUpload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportPageHeader from '../../components/reports/ReportPageHeader';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import useFormValidation from '../../hooks/useFormValidation';
import { fileRequired, fileSize, fileType } from '../../utils/validation';

const DOCUMENTS = [
  { id: 1, name: 'Non-Disclosure Agreement (NDA)', uploadedAt: '2026-01-01' },
  { id: 2, name: 'Business Permit', uploadedAt: '2026-01-01' },
  { id: 3, name: 'Internship Agreement', uploadedAt: '2026-01-01' },
];

function DocumentUpload() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const { values, errors, setFieldValue, validateForm, handleBlur, resetForm } = useFormValidation(
    { file: null },
    {
      file: [
        fileRequired(),
        fileType(['pdf', 'doc', 'docx']),
        fileSize(100 * 1024 * 1024),
      ],
    }
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpload = async () => {
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsUploading(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      handleCloseModal();
      setFeedback({ type: 'success', message: 'Document uploaded successfully.' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Upload failed. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmRemove = async () => {
    if (!removeTarget) {
      return;
    }
    setIsRemoving(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setFeedback({ type: 'success', message: `${removeTarget.name} removed successfully.` });
      setRemoveTarget(null);
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to remove the document. Please try again.' });
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-6">
      <ReportPageHeader title="Documents" onBack={() => navigate('/admin/reports/documents')} />
      <Toast
        type={feedback?.type}
        message={feedback?.message}
        onDismiss={() => setFeedback(null)}
      />

      <DataTable title="Documents & Requirements">
        <table className="min-w-[680px] divide-y divide-gray-200 dark:divide-slate-700 lg:min-w-full">
          <thead className="bg-gray-50 dark:bg-slate-700/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-4 py-3">Document Name</th>
              <th className="px-4 py-3">Date Uploaded</th>
              <th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-200">
            {DOCUMENTS.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                    <span className="text-slate-900 dark:text-white">{doc.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{doc.uploadedAt}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-red-500/80 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500"
                    onClick={() => setRemoveTarget(doc)}
                  >
                    <X className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>

      <div className="flex justify-stretch sm:justify-end">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 sm:w-auto"
        >
          <Upload className="h-4 w-4" />
          Upload Documents
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        overlayClassName="bg-slate-900/70"
        panelClassName="w-full max-w-md rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 px-4 py-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Document Upload</h3>
          <button
            type="button"
            onClick={handleCloseModal}
            className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/40 px-4 py-8 text-center">
            <CloudUpload className="h-8 w-8 text-slate-500 dark:text-slate-400" />
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">PDF, DOC, DOCX (max. 100MB)</p>
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => setFieldValue('file', event.target.files?.[0] || null)}
              onBlur={() => handleBlur('file')}
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/40 px-3 py-2 text-sm text-slate-700 dark:text-slate-200"
            />
            {values.file && (
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">Selected: {values.file.name}</p>
            )}
            {errors.file && <p className="mt-2 text-xs text-red-400">{errors.file}</p>}
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-500"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpload}
              className={`flex-1 rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-500 ${
                isUploading ? 'cursor-not-allowed opacity-70' : ''
              }`}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!removeTarget}
        title="Remove document?"
        description={removeTarget ? `This will remove ${removeTarget.name}.` : ''}
        confirmLabel="Remove"
        tone="danger"
        onCancel={() => setRemoveTarget(null)}
        onConfirm={handleConfirmRemove}
        isProcessing={isRemoving}
      />
    </div>
  );
}

export default DocumentUpload;
