function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg bg-gray-100 dark:bg-slate-700 p-2 ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ReportStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}

export default ReportStatsGrid;
