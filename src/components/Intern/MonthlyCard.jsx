import DonutChart from "./DonutChart";

export default function MonthlyCard({ data }) {
  const total =
    data.ontime + data.late + data.absent + data.undertime;

  const hasData = total > 0;

  return (
    <div className="card monthly-card">
      <h4 className="month-title">{data.month}</h4>

      <div className="donut-wrapper">
        <DonutChart data={data} />
        <span className="donut-center">{total}</span>
      </div>

      {hasData ? (
        <>
          <div className="total-hours-pill">
            TOTAL HOURS: {data.totalHours ?? 0}
          </div>

          <div className="status-row">
            <span className="pill late">Late: {data.late}</span>
            <span className="pill absent">Absent: {data.absent}</span>
          </div>

          <div className="pill undertime">
            Undertime: {data.undertime}
          </div>
        </>
      ) : (
        <div className="empty-pill">NO DATA FOUND</div>
      )}
    </div>
  );
}