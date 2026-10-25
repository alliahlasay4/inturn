import { createPortal } from 'react-dom';

function Modal({
  isOpen,
  children,
  overlayClassName = 'bg-slate-900/80',
  containerClassName = 'px-4 py-4 sm:py-6',
  panelClassName = 'w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl',
}) {
  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${overlayClassName} ${containerClassName}`.trim()}>
      <div className={`${panelClassName} max-h-[90vh] overflow-y-auto`.trim()} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;
