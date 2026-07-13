import { useState, useCallback } from 'react';
import { useNotification } from '../../context/NotificationContext';
import DB, { saveDB } from '../../utils/database';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import QuestionModal from '../../components/admin/QuestionModal';

const AREA_NAMES = { verbal: 'Verbal', numerica: 'Numérica', logica: 'Lógica', memoria: 'Memoria', atencion: 'Atención' };

export default function AdminQuestionsPage() {
  const { notify } = useNotification();
  const [filterArea, setFilterArea] = useState('');
  const [modalQuestion, setModalQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [, forceUpdate] = useState(0);

  const questions = DB.questions.filter(q => !filterArea || q.area === filterArea);

  const hasBeenAnswered = useCallback((qId) => {
    return DB.testResults.some(r => r.answers && Object.values(r.answers).some(areaAnswers => areaAnswers[qId] !== undefined));
  }, []);

  const handleSave = (questionData) => {
    if (questionData.id) {
      const existing = DB.questions.find(q => q.id === questionData.id);
      Object.assign(existing, questionData);
    } else {
      DB.questions.push({
        ...questionData,
        id: DB.questions.length + 1
      });
    }
    saveDB();
    setShowModal(false);
    setModalQuestion(null);
    forceUpdate(n => n + 1);
    notify(questionData.id ? 'Pregunta actualizada.' : 'Pregunta creada.', 'success');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta pregunta?')) {
      DB.questions = DB.questions.filter(q => q.id !== id);
      saveDB();
      forceUpdate(n => n + 1);
      notify('Pregunta eliminada.', 'info');
    }
  };

  const handleToggle = (id) => {
    const q = DB.questions.find(x => x.id === id);
    q.active = !q.active;
    saveDB();
    forceUpdate(n => n + 1);
    notify(`Pregunta ${q.active ? 'activada' : 'desactivada'}.`, 'info');
  };

  return (
    <>
      <PageHeader title="Gestión de Preguntas" subtitle="Administra el banco de evaluaciones del test de aptitudes" />
      <Card>
        <CardHeader>
          <h2>Preguntas del Test</h2>
          <Button onClick={() => { setModalQuestion(null); setShowModal(true); }}>+ Nueva Pregunta</Button>
        </CardHeader>
        <div className="filters-bar">
          <div className="form-group">
            <label>Filtrar por área</label>
            <select value={filterArea} onChange={e => setFilterArea(e.target.value)}>
              <option value="">Todas las áreas</option>
              {Object.entries(AREA_NAMES).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Área</th>
                <th>Pregunta</th>
                <th>Opciones</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(q => {
                const answered = hasBeenAnswered(q.id);
                return (
                  <tr key={q.id}>
                    <td>{q.id}</td>
                    <td><Badge>{AREA_NAMES[q.area]}</Badge></td>
                    <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.text}</td>
                    <td>{q.options.join(' | ')}</td>
                    <td>
                      <Badge variant={q.active ? 'success' : 'danger'}>
                        {q.active ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </td>
                    <td className="action-btns">
                      <Button size="sm" variant="outline" onClick={() => { setModalQuestion(q); setShowModal(true); }}>✏️</Button>
                      {answered ? (
                        <Button size="sm" variant="outline" onClick={() => handleToggle(q.id)}>
                          {q.active ? '🚫' : '✅'}
                        </Button>
                      ) : (
                        <Button size="sm" variant="danger" onClick={() => handleDelete(q.id)}>🗑️</Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {showModal && (
        <QuestionModal
          question={modalQuestion}
          onClose={() => { setShowModal(false); setModalQuestion(null); }}
          onSave={handleSave}
        />
      )}
    </>
  );
}
