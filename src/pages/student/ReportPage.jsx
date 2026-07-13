import { useAuth } from '../../context/AuthContext';
import DB from '../../utils/database';
import { calculateReferenceScore, calculateCareerAffinity } from '../../utils/helpers';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader } from '../../components/ui/Card';
import InfoBox from '../../components/ui/InfoBox';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import ScoreGrid from '../../components/report/ScoreGrid';
import RecommendationList from '../../components/report/RecommendationList';

export default function ReportPage({ onNavigate }) {
  const { currentUser } = useAuth();
  const latest = DB.testResults.find(r => r.userId === currentUser.id && r.finalized);

  if (!latest) {
    return (
      <>
        <PageHeader title="Informe de Afinidad Académica" />
        <Card>
          <EmptyState
            icon="📊"
            title="Sin resultados disponibles"
            message="Debes completar el test de aptitudes para generar tu informe."
            action={<Button onClick={() => onNavigate('test')}>Ir al Test</Button>}
          />
        </Card>
      </>
    );
  }

  const recommendations = DB.careers.map(career => ({
    ...career,
    affinity: calculateCareerAffinity(latest.scores, career.affinityAreas)
  })).sort((a, b) => b.affinity - a.affinity);

  const handleDownload = () => {
    let content = `INFORME DE AFINIDAD ACADÉMICA\n`;
    content += `Estudiante: ${currentUser.name}\n`;
    content += `Fecha: ${new Date(latest.date).toLocaleDateString()}\n\n`;
    content += `PUNTUACIONES POR ÁREA:\n`;
    content += `Verbal: ${latest.scores.verbal}/100\n`;
    content += `Numérica: ${latest.scores.numerica}/100\n`;
    content += `Lógica: ${latest.scores.logica}/100\n`;
    content += `Memoria: ${latest.scores.memoria}/100\n`;
    content += `Atención: ${latest.scores.atencion}/100\n`;
    content += `Total: ${latest.totalScore}%\n`;
    if (latest.gradeAverage) {
      content += `Promedio de grado: ${latest.gradeAverage}\n`;
      content += `Puntaje referencial: ${calculateReferenceScore(latest.totalScore, latest.gradeAverage)}\n`;
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `informe_afinidad_${currentUser.name.replace(/\s/g, '_')}.txt`;
    a.click();
  };

  return (
    <>
      <PageHeader title="Informe de Afinidad Académica" subtitle="Carreras y universidades recomendadas según tus resultados" />
      <InfoBox>📋 Este informe es referencial y tiene como objetivo orientar tu decisión académica.</InfoBox>
      <Card>
        <CardHeader><h2>Tus Puntuaciones por Área</h2></CardHeader>
        <ScoreGrid scores={latest.scores} />
      </Card>
      <Card>
        <CardHeader>
          <h2>Carreras Recomendadas</h2>
          {latest.gradeAverage && (
            <Badge>Puntaje referencial: {calculateReferenceScore(latest.totalScore, latest.gradeAverage)}</Badge>
          )}
        </CardHeader>
        <RecommendationList recommendations={recommendations} />
      </Card>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => window.print()}>🖨️ Imprimir Informe</Button>
        <Button variant="outline" onClick={handleDownload}>📥 Descargar</Button>
      </div>
    </>
  );
}
