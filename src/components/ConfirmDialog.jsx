import Modal from './Modal';

const toneClasses = {
  danger: 'bg-red-500 text-white hover:bg-red-600',
  primary: 'bg-teal-500 text-white hover:bg-teal-600',
};

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
  isProcessing = false,
}) {
  if (!isOpen) {
    return null;
  }

  const confirmClass = toneClasses[tone] || toneClasses.danger;

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="bg-slate-900/70"
      panelClassName="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl"
    >
      <h4 className="text-base font-semibold text-slate-900">{title}</h4>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isProcessing}
          className={`rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${confirmClass}`}
        >
          {isProcessing ? 'Working...' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
