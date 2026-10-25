import { useRef, useState } from 'react';
import { User, Mail, Phone, Briefcase, Hash, Calendar, Lock, ShieldCheck, Eye, EyeOff, X } from 'lucide-react';
import '../../styles/layout.css';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import useFormValidation from '../../hooks/useFormValidation';
import {
  digitsLength,
  email as emailValidator,
  matchField,
  maxLength,
  minLength,
  phone as phoneValidator,
  required,
  validatePassword,
} from '../../utils/validation';

const PROFILE_DATA = {
  firstName: 'Anna',
  lastName: 'Bautista',
  email: 'anna.bautista@gmail.com',
  phone: '+63 917 654 3210',
  department: 'UI/UX Designer',
  role: 'Supervisor',
  employeeId: 'EMP-2026-001',
  joinDate: '01/01/2026',
};

const tabs = ['General', 'Security'];

function Profile() {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="profile-page space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences</p>
      </header>

      <div className="profile-tabs flex w-full items-center gap-2 rounded-full border-2 border-gray-200 bg-gray-50 p-1 dark:border-slate-600 dark:bg-slate-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`profile-tab flex-1 rounded-full px-4 py-2 text-sm font-semibold text-center transition-colors sm:px-6 ${
                isActive
                  ? 'profile-tab-active dark:bg-slate-700 dark:text-white shadow-md'
                  : 'dark:bg-transparent dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === 'General' ? <ProfileGeneral /> : <ProfileSecurity />}
    </div>
  );
}

function ProfileGeneral() {
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const initialProfile = {
    firstName: PROFILE_DATA.firstName,
    lastName: PROFILE_DATA.lastName,
    email: PROFILE_DATA.email,
    phone: PROFILE_DATA.phone,
  };
  const { values, errors, handleChange, handleBlur, validateForm, resetForm } = useFormValidation(
    initialProfile,
    {
      firstName: [required(), minLength(2), maxLength(50)],
      lastName: [required(), minLength(2), maxLength(50)],
      email: [required(), emailValidator()],
      phone: [required(), phoneValidator()],
    }
  );
  const handleCancel = () => {
    resetForm(initialProfile);
    setIsEditing(false);
    setFeedback(null);
  };
  const handleEditToggle = async () => {
    if (isEditing) {
      const nextErrors = validateForm();
      if (Object.keys(nextErrors).length > 0) {
        return;
      }
      setIsSaving(true);
      setFeedback(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setIsEditing(false);
        setFeedback({ type: 'success', message: 'Profile updated successfully.' });
      } catch (error) {
        setFeedback({ type: 'error', message: 'Unable to save profile changes.' });
      } finally {
        setIsSaving(false);
      }
      return;
    }
    setIsEditing(true);
  };

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/70 p-6 space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Information</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal information and profile picture</p>
      </header>
      <Toast
        type={feedback?.type}
        message={feedback?.message}
        onDismiss={() => setFeedback(null)}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 text-sm font-semibold text-slate-900 dark:text-white">
            AB
          </div>
          <div>
            <p className="text-slate-900 dark:text-white font-semibold">Anna Bautista</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Supervisor</p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-gray-100 dark:bg-slate-700 px-2 py-0.5 text-slate-700 dark:text-slate-200">Admin</span>
              <span className="rounded-full bg-gray-100 dark:bg-slate-700 px-2 py-0.5 text-slate-700 dark:text-slate-200">UI/UX Designer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileField
          label="First Name"
          icon={<User className="h-4 w-4" />}
          value={values.firstName}
          error={errors.firstName}
          isEditable={isEditing}
          onChange={(event) => handleChange('firstName', event.target.value)}
          onBlur={() => handleBlur('firstName')}
        />
        <ProfileField
          label="Last Name"
          icon={<User className="h-4 w-4" />}
          value={values.lastName}
          error={errors.lastName}
          isEditable={isEditing}
          onChange={(event) => handleChange('lastName', event.target.value)}
          onBlur={() => handleBlur('lastName')}
        />
        <ProfileField
          label="Email Address"
          icon={<Mail className="h-4 w-4" />}
          value={values.email}
          error={errors.email}
          isEditable={isEditing}
          onChange={(event) => handleChange('email', event.target.value)}
          onBlur={() => handleBlur('email')}
        />
        <ProfileField
          label="Phone Number"
          icon={<Phone className="h-4 w-4" />}
          value={values.phone}
          error={errors.phone}
          isEditable={isEditing}
          onChange={(event) => handleChange('phone', event.target.value)}
          onBlur={() => handleBlur('phone')}
        />
        <ProfileField label="Department" icon={<Briefcase className="h-4 w-4" />} value={PROFILE_DATA.department} />
        <ProfileField label="Role" icon={<ShieldCheck className="h-4 w-4" />} value={PROFILE_DATA.role} />
        <ProfileField label="Employee ID" icon={<Hash className="h-4 w-4" />} value={PROFILE_DATA.employeeId} />
        <ProfileField label="Join Date" icon={<Calendar className="h-4 w-4" />} value={PROFILE_DATA.joinDate} />
      </div>

      <div className="flex justify-end gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleEditToggle}
          className={`rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 ${
            isSaving ? 'cursor-not-allowed opacity-70' : ''
          }`}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </section>
  );
}

function ProfileField({ label, icon, value, error, isEditable = false, onChange, onBlur }) {
  const fieldClass = isEditable
    ? 'border-teal-400/70 bg-gray-200 dark:bg-slate-600/70 ring-1 ring-teal-400/40'
    : 'border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-700/70';

  return (
    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {label}
      <div className={`mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-slate-800 dark:text-slate-100 ${fieldClass}`}>
        <span className="text-slate-600 dark:text-slate-300">{icon}</span>
        <input
          type="text"
          value={value}
          readOnly={!isEditable}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>
      {error && isEditable && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </label>
  );
}

function ProfileSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isSessionsOpen, setIsSessionsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const codeInputRefs = useRef([]);
  const [feedback, setFeedback] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isConfirmingCode, setIsConfirmingCode] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const passwordForm = useFormValidation(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    {
      currentPassword: [required()],
      newPassword: [
        required(),
        (value) => (validatePassword(value) ? null : 'Password must be at least 8 characters'),
      ],
      confirmPassword: [required(), matchField('newPassword', 'Passwords do not match')],
    }
  );
  const twoFactorForm = useFormValidation(
    { selectedOption: null, emailValue: '', mobileValue: '' },
    {
      selectedOption: [required('Select a verification method')],
      emailValue: [
        (value, values) => (values.selectedOption === 'email' ? required('Email is required')(value) : null),
        (value, values) => (values.selectedOption === 'email' ? emailValidator()(value) : null),
      ],
      mobileValue: [
        (value, values) => (values.selectedOption === 'mobile' ? required('Mobile number is required')(value) : null),
        (value, values) => (values.selectedOption === 'mobile' ? phoneValidator()(value) : null),
      ],
    }
  );
  const verificationForm = useFormValidation(
    { code: '' },
    {
      code: [required('Verification code is required'), digitsLength(6)],
    }
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsVerifyOpen(false);
    setIsSessionsOpen(false);
    setConfirmAction(null);
    setVerificationCode(Array(6).fill(''));
    twoFactorForm.resetForm();
    verificationForm.resetForm();
  };
  const handleContinue = () => {
    const nextErrors = twoFactorForm.validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsModalOpen(false);
    setIsVerifyOpen(true);
  };
  const handleBackToSelection = () => {
    setIsVerifyOpen(false);
    setIsModalOpen(true);
    setVerificationCode(Array(6).fill(''));
    verificationForm.resetForm();
  };
  const handleCodeChange = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1);
    setVerificationCode((prev) => {
      const updated = [...prev];
      updated[index] = nextValue;
      verificationForm.setFieldValue('code', updated.join(''));
      return updated;
    });
    if (nextValue && index < codeInputRefs.current.length - 1) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };
  const handleCodeKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };
  const handleCodePaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, verificationCode.length);
    if (!pasted) {
      return;
    }
    event.preventDefault();
    const nextValues = Array(verificationCode.length).fill('');
    pasted.split('').forEach((digit, idx) => {
      nextValues[idx] = digit;
    });
    setVerificationCode(nextValues);
    verificationForm.setFieldValue('code', nextValues.join(''));
    const nextIndex = Math.min(pasted.length, verificationCode.length - 1);
    codeInputRefs.current[nextIndex]?.focus();
  };
  const handleCloseSessions = () => {
    setIsSessionsOpen(false);
  };
  const handleConfirm = async () => {
    if (!confirmAction) {
      return;
    }
    setIsLoggingOut(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const label =
        confirmAction.type === 'logoutAll' ? 'all other sessions' : confirmAction.label;
      setFeedback({ type: 'success', message: `Logged out from ${label} successfully.` });
      setConfirmAction(null);
      setIsSessionsOpen(false);
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to log out sessions. Please try again.' });
    } finally {
      setIsLoggingOut(false);
    }
  };
  const handlePasswordUpdate = async () => {
    const nextErrors = passwordForm.validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsUpdatingPassword(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      passwordForm.resetForm();
      setFeedback({ type: 'success', message: 'Password updated successfully.' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to update password.' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };
  const handleConfirmCode = async () => {
    const nextErrors = verificationForm.validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setIsConfirmingCode(true);
    setFeedback(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsVerifyOpen(false);
      setVerificationCode(Array(6).fill(''));
      verificationForm.resetForm();
      setFeedback({ type: 'success', message: 'Two-factor authentication enabled.' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to verify the code. Please try again.' });
    } finally {
      setIsConfirmingCode(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/70 p-6 space-y-4">
          <header>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Change Password</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Update your password to keep your account secure</p>
          </header>
          <div className="space-y-4">
            <PasswordField
              label="Current Password"
              placeholder="Enter current password"
              value={passwordForm.values.currentPassword}
              error={passwordForm.errors.currentPassword}
              onChange={(event) => passwordForm.handleChange('currentPassword', event.target.value)}
              onBlur={() => passwordForm.handleBlur('currentPassword')}
            />
            <PasswordField
              label="New Password"
              placeholder="Enter new password"
              value={passwordForm.values.newPassword}
              error={passwordForm.errors.newPassword}
              onChange={(event) => passwordForm.handleChange('newPassword', event.target.value)}
              onBlur={() => passwordForm.handleBlur('newPassword')}
            />
            <PasswordField
              label="Confirm Password"
              placeholder="Confirm new password"
              value={passwordForm.values.confirmPassword}
              error={passwordForm.errors.confirmPassword}
              onChange={(event) => passwordForm.handleChange('confirmPassword', event.target.value)}
              onBlur={() => passwordForm.handleBlur('confirmPassword')}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handlePasswordUpdate}
              className={`rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 ${
                isUpdatingPassword ? 'cursor-not-allowed opacity-70' : ''
              }`}
              disabled={isUpdatingPassword}
            >
              {isUpdatingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/70 p-6 space-y-6">
          <header>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security Settings</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Additional security options for your account</p>
          </header>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-100 dark:bg-slate-700/60 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">Add an extra layer of security to your account</p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-teal-500 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-600"
            >
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-100 dark:bg-slate-700/60 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Active Sessions</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">Manage devices that are currently logged in</p>
            </div>
            <button
              type="button"
              onClick={() => setIsSessionsOpen(true)}
              className="rounded-lg bg-gray-200 dark:bg-slate-600 px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-500"
            >
              View Sessions
            </button>
          </div>
        </section>
      </div>
      <Toast
        type={feedback?.type}
        message={feedback?.message}
        onDismiss={() => setFeedback(null)}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          overlayClassName="bg-gray-900/50 dark:bg-slate-900/80"
          panelClassName="profile-2fa-modal w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:bg-slate-800 dark:border-slate-600"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Choose how you&apos;d like to receive verification codes to secure your account.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <button
              type="button"
              onClick={() => twoFactorForm.setFieldValue('selectedOption', 'email')}
              className={`profile-2fa-option w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                twoFactorForm.values.selectedOption === 'email'
                  ? 'profile-2fa-option-selected border-teal-400 bg-teal-50 dark:border-teal-400 dark:bg-slate-600 dark:text-white'
                  : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 flex h-4 w-4 items-center justify-center rounded border ${
                    twoFactorForm.values.selectedOption === 'email'
                      ? 'border-teal-400 bg-teal-500'
                      : 'border-slate-300 dark:border-slate-500'
                  }`}
                >
                  {twoFactorForm.values.selectedOption === 'email' && <span className="h-2 w-2 rounded-sm bg-white" />}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <p className="text-base font-semibold text-slate-900 dark:text-white">Email Address</p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Receive verification codes via email.</p>
                  {twoFactorForm.values.selectedOption === 'email' && (
                    <input
                      type="email"
                      value={twoFactorForm.values.emailValue}
                      onChange={(event) => twoFactorForm.handleChange('emailValue', event.target.value)}
                      onBlur={() => twoFactorForm.handleBlur('emailValue')}
                      placeholder="Enter your email address"
                      className="profile-2fa-input mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400 dark:border-slate-500 dark:bg-slate-500 dark:text-white placeholder:dark:text-slate-400"
                    />
                  )}
                  {twoFactorForm.errors.emailValue && (
                    <p className="mt-2 text-xs text-red-500">{twoFactorForm.errors.emailValue}</p>
                  )}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => twoFactorForm.setFieldValue('selectedOption', 'mobile')}
              className={`profile-2fa-option w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                twoFactorForm.values.selectedOption === 'mobile'
                  ? 'profile-2fa-option-selected border-teal-400 bg-teal-50 dark:border-teal-400 dark:bg-slate-600 dark:text-white'
                  : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 flex h-4 w-4 items-center justify-center rounded border ${
                    twoFactorForm.values.selectedOption === 'mobile'
                      ? 'border-teal-400 bg-teal-500'
                      : 'border-slate-300 dark:border-slate-500'
                  }`}
                >
                  {twoFactorForm.values.selectedOption === 'mobile' && <span className="h-2 w-2 rounded-sm bg-white" />}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <p className="text-base font-semibold text-slate-900 dark:text-white">Mobile Number</p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Receive verification codes via SMS.</p>
                  {twoFactorForm.values.selectedOption === 'mobile' && (
                    <input
                      type="tel"
                      value={twoFactorForm.values.mobileValue}
                      onChange={(event) => twoFactorForm.handleChange('mobileValue', event.target.value)}
                      onBlur={() => twoFactorForm.handleBlur('mobileValue')}
                      placeholder="Enter your mobile number"
                      className="profile-2fa-input mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400 dark:border-slate-500 dark:bg-slate-500 dark:text-white placeholder:dark:text-slate-400"
                    />
                  )}
                  {twoFactorForm.errors.mobileValue && (
                    <p className="mt-2 text-xs text-red-500">{twoFactorForm.errors.mobileValue}</p>
                  )}
                </div>
              </div>
            </button>
          </div>
          {twoFactorForm.errors.selectedOption && (
            <p className="mt-3 text-xs text-red-500">{twoFactorForm.errors.selectedOption}</p>
          )}

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="profile-2fa-cancel rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="profile-2fa-continue rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600"
            >
              Continue
            </button>
          </div>
        </Modal>
      )}

      {isVerifyOpen && (
        <Modal
          isOpen={isVerifyOpen}
          overlayClassName="bg-gray-900/50 dark:bg-slate-900/80"
          panelClassName="profile-verify-code-modal w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:bg-slate-800 dark:border-slate-600"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {twoFactorForm.values.selectedOption === 'mobile'
                ? 'Check your mobile number for a code'
                : 'Check your email for a code'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We&apos;ve sent a 6-character code to{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {twoFactorForm.values.selectedOption === 'mobile'
                  ? twoFactorForm.values.mobileValue || '+63 917 654 3210'
                  : twoFactorForm.values.emailValue || 'anna.bautista@gmail.com'}
              </span>
              .
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(event) => handleCodeChange(index, event.target.value)}
                onKeyDown={(event) => handleCodeKeyDown(index, event)}
                onPaste={handleCodePaste}
                onBlur={() => verificationForm.handleBlur('code')}
                ref={(el) => {
                  codeInputRefs.current[index] = el;
                }}
                className="profile-verify-code-input h-11 w-11 rounded-lg border border-slate-300 bg-slate-100 text-center text-base font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 sm:h-12 sm:w-12 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
              />
            ))}
          </div>
          {verificationForm.errors.code && (
            <p className="mt-3 text-center text-xs text-red-500">{verificationForm.errors.code}</p>
          )}

          <div className="mt-8 flex flex-col items-start justify-between gap-4 text-sm text-slate-500 sm:flex-row sm:items-center">
            <button type="button" onClick={handleBackToSelection} className="profile-verify-back font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              &larr; Back
            </button>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <button type="button" className="profile-verify-resend font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Resend Code
              </button>
              <button
                type="button"
                onClick={handleConfirmCode}
                className={`profile-verify-confirm rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 ${
                  isConfirmingCode ? 'cursor-not-allowed opacity-70' : ''
                }`}
                disabled={isConfirmingCode}
              >
                {isConfirmingCode ? 'Confirming...' : 'Confirm Code'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {isSessionsOpen && (
        <Modal
          isOpen={isSessionsOpen}
          overlayClassName="bg-gray-900/50 dark:bg-slate-900/80"
          panelClassName="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Active Sessions</h3>
              <p className="text-sm text-slate-600">
                Manage devices that are currently logged in. If you see an unfamiliar device, log it out immediately.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseSessions}
              className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {[
              {
                id: 'macbook',
                name: 'MacBook Pro',
                browser: 'Chrome on macOS',
                location: 'Manila, PH • 192.168.1.100',
                activity: 'Active now',
                isCurrent: true,
              },
              {
                id: 'iphone',
                name: 'iPhone 14 Pro',
                browser: 'Safari on iOS',
                location: 'Manila, PH • 192.168.1.101',
                activity: '3 hours ago',
              },
              {
                id: 'windows',
                name: 'Windows PC',
                browser: 'Edge on Windows',
                location: 'Manila, PH • 192.168.0.25',
                activity: '1 day ago',
              },
            ].map((session) => (
              <div key={session.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{session.name}</p>
                    <p className="text-xs text-slate-500">{session.browser}</p>
                    <div className="mt-2 flex flex-col gap-1 text-xs text-slate-500">
                      <span>{session.location}</span>
                      <span>{session.activity}</span>
                    </div>
                  </div>
                  {session.isCurrent ? (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Current Device
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmAction({ type: 'logout', label: session.name })}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Log Out
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => setConfirmAction({ type: 'logoutAll', label: 'all sessions' })}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Log Out All Other Sessions
            </button>
          </div>
        </Modal>
      )}

      {confirmAction && (
        <Modal
          isOpen={!!confirmAction}
          overlayClassName="bg-gray-900/40 dark:bg-slate-900/70"
          containerClassName="px-4 z-[60]"
          panelClassName="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl"
        >
          <h4 className="text-base font-semibold text-slate-900">Confirm Logout</h4>
          <p className="mt-2 text-sm text-slate-600">
            {confirmAction.type === 'logout'
              ? 'This device will be logged out immediately. You will need to login again to access your account on this device.'
              : 'This will log out all devices except your current one. You will need to log in again on those devices.'}
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmAction(null)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className={`rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 ${
                isLoggingOut ? 'cursor-not-allowed opacity-70' : ''
              }`}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Working...' : 'Confirm'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function PasswordField({ label, placeholder, value, onChange, onBlur, error }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {label}
      <div className="profile-password-field mt-2 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-700/70 px-3 py-2 text-sm text-slate-800 dark:text-slate-100">
        <Lock className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        <input
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="profile-password-toggle text-teal-600 hover:text-teal-700 dark:text-teal-300 dark:hover:text-teal-200"
          aria-label={isVisible ? 'Hide password' : 'See password'}
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </label>
  );
}

export default Profile;
