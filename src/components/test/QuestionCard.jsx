export default function QuestionCard({ question, questionNumber, totalQuestions, areaName, selectedAnswer, onSelect }) {
  return (
    <div className="question-card">
      <div className="question-number">{areaName} — Pregunta {questionNumber}</div>
      <div className="question-text">{question.text}</div>
      <div className="options-list">
        {question.options.map((opt, i) => (
          <label key={i} className={`option-item ${selectedAnswer === i ? 'selected' : ''}`}>
            <input
              type="radio"
              name={`q_${question.id}`}
              value={i}
              checked={selectedAnswer === i}
              onChange={() => onSelect(i)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
