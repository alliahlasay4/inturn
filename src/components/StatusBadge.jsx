const toneStyles = {
  Active: 'bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30',
  Inactive: 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30',
  Pending: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30',
  present: 'text-green-600 dark:text-green-400',
  late: 'text-amber-600 dark:text-amber-400',
  absent: 'text-red-600 dark:text-red-400',
};

const variantStyles = {
  pill: 'inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
  soft: 'inline-flex rounded-full px-3 py-0.5 text-xs font-semibold',
  text: 'text-sm font-medium',
};

function StatusBadge({ label, tone, variant = 'pill', className = '', toneMap }) {
  const resolvedTone = tone || label;
  const resolvedToneMap = toneMap || toneStyles;

  return (
    <span className={`${variantStyles[variant]} ${resolvedToneMap[resolvedTone] || ''} ${className}`.trim()}>
      {label}
    </span>
  );
}

export default StatusBadge;
