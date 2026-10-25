import { useEffect, useState } from 'react';
import { UserCircle, Upload } from 'lucide-react';
import Pagination from '../Pagination';

function MissingSubmissionsTable({
  title,
  rows,
  dateLabel = 'Date',
  showFiles = false,
  actionLabel = 'Remind',
  onAction,
  footerActionLabel,
  onFooterAction,
  rowsPerPage = 6,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const paginatedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + index;
  }).filter((page) => page <= totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [rows.length, rowsPerPage]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800 overflow-hidden flex flex-col">
      <div className="border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {footerActionLabel && (
          <button
            type="button"
            onClick={onFooterAction}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <Upload className="h-4 w-4" />
            {footerActionLabel}
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[680px] divide-y divide-gray-200 dark:divide-slate-700 lg:min-w-full">
          <thead className="bg-gray-50 dark:bg-slate-700/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-4 py-3">Intern</th>
              <th className="px-4 py-3">{dateLabel}</th>
              {showFiles && <th className="px-4 py-3">Files</th>}
              <th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-200">
            {paginatedRows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{row.date}</td>
                {showFiles && <td className="px-4 py-3">{row.files}</td>}
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onAction?.(row)}
                    className="rounded-lg bg-amber-500/70 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-amber-500"
                  >
                    {actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pages={pageNumbers}
        variant="slate"
        className="border-t border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800 px-4 py-3 text-sm text-slate-500 dark:text-slate-400"
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </div>
  );
}

export default MissingSubmissionsTable;
