function Avatar({ name, size = 'h-9 w-9', className = '', textClassName = '', children }) {
  const initial = name ? name.charAt(0).toUpperCase() : '';
  const content = children ?? initial;

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-amber-600 dark:bg-slate-700 dark:text-amber-400 ${size} ${className} ${
        textClassName || 'text-sm font-semibold'
      }`}
    >
      {content}
    </div>
  );
}

export default Avatar;
