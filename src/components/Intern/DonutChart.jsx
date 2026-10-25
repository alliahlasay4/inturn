export default function DonutChart({ data, size = 120, stroke = 14 }) {
  const total =
    data.ontime + data.late + data.absent + data.undertime;

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { value: data.ontime, color: "#6fbf9f" },
    { value: data.late, color: "#f4a261" },
    { value: data.absent, color: "#e76f51" },
    { value: data.undertime, color: "#9089CD" }
  ];

  let offset = 0;

  return (
    <svg width={size} height={size}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segments.map((seg, i) => {
          const length = (seg.value / total) * circumference;
          const dash = `${length} ${circumference - length}`;

          const circle = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );

          offset += length;
          return circle;
        })}
      </g>
    </svg>
  );
}
