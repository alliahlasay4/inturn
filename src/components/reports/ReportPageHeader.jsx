import { ArrowLeft } from 'lucide-react';

function ReportPageHeader({ title, onBack }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="rounded-lg p-2 text-slate-500 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
        aria-label="Back to reports"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
    </div>
  );
}

export default ReportPageHeader;
