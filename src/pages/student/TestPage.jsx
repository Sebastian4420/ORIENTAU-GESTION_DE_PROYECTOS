import { useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import DB, { saveDB } from '../../utils/database';
import { calculateAreaScore } from '../../utils/helpers';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import InfoBox from '../../components/ui/InfoBox';
import ProgressBar from '../../components/ui/ProgressBar';
import AreaSelector, { AREAS } from '../../components/test/AreaSelector';
import QuestionCard from '../../components/test/QuestionCard';
import EmptyState from '../../components/ui/EmptyState';

export default function TestPage({ onNavigate }) {
  const { currentUser } = useAuth();
  const { notify } = useNotification();
  const [currentArea, setCurrentArea] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = DB.questions.filter(q => q.active);
  const existingResult = DB.testResults.find(r => r.userId === currentUser.id && r.finalized);

  const handleSelectArea = useCallback((areaId) => {
    setCurrentArea(areaId);
    const areaAnswers = answers[areaId] || [];
    const areaQuestions = questions.filter(q => q.area === areaId);
    const firstUnanswered = areaAnswers.findIndex((a, i) => a === undefined && i < areaQuestions.length);
    setCurrentQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
  }, [answers, questions]);

  const handleSaveAnswer = useCallback((questionIndex, answerIndex) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      if (!newAnswers[currentArea]) newAnswers[currentArea] = [];
      newAnswers[currentArea] = [...newAnswers[currentArea]];
      newAnswers[currentArea][questionIndex] = answerIndex;
      return newAnswers;
    });
  }, [currentArea]);

  const handleNext = useCallback(() => {
    setCurrentQuestionIndex(prev => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleCompleteArea = useCallback(() => {
    notify(`¡Área ${AREAS.find(a => a.id === currentArea)?.name} completada!`, 'success');
    setCurrentArea(null);
    setCurrentQuestionIndex(0);
  }, [currentArea, notify]);

  const handleFinalize = useCallback(() => {
    const scores = {};
    AREAS.forEach(area => {
      scores[area.id] = calculateAreaScore(area.id, answers[area.id] || [], questions);
    });
    const totalScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5);

    DB.testResults.push({
      id: DB.testResults.length + 1,
      userId: currentUser.id,
      userName: currentUser.name,
      scores,
      totalScore,
      answers: JSON.parse(JSON.stringify(answers)),
      finalized: true,
      gradeAverage: null,
      date: new Date().toISOString()
    });
    saveDB();
    notify('¡Test finalizado! Revisa tu informe de afinidad.', 'success');
    onNavigate('report');
  }, [answers, currentUser, notify, onNavigate, questions]);

  if (existingResult) {
    return (
      <>
        <PageHeader title="Test de Aptitudes" />
        <div className="warning-box">
          Ya has finalizado el test. No es posible volver a realizarlo sin autorización del administrador.
        </div>
        <Card>
          <EmptyState
            icon="🔒"
            title="Test finalizado"
            message="Consulta tu informe de afinidad académica para ver tus resultados."
            action={<Button onClick={() => onNavigate('report')}>Ver Informe</Button>}
          />
        </Card>
      </>
    );
  }

  if (!currentArea) {
    const completedCount = AREAS.filter(area => {
      const areaQs = questions.filter(q => q.area === area.id);
      const areaAs = answers[area.id] || [];
      return areaAs.filter(a => a !== undefined).length >= areaQs.length && areaQs.length > 0;
    }).length;

    return (
      <>
        <PageHeader title="Test de Aptitudes" subtitle="Selecciona un área para comenzar. Puedes completarlas en el orden que prefieras." />
        <InfoBox>El test consta de 5 áreas con 10 preguntas cada una. Tus respuestas se guardan automáticamente por sección.</InfoBox>
        <AreaSelector answers={answers} questions={questions} onSelect={handleSelectArea} />
        {completedCount === 5 && (
          <Card className="text-center" style={{ textAlign: 'center', marginTop: 24 }}>
            <h2 style={{ marginBottom: 12 }}>¡Todas las áreas completadas!</h2>
            <p style={{ marginBottom: 20, color: 'var(--gray-500)' }}>Puedes finalizar el test para obtener tu puntaje.</p>
            <Button variant="success" onClick={handleFinalize}>Finalizar Test</Button>
          </Card>
        )}
        <br />
        <Button variant="outline" onClick={() => onNavigate('dashboard')}>Volver al Panel</Button>
      </>
    );
  }

  const areaInfo = AREAS.find(a => a.id === currentArea);
  const areaQuestions = questions.filter(q => q.area === currentArea);
  const areaAnswers = answers[currentArea] || [];
  const progress = (currentQuestionIndex / areaQuestions.length) * 100;

  if (currentQuestionIndex >= areaQuestions.length) {
    setCurrentArea(null);
    return null;
  }

  const question = areaQuestions[currentQuestionIndex];

  return (
    <>
      <PageHeader title={`${areaInfo.icon} Área ${areaInfo.name}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
          <Button variant="outline" size="sm" onClick={() => { setCurrentArea(null); setCurrentQuestionIndex(0); }}>
            ← Volver a áreas
          </Button>
        </div>
      </PageHeader>
      <ProgressBar value={progress} />
      <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginBottom: 16 }}>
        Pregunta {currentQuestionIndex + 1} de {areaQuestions.length}
      </p>
      <QuestionCard
        question={question}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={areaQuestions.length}
        areaName={areaInfo.name}
        selectedAnswer={areaAnswers[currentQuestionIndex]}
        onSelect={(idx) => handleSaveAnswer(currentQuestionIndex, idx)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, flexWrap: 'wrap', gap: 8 }}>
        <div>
          {currentQuestionIndex > 0 && (
            <Button variant="outline" onClick={handlePrev}>← Anterior</Button>
          )}
        </div>
        <div>
          {currentQuestionIndex < areaQuestions.length - 1 ? (
            <Button onClick={handleNext}>Siguiente →</Button>
          ) : (
            <Button variant="success" onClick={handleCompleteArea}>Finalizar área ✓</Button>
          )}
        </div>
      </div>
    </>
  );
}
