import { useState } from 'react';
import Modal from '../ui/Modal';

export default function UniversityModal({ university, onClose, onSave }) {
  const [name, setName] = useState(university?.name || '');
  const [type, setType] = useState(university?.type || 'public');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    onSave({
      ...(university || {}),
      name: name.trim(),
      type
    });
  };

  return (
    <Modal title={university ? 'Editar Universidad' : 'Nueva Universidad'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Nombre de la universidad" />
        </div>
        <div className="form-group">
          <label>Tipo</label>
          <select value={type} onChange={e => setType(e.target.value)} required>
            <option value="public">Pública</option>
            <option value="private">Privada</option>
          </select>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">{university ? 'Guardar' : 'Crear'}</button>
        </div>
      </form>
    </Modal>
  );
}
