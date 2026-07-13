import { useAuth } from '../../context/AuthContext';
import DB from '../../utils/database';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader } from '../../components/ui/Card';
import StatsGrid from '../../components/ui/StatsGrid';
import EmptyState from '../../components/ui/EmptyState';
import ScoreGrid from '../../components/report/ScoreGrid';
import Button from '../../components/ui/Button';

export default function DashboardPage({ onNavigate }) {
  const { currentUser } = useAuth();
  const results = DB.testResults.filter(r => r.userId === currentUser.id);
  const latest = results.length > 0 ? results[results.length - 1] : null;

  const stats = [
    { label: 'Tests realizados', value: results.length },
    { label: 'Último puntaje', value: latest ? latest.totalScore + '%' : '—' },
    { label: 'Promedio de grado', value: latest?.gradeAverage || '—' }
  ];

  return (
    <>
      <PageHeader title="Mi Panel" subtitle={`Bienvenido, ${currentUser.name}`} />
      <StatsGrid stats={stats} />
      {latest ? (
        <Card>
          <CardHeader><h2>Mi Último Resultado</h2></CardHeader>
          <ScoreGrid scores={latest.scores} />
        </Card>
      ) : (
        <Card>
          <EmptyState
            icon="📋"
            title="Aún no has realizado el test"
            message="Comienza tu test de aptitudes para ver tus resultados aquí."
            action={<Button onClick={() => onNavigate('test')}>Comenzar Test</Button>}
          />
        </Card>
      )}
    </>
  );
}
