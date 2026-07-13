import { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import DB, { saveDB } from '../../utils/database';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import UniversityModal from '../../components/admin/UniversityModal';
import CareerModal from '../../components/admin/CareerModal';

export default function AdminCareersPage() {
  const { notify } = useNotification();
  const [showUniModal, setShowUniModal] = useState(false);
  const [editUni, setEditUni] = useState(null);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [editCareer, setEditCareer] = useState(null);
  const [, forceUpdate] = useState(0);

  const refresh = () => forceUpdate(n => n + 1);

  // University handlers
  const handleSaveUni = (data) => {
    if (data.id) {
      const existing = DB.universities.find(u => u.id === data.id);
      Object.assign(existing, data);
    } else {
      DB.universities.push({ ...data, id: DB.universities.length + 1 });
    }
    saveDB();
    setShowUniModal(false);
    setEditUni(null);
    refresh();
    notify(data.id ? 'Universidad actualizada.' : 'Universidad creada.', 'success');
  };

  const handleDeleteUni = (id) => {
    if (window.confirm('¿Eliminar esta universidad y todas sus carreras asociadas?')) {
      DB.universities = DB.universities.filter(u => u.id !== id);
      DB.careers = DB.careers.filter(c => c.universityId !== id);
      saveDB();
      refresh();
      notify('Universidad eliminada.', 'info');
    }
  };

  // Career handlers
  const handleSaveCareer = (data) => {
    if (data.id) {
      const existing = DB.careers.find(c => c.id === data.id);
      Object.assign(existing, data);
    } else {
      DB.careers.push({ ...data, id: DB.careers.length + 1 });
    }
    saveDB();
    setShowCareerModal(false);
    setEditCareer(null);
    refresh();
    notify(data.id ? 'Carrera actualizada.' : 'Carrera creada.', 'success');
  };

  const handleDeleteCareer = (id) => {
    if (window.confirm('¿Eliminar esta carrera?')) {
      DB.careers = DB.careers.filter(c => c.id !== id);
      saveDB();
      refresh();
      notify('Carrera eliminada.', 'info');
    }
  };

  return (
    <>
      <PageHeader title="Gestión de Carreras y Universidades" subtitle="Administra la oferta académica del sistema" />
      <div className="grid-2col">
        {/* Universities */}
        <Card>
          <CardHeader>
            <h2>Universidades</h2>
            <Button size="sm" onClick={() => { setEditUni(null); setShowUniModal(true); }}>+ Nueva</Button>
          </CardHeader>
          <div className="table-container">
            <table>
              <thead><tr><th>Nombre</th><th>Tipo</th><th>Acciones</th></tr></thead>
              <tbody>
                {DB.universities.map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>
                      <Badge variant={u.type === 'public' ? 'primary' : 'warning'}>
                        {u.type === 'public' ? 'Pública' : 'Privada'}
                      </Badge>
                    </td>
                    <td className="action-btns">
                      <Button size="sm" variant="outline" onClick={() => { setEditUni(u); setShowUniModal(true); }}>✏️</Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteUni(u.id)}>🗑️</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Careers */}
        <Card>
          <CardHeader>
            <h2>Carreras</h2>
            <Button size="sm" onClick={() => { setEditCareer(null); setShowCareerModal(true); }}>+ Nueva</Button>
          </CardHeader>
          <div className="table-container">
            <table>
              <thead><tr><th>Carrera</th><th>Universidad</th><th>Acciones</th></tr></thead>
              <tbody>
                {DB.careers.slice(0, 30).map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.universityName}</td>
                    <td className="action-btns">
                      <Button size="sm" variant="outline" onClick={() => { setEditCareer(c); setShowCareerModal(true); }}>✏️</Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteCareer(c.id)}>🗑️</Button>
                    </td>
                  </tr>
                ))}
                {DB.careers.length > 30 && (
                  <tr><td colSpan="3" style={{ textAlign: 'center', color: 'var(--gray-400)' }}>Mostrando 30 de {DB.careers.length}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {showUniModal && <UniversityModal university={editUni} onClose={() => { setShowUniModal(false); setEditUni(null); }} onSave={handleSaveUni} />}
      {showCareerModal && <CareerModal career={editCareer} onClose={() => { setShowCareerModal(false); setEditCareer(null); }} onSave={handleSaveCareer} />}
    </>
  );
}
