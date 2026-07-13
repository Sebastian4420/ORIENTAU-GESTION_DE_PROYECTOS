import Badge from '../ui/Badge';

export default function RecommendationList({ recommendations, maxShow = 10 }) {
  const top = recommendations.slice(0, maxShow);

  return (
    <div className="recommendation-list">
      {top.map((rec, i) => (
        <div key={`${rec.name}-${rec.universityId || i}`} className="recommendation-item">
          <div className="recommendation-rank">{i + 1}</div>
          <div className="recommendation-info">
            <h3>{rec.name}</h3>
            <p>{rec.universityName}</p>
          </div>
          <div className="recommendation-score">
            <div className="score-label">Afinidad</div>
            <div className="score-pct">{rec.affinity}%</div>
          </div>
        </div>
      ))}
    </div>
  );
}
