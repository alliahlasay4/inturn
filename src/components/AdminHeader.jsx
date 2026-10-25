import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Calendar, FileText, Bell, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LogoutButton from './LogoutButton';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';

const LogoIcon = ({ theme }) => (
  <img
    src={theme === 'dark' ? logoDark : logoLight}
    alt="InTurn logo"
    className="h-12 sm:h-16 lg:h-19 w-48 sm:w-56 lg:w-64 object-contain"
  />
);

function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
      isActive
        ? 'bg-gray-300 text-slate-900 dark:bg-slate-600 dark:text-white'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;
  const iconLinkClass = ({ isActive }) =>
    `flex items-center justify-center p-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
        : 'text-amber-600 hover:opacity-80 dark:text-amber-400 dark:hover:opacity-80'
    }`;

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (!mobileMenuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-gray-100 border-b border-gray-300 dark:bg-slate-800 dark:border-slate-500 sticky top-0 z-10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:hidden">
          <div className="text-amber-600 dark:text-amber-400">
            <LogoIcon theme={theme} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <div ref={mobileMenuRef} className="relative lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                Menu
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-gray-200 bg-white px-2 py-3 shadow-2xl dark:border-slate-600 dark:bg-slate-800">
                  <nav className="flex flex-col gap-1">
                    <NavLink to="/admin" end className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/interns" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                      <Briefcase className="w-5 h-5" /> Interns
                    </NavLink>
                    <NavLink to="/admin/attendance" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                      <Calendar className="w-5 h-5" /> Attendance
                    </NavLink>
                    <NavLink to="/admin/reports" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                      <FileText className="w-5 h-5" /> Reports
                    </NavLink>
                    <NavLink to="/admin/notifications" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                      <Bell className="w-5 h-5" /> Notifications
                    </NavLink>
                    <NavLink to="/admin/profile" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                      <User className="w-5 h-5" /> Profile
                    </NavLink>
                  </nav>
                  <div className="mt-3 flex justify-end border-t border-gray-200 pt-3 dark:border-slate-700">
                    <LogoutButton />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden grid-cols-[auto_1fr_auto] items-center gap-6 py-3 lg:grid">
          <div className="text-amber-600 dark:text-amber-400">
            <LogoIcon theme={theme} />
          </div>

          <div className="min-w-0 rounded-lg px-2 py-2">
            <nav className="flex items-center justify-center gap-1">
              <NavLink to="/admin" end className={navLinkClass}>
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </NavLink>
              <NavLink to="/admin/interns" className={navLinkClass}>
                <Briefcase className="w-5 h-5" /> Interns
              </NavLink>
              <NavLink to="/admin/attendance" className={navLinkClass}>
                <Calendar className="w-5 h-5" /> Attendance
              </NavLink>
              <NavLink to="/admin/reports" className={navLinkClass}>
                <FileText className="w-5 h-5" /> Reports
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <NavLink
              to="/admin/notifications"
              className={iconLinkClass}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </NavLink>
            <NavLink
              to="/admin/profile"
              className={iconLinkClass}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </NavLink>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
