import { useEffect, useState } from 'react';
import {
  Check,
  Clock,
  FileText,
  FileCheck,
  UserPlus,
  FileX2,
  X,
} from 'lucide-react';
import Pagination from '../../components/Pagination';

const FILTERS = [
  { id: 'all', label: 'All', pillClass: 'bg-gray-200 dark:bg-slate-500/30 text-slate-600 dark:text-slate-300' },
  { id: 'unread', label: 'Unread', pillClass: 'bg-gray-200 dark:bg-slate-500/30 text-slate-600 dark:text-slate-300' },
  { id: 'info', label: 'Info', pillClass: 'bg-gray-200 dark:bg-slate-500/30 text-slate-600 dark:text-slate-300' },
  { id: 'warning', label: 'Warning', pillClass: 'bg-amber-500/30 text-amber-300' },
  { id: 'urgent', label: 'Urgent', pillClass: 'bg-red-500/30 text-red-300' },
  { id: 'success', label: 'Success', pillClass: 'bg-green-500/30 text-green-300' },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'warning',
    icon: Clock,
    iconBg: 'bg-amber-500/20 text-amber-400',
    title: 'Missing Time Out',
    description: 'Emma Wilson has not recorded time-out for January 30, 2026',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'urgent',
    icon: FileText,
    iconBg: 'bg-red-500/20 text-red-400',
    title: 'Pending Daily Report',
    description: '4 interns have not submitted their daily reports today',
    time: '4 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'success',
    icon: FileCheck,
    iconBg: 'bg-green-500/20 text-green-400',
    title: 'Document Verified',
    description: 'NDA for Emma Wilson has been verified',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    type: 'info',
    icon: UserPlus,
    iconBg: 'bg-sky-500/20 text-sky-400',
    title: 'New Intern Added',
    description: 'Emma Wilson has been added to UI/UX department',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 5,
    type: 'warning',
    icon: Clock,
    iconBg: 'bg-amber-500/20 text-amber-400',
    title: 'Late Arrival',
    description: 'Emma Wilson arrived late on January 30, 2026',
    time: '3 days ago',
    unread: false,
  },
  {
    id: 6,
    type: 'urgent',
    icon: FileX2,
    iconBg: 'bg-red-500/20 text-red-400',
    title: 'Document Rejected',
    description: 'MOA for Emma Wilson requires corrections',
    time: '3 days ago',
    unread: true,
  },
  {
    id: 7,
    type: 'info',
    icon: UserPlus,
    iconBg: 'bg-sky-500/20 text-sky-400',
    title: 'New Supervisor Assigned',
    description: 'Jacob Kim has been assigned to Frontend interns',
    time: '4 days ago',
    unread: false,
  },
  {
    id: 8,
    type: 'success',
    icon: FileCheck,
    iconBg: 'bg-green-500/20 text-green-400',
    title: 'Report Approved',
    description: 'Daily report for Liam Carter has been approved',
    time: '4 days ago',
    unread: false,
  },
  {
    id: 9,
    type: 'warning',
    icon: Clock,
    iconBg: 'bg-amber-500/20 text-amber-400',
    title: 'Missing Daily Report',
    description: 'Sophia Clark has not submitted a daily report',
    time: '5 days ago',
    unread: true,
  },
  {
    id: 10,
    type: 'urgent',
    icon: FileX2,
    iconBg: 'bg-red-500/20 text-red-400',
    title: 'Document Expiring',
    description: 'Internship agreement for Noah Brown expires soon',
    time: '6 days ago',
    unread: false,
  },
  {
    id: 11,
    type: 'info',
    icon: FileText,
    iconBg: 'bg-sky-500/20 text-sky-400',
    title: 'Policy Update',
    description: 'Attendance policy has been updated for Q1 2026',
    time: '1 week ago',
    unread: false,
  },
  {
    id: 12,
    type: 'success',
    icon: FileCheck,
    iconBg: 'bg-green-500/20 text-green-400',
    title: 'Document Verified',
    description: 'MOA for Olivia Green has been verified',
    time: '1 week ago',
    unread: true,
  },
  {
    id: 13,
    type: 'warning',
    icon: Clock,
    iconBg: 'bg-amber-500/20 text-amber-400',
    title: 'Late Submission',
    description: 'Jackson Lee submitted a report late',
    time: '1 week ago',
    unread: false,
  },
  {
    id: 14,
    type: 'urgent',
    icon: FileText,
    iconBg: 'bg-red-500/20 text-red-400',
    title: 'Verification Needed',
    description: 'Pending verification for Ava Lopez documents',
    time: '1 week ago',
    unread: true,
  },
];

function NotificationCard({ notification, onDismiss }) {
  const Icon = notification.icon;
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/80 px-4 py-4 sm:flex-row sm:items-start sm:gap-4 sm:px-5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${notification.iconBg}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-900 dark:text-white">{notification.title}</h3>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{notification.description}</p>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{notification.time}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(notification.id)}
        className="self-end rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white sm:self-auto"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState(NOTIFICATIONS);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') {
      return true;
    }
    if (activeFilter === 'unread') {
      return item.unread;
    }
    return item.type === activeFilter;
  });
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + index;
  }).filter((page) => page <= totalPages);
  const filtersWithCounts = FILTERS.map((filter) => {
    const count =
      filter.id === 'all'
        ? items.length
        : filter.id === 'unread'
          ? items.filter((item) => item.unread).length
          : items.filter((item) => item.type === filter.id).length;
    return { ...filter, count };
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, items.length]);

  const handleMarkAllRead = () => {
    // Placeholder: could set all as read in state/API
  };

  const handleDismiss = (id) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications & Alerts</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">System notifications and important alerts</p>
        </div>
        <button
          type="button"
          onClick={handleMarkAllRead}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 sm:w-auto"
        >
          <Check className="h-4 w-4" />
          Mark All as Read
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filtersWithCounts.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeFilter === f.id
                ? 'bg-gray-200 dark:bg-slate-600 text-slate-900 dark:text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            {f.label}
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${f.pillClass}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {paginatedItems.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDismiss={handleDismiss}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pages={pageNumbers}
        variant="slate"
        className="border-t border-gray-200 dark:border-slate-700 pt-4 text-sm text-slate-500 dark:text-slate-400"
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </div>
  );
}

export default Notifications;
