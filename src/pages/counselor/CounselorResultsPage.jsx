import { useState } from 'react';
import DB, { saveDB } from '../../utils/database';
import { calculateCareerAffinity, logAccess } from '../../utils/helpers';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ScoreGrid from '../../components/report/ScoreGrid';
import RecommendationList from '../../components/report/RecommendationList';

export default function CounselorResultsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    setHasSearched(true);
    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = DB.testResults.filter(r => {
      const user = DB.users.find(u => u.id === r.userId);
      if (!user) return false;
      return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    });

    setSearchResults(results);
    setSelectedReport(null);
  };

  const handleViewReport = (result) => {
    const user = DB.users.find(u => u.id === result.userId);
    logAccess(DB, { id: 0, name: 'Orientador' }, `Orientador consultó resultados de ${user.name}`);

    const recommendations = DB.careers.map(career => ({
      ...career,
      affinity: calculateCareerAffinity(result.scores, career.affinityAreas)
    })).sort((a, b) => b.affinity - a.affinity).slice(0, 5);

    setSelectedReport({ result, user, recommendations });
  };

  return (
    <>
      <PageHeader title="Resultados de Estudiantes" subtitle="Busca por nombre o correo para ver los resultados de un estudiante" />
      <Card>
        <div className="form-group">
          <label>Buscar estudiante (nombre o correo)</label>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="text" placeholder="Escribe el nombre o correo..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
        </div>
        {hasSearched && searchResults.length === 0 && (
          <p style={{ color: 'var(--gray-500)', marginTop: 12 }}>
            No se encontraron resultados para esa búsqueda.
          </p>
        )}
        {searchResults.length > 0 && (
          <div className="table-container" style={{ marginTop: 16 }}>
            <table>
              <thead>
                <tr><th>Estudiante</th><th>Correo</th><th>Puntaje</th><th>Fecha</th><th>Acción</th></tr>
              </thead>
              <tbody>
                {searchResults.map(r => {
                  const user = DB.users.find(u => u.id === r.userId);
                  return (
                    <tr key={r.id}>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td><strong>{r.totalScore}%</strong></td>
                      <td>{new Date(r.date).toLocaleDateString()}</td>
                      <td>
                        <Button size="sm" onClick={() => handleViewReport(r)}>Ver informe</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selectedReport && (
        <Card style={{ marginTop: 24 }}>
          <CardHeader>
            <h2>Informe de {selectedReport.user.name}</h2>
            <Badge>{selectedReport.user.email}</Badge>
          </CardHeader>
          <ScoreGrid scores={selectedReport.result.scores} />
          <h3 style={{ margin: '16px 0 12px' }}>Top 5 Carreras Recomendadas</h3>
          <RecommendationList recommendations={selectedReport.recommendations} maxShow={5} />
        </Card>
      )}
    </>
  );
}
