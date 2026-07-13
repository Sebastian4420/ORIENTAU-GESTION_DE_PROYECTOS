import { useState } from 'react';
import Modal from '../ui/Modal';

const AREAS = [
  { id: 'verbal', name: 'Verbal' },
  { id: 'numerica', name: 'Numérica' },
  { id: 'logica', name: 'Lógica' },
  { id: 'memoria', name: 'Memoria' },
  { id: 'atencion', name: 'Atención' }
];

export default function QuestionModal({ question, onClose, onSave }) {
  const [area, setArea] = useState(question?.area || '');
  const [text, setText] = useState(question?.text || '');
  const [options, setOptions] = useState(question?.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer ?? 0);
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!area || !text.trim() || options.some(o => !o.trim())) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    onSave({
      ...(question || {}),
      area,
      text: text.trim(),
      options: options.map(o => o.trim()),
      correctAnswer,
      active: question?.active ?? true
    });
  };

  return (
    <Modal title={question ? 'Editar Pregunta' : 'Nueva Pregunta'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Área de evaluación</label>
          <select value={area} onChange={e => setArea(e.target.value)} required>
            <option value="">Seleccionar área...</option>
            {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Texto de la pregunta</label>
          <textarea rows="2" required placeholder="Escribe la pregunta..." value={text} onChange={e => setText(e.target.value)} />
        </div>
        {options.map((opt, i) => (
          <div key={i} className="form-group">
            <label>Opción {i + 1}</label>
            <input type="text" required value={opt} onChange={e => handleOptionChange(i, e.target.value)} placeholder={`Opción ${i + 1}`} />
          </div>
        ))}
        <div className="form-group">
          <label>Respuesta correcta</label>
          <select value={correctAnswer} onChange={e => setCorrectAnswer(parseInt(e.target.value))} required>
            {[0,1,2,3].map(i => (
              <option key={i} value={i}>Opción {i + 1}</option>
            ))}
          </select>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">{question ? 'Guardar Cambios' : 'Crear Pregunta'}</button>
        </div>
      </form>
    </Modal>
  );
}
