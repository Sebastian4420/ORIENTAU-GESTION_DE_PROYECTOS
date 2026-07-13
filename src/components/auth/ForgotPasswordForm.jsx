import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { recoverPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = recoverPassword(email);
    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess('Enlace de recuperación enviado (simulado). Redirigiendo...');
      setTimeout(() => onSwitchToLogin(result.token), 1500);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <h1>Recuperar Contraseña</h1>
        <p>Ingresa tu correo para recibir un enlace de recuperación</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input type="email" required placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" className="btn btn-primary btn-block">Enviar enlace</button>
        <div className="auth-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Volver al inicio de sesión</a>
        </div>
      </form>
    </div>
  );
}
