import { useEffect, useState } from 'react';
import {
  Search,
  ChevronDown,
  ClipboardPen,
  UserPen,
  BarChart3,
  Edit3,
  Mail,
  Briefcase,
  User,
  Calendar,
  CalendarCheck,
  FileText,
  Star,
  Plus,
  RotateCcw,
  X,
} from 'lucide-react';
import Avatar from '../../components/Avatar';
import StatusBadge from '../../components/StatusBadge';
import Pagination from '../../components/Pagination';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import useFormValidation from '../../hooks/useFormValidation';
import { maxLength, oneOf, required } from '../../utils/validation';

const initialInterns = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma.wilson@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 2,
    name: 'Liam Carter',
    email: 'liam.carter@gmail.com',
    department: 'Frontend Developer',
    supervisor: 'Jacob Kim',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 3,
    name: 'Mia Johnson',
    email: 'mia.johnson@gmail.com',
    department: 'QA Engineer',
    supervisor: 'Sofia Martinez',
    status: 'Inactive',
    startDate: '2026-01-01',
  },
  {
    id: 4,
    name: 'Noah Brown',
    email: 'noah.brown@gmail.com',
    department: 'Product Design',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 5,
    name: 'Olivia Green',
    email: 'olivia.green@gmail.com',
    department: 'Data Analyst',
    supervisor: 'Jacob Kim',
    status: 'Pending',
    startDate: '2026-01-01',
  },
  {
    id: 6,
    name: 'Ethan Rivera',
    email: 'ethan.rivera@gmail.com',
    department: 'Marketing',
    supervisor: 'Sofia Martinez',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 7,
    name: 'Sophia Clark',
    email: 'sophia.clark@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 8,
    name: 'Aiden Torres',
    email: 'aiden.torres@gmail.com',
    department: 'Backend Developer',
    supervisor: 'Marcus Young',
    status: 'Active',
    startDate: '2026-01-02',
  },
  {
    id: 9,
    name: 'Zoe Carter',
    email: 'zoe.carter@gmail.com',
    department: 'Frontend Developer',
    supervisor: 'Jacob Kim',
    status: 'Pending',
    startDate: '2026-01-03',
  },
  {
    id: 10,
    name: 'Caleb Price',
    email: 'caleb.price@gmail.com',
    department: 'Fullstack Developer',
    supervisor: 'Marcus Young',
    status: 'Active',
    startDate: '2026-01-03',
  },
  {
    id: 11,
    name: 'Harper Davis',
    email: 'harper.davis@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Inactive',
    startDate: '2026-01-04',
  },
  {
    id: 12,
    name: 'Elijah Moore',
    email: 'elijah.moore@gmail.com',
    department: 'Backend Developer',
    supervisor: 'Marcus Young',
    status: 'Active',
    startDate: '2026-01-04',
  },
  {
    id: 13,
    name: 'Lily Bennett',
    email: 'lily.bennett@gmail.com',
    department: 'Frontend Developer',
    supervisor: 'Jacob Kim',
    status: 'Active',
    startDate: '2026-01-05',
  },
  {
    id: 14,
    name: 'Nathan Reed',
    email: 'nathan.reed@gmail.com',
    department: 'Data Analyst',
    supervisor: 'Jacob Kim',
    status: 'Pending',
    startDate: '2026-01-05',
  },
  {
    id: 15,
    name: 'Aria Collins',
    email: 'aria.collins@gmail.com',
    department: 'Product Design',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-06',
  },
  {
    id: 16,
    name: 'Mason Ward',
    email: 'mason.ward@gmail.com',
    department: 'Marketing',
    supervisor: 'Sofia Martinez',
    status: 'Active',
    startDate: '2026-01-06',
  },
  {
    id: 17,
    name: 'Ella Brooks',
    email: 'ella.brooks@gmail.com',
    department: 'QA Engineer',
    supervisor: 'Sofia Martinez',
    status: 'Inactive',
    startDate: '2026-01-07',
  },
  {
    id: 18,
    name: 'Logan Hughes',
    email: 'logan.hughes@gmail.com',
    department: 'Fullstack Developer',
    supervisor: 'Marcus Young',
    status: 'Active',
    startDate: '2026-01-08',
  },
  {
    id: 19,
    name: 'Nora Kelly',
    email: 'nora.kelly@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-08',
  },
  {
    id: 20,
    name: 'Owen Parker',
    email: 'owen.parker@gmail.com',
    department: 'Frontend Developer',
    supervisor: 'Jacob Kim',
    status: 'Pending',
    startDate: '2026-01-09',
  },
];

const modalStatusStyles = {
  Active: 'bg-emerald-100 text-emerald-600',
  Inactive: 'bg-rose-100 text-rose-600',
  Pending: 'bg-amber-100 text-amber-600',
};

function FilterSelect({ label, value, options, onChange, onBlur, error }) {
  return (
    <div className="flex flex-col gap-1 text-slate-900">
      <span className="text-[12px] uppercase tracking-wide text-slate-900 dark:text-white font-bold">{label}</span>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-lg border border-slate-300 bg-slate-200 py-3 pl-4 pr-10 text-base font-medium text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-slate-200 text-slate-900">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ModalSelect({ label, value, options, onChange, onBlur, error }) {
  return (
    <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
      <span>{label}</span>
      <span className="relative">
        <select
          className="appearance-none rounded-md border border-slate-300 bg-slate-100 py-0.5 pl-2 pr-6 text-xs font-semibold text-slate-700 focus:outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-white text-slate-700">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
      </span>
      {error && <span className="text-[10px] text-red-500">{error}</span>}
    </label>
  );
}

function InternManagement() {
  const statusOptions = ['All', 'Active', 'Pending', 'Inactive'];
  const departmentOptions = [
    'All',
    'Ui/UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
  ];
  const modalDepartmentOptions = [
    'UI/UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
  ];
  const supervisorOptions = ['Anna Lee', 'Jacob Kim', 'Sofia Martinez', 'Marcus Young'];
  const attendanceRecords = [
    {
      date: '2026-01-26',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      status: 'Present',
    },
    {
      date: '2026-01-27',
      timeIn: '09:10 AM',
      timeOut: '05:00 PM',
      status: 'Present',
    },
    {
      date: '2026-01-28',
      timeIn: '09:25 AM',
      timeOut: '05:00 PM',
      status: 'Late',
    },
    {
      date: '2026-01-29',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      status: 'Present',
    },
  ];
  const documentRecords = [
    { type: 'Document', file: 'Wilson_NDA.pdf', submitted: '2026-01-20', status: 'Verified' },
    { type: 'Document', file: 'Wilson_ID.pdf', submitted: '2026-01-21', status: 'Verified' },
    { type: 'Document', file: 'Wilson_MOA.pdf', submitted: '2026-01-22', status: 'Verified' },
  ];
  const weekOptions = [
    'Jan 6 - Jan 10, 2026',
    'Jan 13 - Jan 17, 2026',
    'Jan 20 - Jan 24, 2026',
    'Jan 27 - Jan 31, 2026',
    'Feb 3 - Feb 7, 2026',
    'Feb 10 - Feb 12, 2026',
  ];
  const weeklyEvaluationData = {
    'Jan 6 - Jan 10, 2026': {
      attendance: [
        { day: 'Mon', date: 'Jan 6', status: 'Present' },
        { day: 'Tue', date: 'Jan 7', status: 'Present' },
        { day: 'Wed', date: 'Jan 8', status: 'Late' },
        { day: 'Thu', date: 'Jan 9', status: 'Present' },
        { day: 'Fri', date: 'Jan 10', status: 'Present' },
      ],
      reports: [
        { day: 'Mon', date: 'Jan 6', status: 'Submitted' },
        { day: 'Tue', date: 'Jan 7', status: 'Submitted' },
        { day: 'Wed', date: 'Jan 8', status: 'Submitted' },
        { day: 'Thu', date: 'Jan 9', status: 'Missing' },
        { day: 'Fri', date: 'Jan 10', status: 'Submitted' },
      ],
    },
    'Jan 13 - Jan 17, 2026': {
      attendance: [
        { day: 'Mon', date: 'Jan 13', status: 'Present' },
        { day: 'Tue', date: 'Jan 14', status: 'Present' },
        { day: 'Wed', date: 'Jan 15', status: 'Present' },
        { day: 'Thu', date: 'Jan 16', status: 'Absent' },
        { day: 'Fri', date: 'Jan 17', status: 'Present' },
      ],
      reports: [
        { day: 'Mon', date: 'Jan 13', status: 'Submitted' },
        { day: 'Tue', date: 'Jan 14', status: 'Submitted' },
        { day: 'Wed', date: 'Jan 15', status: 'Missing' },
        { day: 'Thu', date: 'Jan 16', status: 'Missing' },
        { day: 'Fri', date: 'Jan 17', status: 'Submitted' },
      ],
    },
    'Jan 20 - Jan 24, 2026': {
      attendance: [
        { day: 'Mon', date: 'Jan 20', status: 'Present' },
        { day: 'Tue', date: 'Jan 21', status: 'Present' },
        { day: 'Wed', date: 'Jan 22', status: 'Present' },
        { day: 'Thu', date: 'Jan 23', status: 'Present' },
        { day: 'Fri', date: 'Jan 24', status: 'Late' },
      ],
      reports: [
        { day: 'Mon', date: 'Jan 20', status: 'Submitted' },
        { day: 'Tue', date: 'Jan 21', status: 'Submitted' },
        { day: 'Wed', date: 'Jan 22', status: 'Submitted' },
        { day: 'Thu', date: 'Jan 23', status: 'Submitted' },
        { day: 'Fri', date: 'Jan 24', status: 'Submitted' },
      ],
    },
    'Jan 27 - Jan 31, 2026': {
      attendance: [
        { day: 'Mon', date: 'Jan 27', status: 'Present' },
        { day: 'Tue', date: 'Jan 28', status: 'Late' },
        { day: 'Wed', date: 'Jan 29', status: 'Present' },
        { day: 'Thu', date: 'Jan 30', status: 'Present' },
        { day: 'Fri', date: 'Jan 31', status: 'Present' },
      ],
      reports: [
        { day: 'Mon', date: 'Jan 27', status: 'Submitted' },
        { day: 'Tue', date: 'Jan 28', status: 'Submitted' },
        { day: 'Wed', date: 'Jan 29', status: 'Missing' },
        { day: 'Thu', date: 'Jan 30', status: 'Submitted' },
        { day: 'Fri', date: 'Jan 31', status: 'Submitted' },
      ],
    },
    'Feb 3 - Feb 7, 2026': {
      attendance: [
        { day: 'Mon', date: 'Feb 3', status: 'Present' },
        { day: 'Tue', date: 'Feb 4', status: 'Present' },
        { day: 'Wed', date: 'Feb 5', status: 'Present' },
        { day: 'Thu', date: 'Feb 6', status: 'Present' },
        { day: 'Fri', date: 'Feb 7', status: 'Present' },
      ],
      reports: [
        { day: 'Mon', date: 'Feb 3', status: 'Submitted' },
        { day: 'Tue', date: 'Feb 4', status: 'Submitted' },
        { day: 'Wed', date: 'Feb 5', status: 'Submitted' },
        { day: 'Thu', date: 'Feb 6', status: 'Submitted' },
        { day: 'Fri', date: 'Feb 7', status: 'Submitted' },
      ],
    },
    'Feb 10 - Feb 12, 2026': {
      attendance: [
        { day: 'Mon', date: 'Feb 10', status: 'Present' },
        { day: 'Tue', date: 'Feb 11', status: 'Late' },
        { day: 'Wed', date: 'Feb 12', status: 'Present' },
      ],
      reports: [
        { day: 'Mon', date: 'Feb 10', status: 'Submitted' },
        { day: 'Tue', date: 'Feb 11', status: 'Submitted' },
        { day: 'Wed', date: 'Feb 12', status: 'Missing' },
      ],
    },
  };
  const overallStats = {
    totalWorkingDays: 28,
    daysPresent: 24,
    daysAbsent: 1,
    tardiness: 4,
    reportsSubmitted: 24,
  };
  const recentActivityItems = [
    { label: 'Submitted daily report', color: 'bg-emerald-500', timestamp: 'Feb 12, 2026 - 4:55 PM' },
    { label: 'Arrived late (15 minutes)', color: 'bg-amber-500', timestamp: 'Feb 11, 2026 - 9:15 AM' },
    { label: 'Submitted daily report', color: 'bg-emerald-500', timestamp: 'Feb 11, 2026 - 5:02 PM' },
    { label: 'Absent - no attendance recorded', color: 'bg-rose-500', timestamp: 'Feb 10, 2026' },
    { label: 'Daily report missing', color: 'bg-rose-500', timestamp: 'Feb 10, 2026' },
    { label: 'Submitted daily report', color: 'bg-emerald-500', timestamp: 'Feb 7, 2026 - 4:48 PM' },
  ];
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeIntern, setActiveIntern] = useState(null);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [performanceIntern, setPerformanceIntern] = useState(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [evaluationIntern, setEvaluationIntern] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyOrigin, setHistoryOrigin] = useState(null);
  const [pageFeedback, setPageFeedback] = useState(null);
  const [profileFeedback, setProfileFeedback] = useState(null);
  const [evaluationFeedback, setEvaluationFeedback] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingEvaluation, setIsSavingEvaluation] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isAttendanceExpanded, setIsAttendanceExpanded] = useState(false);
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isAddInternOpen, setIsAddInternOpen] = useState(false);
  const [isAddingIntern, setIsAddingIntern] = useState(false);
  const [internList, setInternList] = useState(initialInterns);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const addInternStatusOptions = ['Active', 'Pending', 'Inactive'];
  const filterForm = useFormValidation(
    {
      searchTerm: '',
      statusFilter: 'All',
      departmentFilter: 'All',
    },
    {
      searchTerm: [maxLength(100)],
      statusFilter: [oneOf(statusOptions)],
      departmentFilter: [oneOf(departmentOptions)],
    }
  );
  const profileForm = useFormValidation(
    {
      department: modalDepartmentOptions[0],
      supervisor: supervisorOptions[0],
    },
    {
      department: [required(), oneOf(modalDepartmentOptions)],
      supervisor: [required(), oneOf(supervisorOptions)],
    }
  );
  const evaluationForm = useFormValidation(
    {
      selectedWeek: weekOptions[0],
      adminComments: '',
    },
    {
      selectedWeek: [required()],
      adminComments: [maxLength(1000)],
    }
  );
  const addInternForm = useFormValidation(
    {
      name: '',
      email: '',
      department: modalDepartmentOptions[0],
      supervisor: supervisorOptions[0],
      status: 'Inactive',
      startDate: '',
    },
    {
      name: [required(), maxLength(100)],
      email: [required(), maxLength(120)],
      department: [required(), oneOf(modalDepartmentOptions)],
      supervisor: [required(), oneOf(supervisorOptions)],
      status: [required(), oneOf(addInternStatusOptions)],
      startDate: [required()],
    }
  );

  const filteredInterns = internList.filter((intern) => {
    const normalizedStatus = filterForm.values.statusFilter.toLowerCase();
    const normalizedDepartment = filterForm.values.departmentFilter.toLowerCase();
    const normalizedSearch = filterForm.values.searchTerm.trim().toLowerCase();
    const matchesStatus =
      normalizedStatus === 'all' || intern.status.toLowerCase() === normalizedStatus;
    const matchesDepartment =
      normalizedDepartment === 'all' ||
      intern.department.toLowerCase() === normalizedDepartment;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      intern.name.toLowerCase().includes(normalizedSearch) ||
      intern.email.toLowerCase().includes(normalizedSearch);
    return matchesStatus && matchesDepartment && matchesSearch;
  });
  const totalPages = Math.max(1, Math.ceil(filteredInterns.length / rowsPerPage));
  const paginatedInterns = filteredInterns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + index;
  }).filter((page) => page <= totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterForm.values.searchTerm, filterForm.values.statusFilter, filterForm.values.departmentFilter]);

  const handleOpenProfile = (intern) => {
    setActiveIntern(intern);
    profileForm.resetForm({
      supervisor: intern.supervisor || supervisorOptions[0],
      department: intern.department || modalDepartmentOptions[0],
    });
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    profileForm.resetForm();
    setProfileFeedback(null);
  };

  const handleOpenPerformance = (intern) => {
    setPerformanceIntern(intern);
    setIsPerformanceOpen(true);
  };

  const handleClosePerformance = () => {
    setIsPerformanceOpen(false);
  };

  const handleOpenEvaluation = (intern) => {
    setEvaluationIntern(intern);
    setIsEvaluationOpen(true);
    setIsHistoryOpen(false);
    evaluationForm.resetForm();
  };

  const handleCloseEvaluation = () => {
    setIsEvaluationOpen(false);
    evaluationForm.resetForm();
    setEvaluationFeedback(null);
  };

  const handleOpenHistory = () => {
    setIsEvaluationOpen(false);
    setHistoryOrigin('evaluation');
    setIsHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setIsHistoryOpen(false);
    setHistoryOrigin(null);
  };
  const handleOpenAddIntern = () => {
    setIsAddInternOpen(true);
  };
  const handleCloseAddIntern = () => {
    setIsAddInternOpen(false);
    addInternForm.resetForm();
  };
  const handleAddIntern = async () => {
    const nextErrors = addInternForm.validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsAddingIntern(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const nextId =
        internList.length > 0 ? Math.max(...internList.map((intern) => Number(intern.id) || 0)) + 1 : 1;
      const newIntern = {
        id: nextId,
        name: addInternForm.values.name.trim(),
        email: addInternForm.values.email.trim(),
        department: addInternForm.values.department,
        supervisor: addInternForm.values.supervisor,
        status: addInternForm.values.status,
        startDate: addInternForm.values.startDate,
      };
      setInternList((prev) => [newIntern, ...prev]);
      setCurrentPage(1);
      setIsAddInternOpen(false);
      addInternForm.resetForm();
      setPageFeedback({ type: 'success', message: 'New intern added successfully.' });
    } catch (error) {
      setPageFeedback({ type: 'error', message: 'Unable to add intern. Please try again.' });
    } finally {
      setIsAddingIntern(false);
    }
  };
  const handleSaveProfile = async () => {
    const nextErrors = profileForm.validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsSavingProfile(true);
    setProfileFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsProfileOpen(false);
      setPageFeedback({ type: 'success', message: 'Profile updated successfully.' });
    } catch (error) {
      setProfileFeedback({ type: 'error', message: 'Unable to save profile changes.' });
    } finally {
      setIsSavingProfile(false);
    }
  };
  const handleSaveEvaluation = async () => {
    const nextErrors = evaluationForm.validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsSavingEvaluation(true);
    setEvaluationFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setEvaluationFeedback({ type: 'success', message: 'Evaluation saved successfully.' });
    } catch (error) {
      setEvaluationFeedback({ type: 'error', message: 'Unable to save evaluation.' });
    } finally {
      setIsSavingEvaluation(false);
    }
  };

  const handleConfirmDeactivate = async () => {
    if (!activeIntern) {
      return;
    }
    setIsDeactivating(true);
    setProfileFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsProfileOpen(false);
      setIsDeactivateOpen(false);
      setPageFeedback({ type: 'success', message: `${activeIntern.name} has been set to inactive.` });
    } catch (error) {
      setProfileFeedback({ type: 'error', message: 'Unable to deactivate intern. Please try again.' });
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
      <Toast
        type={pageFeedback?.type}
        message={pageFeedback?.message}
        onDismiss={() => setPageFeedback(null)}
      />
      {isProfileOpen && activeIntern && (
        <Modal
          isOpen={isProfileOpen}
          overlayClassName="bg-gray-900/30 dark:bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-semibold text-slate-800">Intern Profile</h2>
              <button
                type="button"
                onClick={handleCloseProfile}
                className="rounded-md px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Toast
              type={profileFeedback?.type}
              message={profileFeedback?.message}
              onDismiss={() => setProfileFeedback(null)}
            />

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex items-start gap-3">
                <Avatar
                  name={activeIntern.name}
                  size="h-11 w-11"
                  className="text-white"
                  textClassName="text-lg font-semibold"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-slate-800">{activeIntern.name}</p>
                    <StatusBadge
                      label={activeIntern.status}
                      variant="soft"
                      toneMap={modalStatusStyles}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{activeIntern.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <ModalSelect
                      label="Department:"
                    value={profileForm.values.department}
                      options={modalDepartmentOptions}
                    onChange={(value) => profileForm.handleChange('department', value)}
                    onBlur={() => profileForm.handleBlur('department')}
                    error={profileForm.errors.department}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-slate-600 md:ml-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <ModalSelect
                    label="Supervisor:"
                    value={profileForm.values.supervisor}
                    options={supervisorOptions}
                    onChange={(value) => profileForm.handleChange('supervisor', value)}
                    onBlur={() => profileForm.handleBlur('supervisor')}
                    error={profileForm.errors.supervisor}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    Started:
                  </span>
                  <span className="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {activeIntern.startDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsAttendanceExpanded((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-t-xl bg-slate-600 px-4 py-2 text-xs font-semibold uppercase text-white"
              >
                <span>Recent Attendance</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isAttendanceExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              {isAttendanceExpanded && (
                <div className="max-h-60 divide-y divide-slate-200 overflow-y-auto text-xs text-slate-600">
                  <div className="sticky top-0 grid grid-cols-2 gap-2 bg-slate-100 px-4 py-2 font-semibold text-slate-500 sm:grid-cols-4">
                    <span>Date</span>
                    <span>Time In</span>
                    <span>Time Out</span>
                    <span>Status</span>
                  </div>
                  {attendanceRecords.map((record) => (
                    <div key={`${record.date}-${record.timeIn}`} className="grid grid-cols-2 gap-2 px-4 py-2 sm:grid-cols-4">
                      <span>{record.date}</span>
                      <span>{record.timeIn}</span>
                      <span>{record.timeOut}</span>
                      <span
                        className={`inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          record.status === 'Late'
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-emerald-100 text-emerald-600'
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsDocumentsExpanded((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-t-xl bg-slate-600 px-4 py-2 text-xs font-semibold uppercase text-white"
              >
                <span>Document Verification</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isDocumentsExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              {isDocumentsExpanded && (
                <div className="max-h-60 divide-y divide-slate-200 overflow-y-auto text-xs text-slate-600">
                  <div className="sticky top-0 grid grid-cols-2 gap-2 bg-slate-100 px-4 py-2 font-semibold text-slate-500 sm:grid-cols-4">
                    <span>Type</span>
                    <span>File Name</span>
                    <span>Date Submitted</span>
                    <span>Status</span>
                  </div>
                  {documentRecords.map((record) => (
                    <div key={record.file} className="grid grid-cols-2 gap-2 px-4 py-2 sm:grid-cols-4">
                      <span>{record.type}</span>
                      <span>{record.file}</span>
                      <span>{record.submitted}</span>
                      <span className="inline-flex w-fit rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                className={`rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 ${
                  isSavingProfile ? 'cursor-not-allowed opacity-70' : ''
                }`}
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
              >
                {isSavingProfile ? 'Saving...' : 'Save Profile'}
              </button>
              <button
                type="button"
                className={`rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-100 ${
                  isDeactivating ? 'cursor-not-allowed opacity-70' : ''
                }`}
                onClick={() => setIsDeactivateOpen(true)}
                disabled={isDeactivating}
              >
                {isDeactivating ? 'Updating...' : 'Inactive'}
              </button>
            </div>
        </Modal>
      )}

      {isPerformanceOpen && performanceIntern && (
        <Modal
          isOpen={isPerformanceOpen}
          overlayClassName="bg-gray-900/30 dark:bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-semibold text-slate-800">Performance Overview</h2>
              <button
                type="button"
                onClick={handleClosePerformance}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close performance overview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
              <div className="flex items-start gap-4">
                <Avatar
                  name={performanceIntern.name}
                  size="h-16 w-16"
                  className="text-white"
                  textClassName="text-2xl font-semibold"
                />
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-slate-800">{performanceIntern.name}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{performanceIntern.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <span>Department: {performanceIntern.department}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600 md:pt-2 md:mt-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Supervisor: {performanceIntern.supervisor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Started: {performanceIntern.startDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-base font-semibold text-slate-700">
              Intern Performance Record
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                    <CalendarCheck className="h-4 w-4" />
                  </span>
                  Avg Attendance
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-800">92.5</span>
                  <span className="text-sm text-slate-400">(18/20)</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="rounded-lg bg-purple-100 p-2 text-purple-600">
                    <FileText className="h-4 w-4" />
                  </span>
                  Report Submission
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-800">92.5</span>
                  <span className="text-sm text-slate-400">(18/20)</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="rounded-lg bg-amber-100 p-2 text-amber-600">
                    <Star className="h-4 w-4" />
                  </span>
                  Avg Rating
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-800">92.5</span>
                  <span className="text-sm text-slate-400">(18/20)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-slate-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                onClick={() => {
                  setEvaluationIntern(performanceIntern);
                  setIsPerformanceOpen(false);
                  setHistoryOrigin('performance');
                  setIsHistoryOpen(true);
                }}
              >
                <ClipboardPen className="h-4 w-4" />
                View Evaluation History
              </button>
            </div>
        </Modal>
      )}

      {isEvaluationOpen && evaluationIntern && (
        <Modal
          isOpen={isEvaluationOpen}
          overlayClassName="bg-gray-900/30 dark:bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl min-h-[480px] max-h-[85vh] overflow-y-auto"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <Avatar
                  name={evaluationIntern.name}
                  size="h-12 w-12"
                  className="bg-slate-800 text-white"
                  textClassName="text-lg font-semibold"
                />
                <div>
                  <p className="text-base font-semibold text-slate-800">{evaluationIntern.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {evaluationIntern.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                      Department: {evaluationIntern.department}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      Supervisor: {evaluationIntern.supervisor}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Started: {evaluationIntern.startDate}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseEvaluation}
                className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close evaluation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <Toast
              type={evaluationFeedback?.type}
              message={evaluationFeedback?.message}
              onDismiss={() => setEvaluationFeedback(null)}
            />

            <div className="mt-4 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5 rounded-xl border border-slate-200 p-5 text-slate-700">
                <h3 className="text-base font-semibold text-slate-800">Weekly Evaluation</h3>
                <label className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">Select Week</span>
                  <select
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-700"
                    value={evaluationForm.values.selectedWeek}
                    onChange={(event) => evaluationForm.handleChange('selectedWeek', event.target.value)}
                    onBlur={() => evaluationForm.handleBlur('selectedWeek')}
                  >
                    {weekOptions.map((week) => (
                      <option key={week} value={week}>{week}</option>
                    ))}
                  </select>
                </label>
                {evaluationForm.errors.selectedWeek && (
                  <p className="text-xs text-red-500">{evaluationForm.errors.selectedWeek}</p>
                )}

                {weeklyEvaluationData[evaluationForm.values.selectedWeek] && (() => {
                  const weekData = weeklyEvaluationData[evaluationForm.values.selectedWeek];
                  const presentCount = weekData.attendance.filter((d) => d.status === 'Present' || d.status === 'Late').length;
                  const lateCount = weekData.attendance.filter((d) => d.status === 'Late').length;
                  const absentCount = weekData.attendance.filter((d) => d.status === 'Absent').length;
                  const totalDays = weekData.attendance.length;
                  const submittedCount = weekData.reports.filter((d) => d.status === 'Submitted').length;
                  const attendanceRate = totalDays > 0 ? (presentCount / totalDays) * 100 : 0;
                  const submissionRate = totalDays > 0 ? (submittedCount / totalDays) * 100 : 0;
                  const weeklyScore = Math.round((attendanceRate + submissionRate) / 2);
                  return (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Attendance Summary</p>
                        <div className="mt-1.5 space-y-1 text-sm text-slate-600">
                          <p>Present: <span className="font-semibold text-emerald-700">{presentCount}/{totalDays} days</span></p>
                          {lateCount > 0 && <p>Late: <span className="font-semibold text-amber-700">{lateCount} occurrence{lateCount > 1 ? 's' : ''}</span></p>}
                          {absentCount > 0 && <p>Absent: <span className="font-semibold text-rose-700">{absentCount} day{absentCount > 1 ? 's' : ''}</span></p>}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">Daily Report Submission</p>
                        <div className="mt-1.5 text-sm text-slate-600">
                          <p>Submitted: <span className="font-semibold text-emerald-700">{submittedCount}/{totalDays} reports</span></p>
                          {totalDays - submittedCount > 0 && (
                            <p>Missing: <span className="font-semibold text-rose-700">{totalDays - submittedCount} report{totalDays - submittedCount > 1 ? 's' : ''}</span></p>
                          )}
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-xs text-slate-500">Weekly Score</p>
                        <p className="text-2xl font-semibold text-slate-800">{weeklyScore}%</p>
                        <p className="text-xs text-slate-500">Based on attendance ({Math.round(attendanceRate)}%) and submission ({Math.round(submissionRate)}%)</p>
                      </div>
                    </div>
                  );
                })()}

                <div>
                  <p className="text-sm font-semibold text-slate-800">Admin Comments</p>
                  <textarea
                    rows={3}
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-700"
                    placeholder="Add feedback..."
                    value={evaluationForm.values.adminComments}
                    onChange={(event) => evaluationForm.handleChange('adminComments', event.target.value)}
                    onBlur={() => evaluationForm.handleBlur('adminComments')}
                  />
                  {evaluationForm.errors.adminComments && (
                    <p className="mt-2 text-xs text-red-500">{evaluationForm.errors.adminComments}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    onClick={handleOpenHistory}
                  >
                    Evaluation History
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEvaluation}
                    className={`rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white ${
                      isSavingEvaluation ? 'cursor-not-allowed opacity-70' : ''
                    }`}
                    disabled={isSavingEvaluation}
                  >
                    {isSavingEvaluation ? 'Saving...' : 'Save Evaluation'}
                  </button>
                </div>
              </div>

              <div className="space-y-5 rounded-xl border border-slate-200 p-5 text-sm text-slate-700">
                <h3 className="text-base font-semibold text-slate-800">Overall Evaluation <span className="font-normal text-xs text-slate-500">(since start date)</span></h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <p className="text-sm font-semibold text-emerald-700">Days Present</p>
                    <p className="mt-1 text-xl font-semibold text-emerald-700">{overallStats.daysPresent}</p>
                    <p className="text-xs text-emerald-600">Out of {overallStats.totalWorkingDays} days</p>
                  </div>
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                    <p className="text-sm font-semibold text-rose-700">Days Absent</p>
                    <p className="mt-1 text-xl font-semibold text-rose-700">{overallStats.daysAbsent}</p>
                    <p className="text-xs text-rose-600">Out of {overallStats.totalWorkingDays} days</p>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <p className="text-sm font-semibold text-amber-700">Tardiness</p>
                    <p className="mt-1 text-xl font-semibold text-amber-700">{overallStats.tardiness}</p>
                    <p className="text-xs text-amber-600">Late occurrences</p>
                  </div>
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                    <p className="text-sm font-semibold text-indigo-700">Report Submission Rate</p>
                    <p className="mt-1 text-xl font-semibold text-indigo-700">
                      {Math.round((overallStats.reportsSubmitted / overallStats.totalWorkingDays) * 100)}%
                    </p>
                    <p className="text-xs text-indigo-600">{overallStats.reportsSubmitted}/{overallStats.totalWorkingDays} reports</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">Recent Activity</p>
                  <ul className="mt-3 space-y-3">
                    {recentActivityItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.color}`} />
                        <div>
                          <p className="text-sm text-slate-700">{item.label}</p>
                          <p className="text-xs text-slate-400">{item.timestamp}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
        </Modal>
      )}

      {isHistoryOpen && (
        <Modal
          isOpen={isHistoryOpen}
          overlayClassName="bg-gray-900/30 dark:bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-6xl rounded-2xl bg-white p-6 shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
        >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Evaluation History</h2>
              <button
                type="button"
                onClick={handleCloseHistory}
                className="rounded-full border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close evaluation history"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 min-h-0 flex-1 overflow-auto rounded-xl border border-slate-200">
              <div className="min-w-[760px]">
                <div className="sticky top-0 z-10 grid grid-cols-[1fr_0.6fr_0.8fr_0.8fr_1.5fr] gap-3 bg-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <span>Period</span>
                  <span className="text-center">Attendance</span>
                  <span className="text-center">Report Submission</span>
                  <span>Evaluator</span>
                  <span>Comments</span>
                </div>
                <div className="divide-y divide-slate-200 text-sm text-slate-600">
                  {[
                    { period: 'Jan 6 - Jan 10, 2026', attendance: '4/5', submission: '4/5', evaluator: 'Juan Delacruz', comments: 'Good first week. Missed one daily report but attendance was solid overall.' },
                    { period: 'Jan 13 - Jan 17, 2026', attendance: '4/5', submission: '3/5', evaluator: 'Juan Delacruz', comments: 'Absent one day and missed two reports. Needs to improve consistency.' },
                    { period: 'Jan 20 - Jan 24, 2026', attendance: '5/5', submission: '5/5', evaluator: 'Juan Delacruz', comments: 'Excellent week. Perfect attendance and all reports submitted on time.' },
                    { period: 'Jan 27 - Jan 31, 2026', attendance: '5/5', submission: '4/5', evaluator: 'Juan Delacruz', comments: 'Arrived late once. One report missing mid-week.' },
                    { period: 'Feb 3 - Feb 7, 2026', attendance: '5/5', submission: '5/5', evaluator: 'Juan Delacruz', comments: 'Another perfect week. Keep up the great work.' },
                    { period: 'Feb 10 - Feb 12, 2026', attendance: '3/3', submission: '2/3', evaluator: 'Juan Delacruz', comments: 'Partial week so far. One report still pending.' },
                  ].map((row) => (
                    <div key={row.period} className="grid grid-cols-[1fr_0.6fr_0.8fr_0.8fr_1.5fr] gap-3 px-5 py-3">
                      <span className="font-medium text-slate-700">{row.period}</span>
                      <span className="text-center font-semibold text-slate-700">{row.attendance}</span>
                      <span className="text-center font-semibold text-slate-700">{row.submission}</span>
                      <span>{row.evaluator}</span>
                      <span className="text-sm text-slate-500">{row.comments}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (historyOrigin === 'performance' && performanceIntern) {
                    setIsHistoryOpen(false);
                    setHistoryOrigin(null);
                    handleOpenPerformance(performanceIntern);
                  } else if (historyOrigin === 'evaluation' && evaluationIntern) {
                    handleOpenEvaluation(evaluationIntern);
                  } else {
                    handleCloseHistory();
                  }
                }}
                className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Back
              </button>
            </div>
        </Modal>
      )}
      {isAddInternOpen && (
        <Modal
          isOpen={isAddInternOpen}
          overlayClassName="bg-gray-900/30 dark:bg-slate-900/60 backdrop-blur-sm"
          containerClassName="px-4 py-6"
          panelClassName="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-base font-semibold text-slate-800">Add Intern</h2>
            <button
              type="button"
              onClick={handleCloseAddIntern}
              className="rounded-md px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100"
              aria-label="Close add intern modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                placeholder="Enter full name"
                value={addInternForm.values.name}
                onChange={(event) => addInternForm.handleChange('name', event.target.value)}
                onBlur={() => addInternForm.handleBlur('name')}
              />
              {addInternForm.errors.name && (
                <p className="mt-1 text-xs text-red-500">{addInternForm.errors.name}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                placeholder="name@example.com"
                value={addInternForm.values.email}
                onChange={(event) => addInternForm.handleChange('email', event.target.value)}
                onBlur={() => addInternForm.handleBlur('email')}
              />
              {addInternForm.errors.email && (
                <p className="mt-1 text-xs text-red-500">{addInternForm.errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Department</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                value={addInternForm.values.department}
                onChange={(event) => addInternForm.handleChange('department', event.target.value)}
                onBlur={() => addInternForm.handleBlur('department')}
              >
                {modalDepartmentOptions.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              {addInternForm.errors.department && (
                <p className="mt-1 text-xs text-red-500">{addInternForm.errors.department}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Supervisor</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                value={addInternForm.values.supervisor}
                onChange={(event) => addInternForm.handleChange('supervisor', event.target.value)}
                onBlur={() => addInternForm.handleBlur('supervisor')}
              >
                {supervisorOptions.map((supervisor) => (
                  <option key={supervisor} value={supervisor}>
                    {supervisor}
                  </option>
                ))}
              </select>
              {addInternForm.errors.supervisor && (
                <p className="mt-1 text-xs text-red-500">{addInternForm.errors.supervisor}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                value={addInternForm.values.status}
                onChange={(event) => addInternForm.handleChange('status', event.target.value)}
                onBlur={() => addInternForm.handleBlur('status')}
              >
                {addInternStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {addInternForm.errors.status && (
                <p className="mt-1 text-xs text-red-500">{addInternForm.errors.status}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Start Date</label>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                value={addInternForm.values.startDate}
                onChange={(event) => addInternForm.handleChange('startDate', event.target.value)}
                onBlur={() => addInternForm.handleBlur('startDate')}
              />
              {addInternForm.errors.startDate && (
                <p className="mt-1 text-xs text-red-500">{addInternForm.errors.startDate}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={handleCloseAddIntern}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 ${
                isAddingIntern ? 'cursor-not-allowed opacity-70' : ''
              }`}
              onClick={handleAddIntern}
              disabled={isAddingIntern}
            >
              {isAddingIntern ? 'Adding...' : 'Add Intern'}
            </button>
          </div>
        </Modal>
      )}

      <section className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">Intern Management</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Add and manage intern profiles</p>
        </div>
        <button
          type="button"
          onClick={handleOpenAddIntern}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Add Intern
        </button>
      </section>

      <div className="rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-1 flex-col gap-1">
            <span className="select-none text-[11px] uppercase tracking-wide text-transparent" aria-hidden="true">
              Search
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full rounded-lg border border-slate-300 bg-slate-200 py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                value={filterForm.values.searchTerm}
                onChange={(event) => filterForm.handleChange('searchTerm', event.target.value)}
                onBlur={() => filterForm.handleBlur('searchTerm')}
              />
              {filterForm.errors.searchTerm && (
                <p className="mt-1 text-xs text-red-500">{filterForm.errors.searchTerm}</p>
              )}
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <FilterSelect
              label="Status"
              value={filterForm.values.statusFilter}
              options={statusOptions}
              onChange={(value) => filterForm.handleChange('statusFilter', value)}
              onBlur={() => filterForm.handleBlur('statusFilter')}
              error={filterForm.errors.statusFilter}
            />
            <FilterSelect
              label="Department"
              value={filterForm.values.departmentFilter}
              options={departmentOptions}
              onChange={(value) => filterForm.handleChange('departmentFilter', value)}
              onBlur={() => filterForm.handleBlur('departmentFilter')}
              error={filterForm.errors.departmentFilter}
            />
          </div>
        </div>
      </div>

      <DataTable
        footer={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pages={pageNumbers}
            variant="amber"
            className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 text-sm text-slate-500 dark:text-slate-400 md:gap-4"
            onPageChange={setCurrentPage}
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          />
        }
      >
        <table className="min-w-[980px] divide-y divide-gray-200 dark:divide-slate-700 lg:min-w-full">
          <thead className="bg-gray-50 dark:bg-slate-700/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Supervisor</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-200">
            {paginatedInterns.map((intern) => (
              <tr key={intern.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/60">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={intern.name} size="h-10 w-10" textClassName="text-base font-semibold" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{intern.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{intern.email}</td>
                <td className="px-6 py-4">{intern.department}</td>
                <td className="px-6 py-4">{intern.supervisor}</td>
                <td className="px-6 py-4">
                  <StatusBadge label={intern.status} />
                </td>
                <td className="px-6 py-4">{intern.startDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-gray-100 dark:bg-slate-700 p-2 text-slate-700 dark:text-slate-200 transition-colors hover:bg-gray-200 dark:hover:bg-slate-600"
                      aria-label="View"
                      onClick={() => handleOpenProfile(intern)}
                    >
                      <UserPen className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-gray-100 dark:bg-slate-700 p-2 text-slate-700 dark:text-slate-200 transition-colors hover:bg-gray-200 dark:hover:bg-slate-600"
                      aria-label="Performance"
                      onClick={() => handleOpenPerformance(intern)}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-gray-100 dark:bg-slate-700 p-2 text-slate-700 dark:text-slate-200 transition-colors hover:bg-gray-200 dark:hover:bg-slate-600"
                      aria-label="Edit"
                      onClick={() => handleOpenEvaluation(intern)}
                    >
                      <ClipboardPen className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
      </div>
      <ConfirmDialog
        isOpen={isDeactivateOpen}
        title="Set intern to inactive?"
        description={
          activeIntern
            ? `This will mark ${activeIntern.name} as inactive.`
            : 'This will mark the intern as inactive.'
        }
        confirmLabel="Set Inactive"
        tone="danger"
        onCancel={() => setIsDeactivateOpen(false)}
        onConfirm={handleConfirmDeactivate}
        isProcessing={isDeactivating}
      />
    </>
  );
}

export default InternManagement;
