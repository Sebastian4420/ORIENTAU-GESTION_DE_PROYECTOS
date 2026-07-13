export default function BarChartStandalone({ data }) {
  return (
    <div className="bar-chart">
      {data.map((item, i) => (
        <div key={i} className="bar-wrapper">
          <div className="bar-value">{item.value}</div>
          <div className="bar" style={{ height: `${item.value}%`, background: item.color }} />
          <div className="bar-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
