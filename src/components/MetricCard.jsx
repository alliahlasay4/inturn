const variantStyles = {
  default: {
    card: 'bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-600',
    label: 'text-slate-500 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
  },
  teal: {
    card: 'bg-teal-600/80 border-teal-500/50',
    label: 'text-teal-100',
    value: 'text-white',
  },
  warning: {
    card: 'bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-600',
    label: 'text-amber-600 dark:text-amber-400/90',
    value: 'text-amber-700 dark:text-amber-300',
  },
  danger: {
    card: 'bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-600',
    label: 'text-red-600 dark:text-red-400/90',
    value: 'text-red-700 dark:text-red-300',
  },
};

function MetricCard({ icon, label, value, variant = 'default' }) {
  const s = variantStyles[variant] || variantStyles.default;
  return (
    <div className={`rounded-xl border p-6 flex items-start gap-4 ${s.card}`}>
      {icon && <div className="text-amber-600 dark:text-amber-400 flex-shrink-0">{icon}</div>}
      <div>
        <p className={`text-sm font-medium ${s.label}`}>{label}</p>
        <p className={`text-2xl font-bold ${s.value}`}>{value}</p>
      </div>
    </div>
  );
}

export default MetricCard;
