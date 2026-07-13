import { useAuth } from '../../context/AuthContext';
import DB from '../../utils/database';
import PageHeader from '../../components/ui/PageHeader';
import StatsGrid from '../../components/ui/StatsGrid';
import Card, { CardHeader } from '../../components/ui/Card';

export default function AdminDashboardPage() {
  const { currentUser } = useAuth();
  const totalUsers = DB.users.length;
  const totalQuestions = DB.questions.length;
  const activeQuestions = DB.questions.filter(q => q.active).length;
  const totalCareers = new Set(DB.careers.map(c => c.name)).size;
  const totalUnis = DB.universities.length;
  const totalResults = DB.testResults.length;

  const stats = [
    { label: 'Usuarios registrados', value: totalUsers },
    { label: 'Preguntas activas', value: `${activeQuestions}/${totalQuestions}` },
    { label: 'Carreras', value: totalCareers },
    { label: 'Universidades', value: totalUnis },
    { label: 'Tests realizados', value: totalResults }
  ];

  const recentLogs = DB.accessLogs.slice(-10).reverse();

  return (
    <>
      <PageHeader title="Panel de Administración" subtitle="Vista general del sistema" />
      <StatsGrid stats={stats} />
      <Card>
        <CardHeader><h2>Accesos Recientes</h2></CardHeader>
        {recentLogs.length === 0 ? (
          <p style={{ color: 'var(--gray-500)' }}>No hay registros de acceso.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Usuario</th><th>Acción</th><th>Fecha/Hora</th></tr>
              </thead>
              <tbody>
                {recentLogs.map((log, i) => (
                  <tr key={i}>
                    <td>{log.userName}</td>
                    <td>{log.message}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
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
