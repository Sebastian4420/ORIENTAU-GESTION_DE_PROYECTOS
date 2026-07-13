const AREA_CONFIG = [
  { id: 'verbal', name: 'Verbal', color: '#2563eb' },
  { id: 'numerica', name: 'Numérica', color: '#059669' },
  { id: 'logica', name: 'Lógica', color: '#7c3aed' },
  { id: 'memoria', name: 'Memoria', color: '#d97706' },
  { id: 'atencion', name: 'Atención', color: '#dc2626' }
];

export default function ScoreGrid({ scores }) {
  return (
    <>
      <div className="score-grid">
        {AREA_CONFIG.map(area => (
          <div key={area.id} className={`score-card ${area.id}`}>
            <div className="score-area">{area.name}</div>
            <div className="score-value">{scores[area.id]}</div>
            <div className="score-max">/100</div>
          </div>
        ))}
      </div>
      <div className="bar-chart">
        {AREA_CONFIG.map(area => (
          <div key={area.id} className="bar-wrapper">
            <div className="bar-value">{scores[area.id]}</div>
            <div className="bar" style={{ height: `${scores[area.id]}%`, background: area.color }} />
            <div className="bar-label">{area.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export { AREA_CONFIG };
