import DB, { saveDB } from '../../utils/database';
import PageHeader from '../../components/ui/PageHeader';
import StatsGrid from '../../components/ui/StatsGrid';
import Card, { CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function CounselorDashboardPage({ onNavigate }) {
  const allResults = DB.testResults.filter(r => r.finalized);

  const stats = [
    { label: 'Estudiantes con test', value: allResults.length },
    {
      label: 'Promedio general',
      value: allResults.length > 0
        ? Math.round(allResults.reduce((a, r) => a + r.totalScore, 0) / allResults.length) + '%'
        : '—'
    }
  ];

  const recentResults = allResults.slice(-10).reverse();

  return (
    <>
      <PageHeader title="Panel del Orientador" subtitle="Consulta y orienta a tus estudiantes" />
      <StatsGrid stats={stats} />
      <Card>
        <CardHeader><h2>Últimos Resultados</h2></CardHeader>
        {recentResults.length === 0 ? (
          <div className="empty-state">
            <p>No hay resultados disponibles aún.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Estudiante</th><th>Fecha</th><th>Puntaje</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {recentResults.map(r => (
                  <tr key={r.id}>
                    <td>{r.userName}</td>
                    <td>{new Date(r.date).toLocaleDateString()}</td>
                    <td><strong>{r.totalScore}%</strong></td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => onNavigate('counselor-results')}>
                        Ver informe
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
