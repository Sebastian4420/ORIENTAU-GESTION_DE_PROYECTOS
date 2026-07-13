const AREAS = [
  { id: 'verbal', name: 'Verbal', icon: '📖' },
  { id: 'numerica', name: 'Numérica', icon: '🔢' },
  { id: 'logica', name: 'Lógica', icon: '🧩' },
  { id: 'memoria', name: 'Memoria', icon: '🧠' },
  { id: 'atencion', name: 'Atención', icon: '👁️' }
];

export { AREAS };

export default function AreaSelector({ answers, questions, onSelect }) {
  return (
    <div className="test-area-selector">
      {AREAS.map(area => {
        const areaQuestions = questions.filter(q => q.area === area.id && q.active);
        const areaAnswers = answers[area.id] || [];
        const answered = areaAnswers.filter(a => a !== undefined).length;
        const isComplete = answered >= areaQuestions.length && areaQuestions.length > 0;

        return (
          <div
            key={area.id}
            className={`area-card ${isComplete ? 'completed' : ''}`}
            onClick={() => onSelect(area.id)}
          >
            <div className="area-icon">{area.icon}</div>
            <div className="area-name">{area.name}</div>
            <div className="area-status">
              {isComplete ? '✅ Completado' : `${answered}/${areaQuestions.length} respondidas`}
            </div>
          </div>
        );
      })}
    </div>
  );
}
