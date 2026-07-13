import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ResetPasswordForm({ token, onSwitchToLogin }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    const result = resetPassword(token, newPassword);
    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess('Contraseña actualizada. Redirigiendo al login...');
      setTimeout(() => onSwitchToLogin(), 2000);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <h1>Nueva Contraseña</h1>
        <p>Establece tu nueva contraseña</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nueva contraseña</label>
          <input type="password" required placeholder="Mínimo 8 caracteres" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirmar contraseña</label>
          <input type="password" required placeholder="Repite tu contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" className="btn btn-primary btn-block">Cambiar contraseña</button>
      </form>
    </div>
  );
}
