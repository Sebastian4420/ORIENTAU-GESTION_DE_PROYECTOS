export default function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
          {stat.sub && <div className="stat-sub">{stat.sub}</div>}
        </div>
      ))}
    </div>
  );
}
