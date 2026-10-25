import MonthlyCard from "./MonthlyCard";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function getWeekdaysInMonth(year, month) {
  const dates = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export default function MonthlySummary({ records }) {

  const currentYear = new Date().getFullYear();

  // 1️⃣ Initialize all 12 months
  const monthlyMap = MONTHS.map((monthName, index) => ({
    month: monthName,
    monthIndex: index,
    year: currentYear,
    ontime: 0,
    late: 0,
    absent: 0,
    undertime: 0,
    totalHours: 0
  }));

  // 2️⃣ Fill in actual attendance data
  records.forEach(record => {
    const date = new Date(record.date);
    const monthIndex = date.getMonth();
    const monthData = monthlyMap[monthIndex];

    if (record.wasLate) monthData.late++;
    if (record.wasUndertime) monthData.undertime++;
    if (!record.wasLate && !record.wasUndertime) monthData.ontime++;

    monthData.totalHours += Number(record.hours) || 0;
  });

  // 3️⃣ Compute absences per month (past days only)
  const today = new Date();

  monthlyMap.forEach(monthData => {
    const weekdays = getWeekdaysInMonth(
      monthData.year,
      monthData.monthIndex
    );

    const recordedDates = records
      .filter(r =>
        new Date(r.date).getMonth() === monthData.monthIndex
      )
      .map(r => new Date(r.date).toDateString());

    monthData.absent = weekdays.filter(day => {
      const isPastOrToday = day <= today;
      const isRecorded = recordedDates.includes(day.toDateString());
      return isPastOrToday && !isRecorded;
    }).length;
  });

  return (
    <div className="monthly-summary">
      <div className="monthly-grid">
        {monthlyMap.map((month, i) => (
          <MonthlyCard key={i} data={month} />
        ))}
      </div>
    </div>
  );
}