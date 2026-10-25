function DataTable({
  title,
  children,
  footer = null,
  className = '',
  headerClassName = 'border-b border-gray-200 dark:border-slate-700 px-4 py-3',
  titleClassName = 'text-lg font-semibold',
  bodyClassName = 'overflow-x-auto [&>table]:min-w-[640px] md:[&>table]:min-w-full',
}) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800 overflow-hidden ${className}`.trim()}>
      {title ? (
        <div className={headerClassName}>
          <h2 className={titleClassName}>{title}</h2>
        </div>
      ) : null}
      <div className={bodyClassName}>{children}</div>
      {footer}
    </div>
  );
}

export default DataTable;
