import { useState, useMemo } from 'react';
import DB from '../../utils/database';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function SenecytPage() {
  const [careerFilter, setCareerFilter] = useState('');
  const [uniFilter, setUniFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');

  const uniqueCareers = useMemo(() => [...new Set(DB.senecytScores.map(s => s.career))].sort(), []);
  const uniqueUnis = useMemo(() => [...new Set(DB.senecytScores.map(s => s.university))].sort(), []);
  const periods = useMemo(() => [...new Set(DB.senecytScores.map(s => s.period))].sort(), []);

  const filtered = useMemo(() => {
    return DB.senecytScores.filter(s => {
      if (careerFilter && s.career !== careerFilter) return false;
      if (uniFilter && s.university !== uniFilter) return false;
      if (periodFilter && s.period !== periodFilter) return false;
      return true;
    }).slice(0, 50);
  }, [careerFilter, uniFilter, periodFilter]);

  return (
    <>
      <PageHeader title="Puntajes Referenciales Senecyt" subtitle="Consulta los puntajes de ciclos anteriores por carrera e institución" />
      <Card>
        <div className="filters-bar">
          <div className="form-group">
            <label>Carrera</label>
            <select value={careerFilter} onChange={e => setCareerFilter(e.target.value)}>
              <option value="">Todas las carreras</option>
              {uniqueCareers.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Institución</label>
            <select value={uniFilter} onChange={e => setUniFilter(e.target.value)}>
              <option value="">Todas las instituciones</option>
              {uniqueUnis.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Período</label>
            <select value={periodFilter} onChange={e => setPeriodFilter(e.target.value)}>
              <option value="">Todos los períodos</option>
              {periods.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No se encontraron datos</h3>
            <p>No hay resultados para la búsqueda realizada.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Carrera</th>
                  <th>Institución</th>
                  <th>Tipo</th>
                  <th>Período</th>
                  <th>Mínimo</th>
                  <th>Promedio</th>
                  <th>Máximo</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={i}>
                    <td>{s.career}</td>
                    <td>{s.university}</td>
                    <td>
                      <Badge variant={s.universityType === 'public' ? 'primary' : 'warning'}>
                        {s.universityType === 'public' ? 'Pública' : 'Privada'}
                      </Badge>
                    </td>
                    <td>{s.period}</td>
                    <td>{s.minScore}</td>
                    <td><strong>{s.avgScore}</strong></td>
                    <td>{s.maxScore}</td>
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
