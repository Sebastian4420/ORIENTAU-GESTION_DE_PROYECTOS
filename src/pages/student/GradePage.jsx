import { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import DB, { saveDB } from '../../utils/database';
import { calculateReferenceScore } from '../../utils/helpers';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import InfoBox from '../../components/ui/InfoBox';

export default function GradePage() {
  const { notify } = useNotification();
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

  const userId = parseInt(sessionStorage.getItem('orientau_user_id'));
  const userResult = DB.testResults.find(r => r.userId === userId && r.finalized);

  const handleSave = () => {
    setError('');
    const value = parseFloat(grade);
    if (isNaN(value) || value < 0 || value > 10) {
      setError('El promedio debe estar entre 0 y 10.');
      return;
    }
    if (!userResult) {
      setError('Primero debes completar el test de aptitudes.');
      return;
    }
    userResult.gradeAverage = value;
    saveDB();
    notify('Promedio guardado correctamente.', 'success');
  };

  return (
    <>
      <PageHeader title="Ingresar Promedio de Grado" subtitle="Ingresa tu promedio final para calcular tu puntaje referencial de postulación." />
      <InfoBox type="warning">
        ⚠️ Este cálculo es referencial y no reemplaza el puntaje oficial obtenido en un examen de admisión institucional.
      </InfoBox>
      <Card>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <div className="form-group">
            <label htmlFor="grade-input">Promedio final de grado (0 - 10)</label>
            <input
              type="number" id="grade-input" min="0" max="10" step="0.01"
              placeholder="Ej: 8.50" value={grade}
              onChange={e => setGrade(e.target.value)}
            />
          </div>
          {error && <div className="form-error">{error}</div>}
          <Button block onClick={handleSave}>Calcular Puntaje Referencial</Button>
        </div>
      </Card>
      {userResult?.gradeAverage && (
        <Card>
          <CardHeader><h2>Puntaje Referencial</h2></CardHeader>
          <div className="grade-display">
            <div className="grade-value">{calculateReferenceScore(userResult.totalScore, userResult.gradeAverage)}</div>
            <div className="grade-label">Puntaje referencial de postulación</div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: 13, marginTop: 8 }}>
            Promedio: {userResult.gradeAverage} | Test: {userResult.totalScore}%
          </p>
        </Card>
      )}
    </>
  );
}
