import { useState } from 'react';
import Modal from '../ui/Modal';
import DB from '../../utils/database';

export default function CareerModal({ career, onClose, onSave }) {
  const [name, setName] = useState(career?.name || '');
  const [universityId, setUniversityId] = useState(career?.universityId || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !universityId) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    const uid = parseInt(universityId);
    const exists = DB.careers.some(
      c => c.name.toLowerCase() === name.trim().toLowerCase() && c.universityId === uid && (!career || c.id !== career.id)
    );
    if (exists) {
      setError('Esta carrera ya existe en la universidad seleccionada.');
      return;
    }
    const uni = DB.universities.find(u => u.id === uid);
    onSave({
      ...(career || {}),
      name: name.trim(),
      universityId: uid,
      universityName: uni?.name || '',
      universityType: uni?.type || 'public',
      affinityAreas: career?.affinityAreas || { verbal: 0.5, numerica: 0.5, logica: 0.5, memoria: 0.5, atencion: 0.5 }
    });
  };

  return (
    <Modal title={career ? 'Editar Carrera' : 'Nueva Carrera'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la carrera</label>
          <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Ingeniería en Sistemas" />
        </div>
        <div className="form-group">
          <label>Universidad</label>
          <select value={universityId} onChange={e => setUniversityId(e.target.value)} required>
            <option value="">Seleccionar universidad...</option>
            {DB.universities.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">{career ? 'Guardar' : 'Crear'}</button>
        </div>
      </form>
    </Modal>
  );
}
