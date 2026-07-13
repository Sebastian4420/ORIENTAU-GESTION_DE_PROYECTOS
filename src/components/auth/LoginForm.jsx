import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export default function LoginForm({ onSwitchToRegister, onSwitchToRecover }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { notify } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
    } else {
      notify('Bienvenido!', 'success');
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <h1>OrientaU</h1>
        <p>Sistema de Orientación Vocacional</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Correo electrónico</label>
          <input type="email" id="login-email" required placeholder="tu@correo.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Contraseña</label>
          <input type="password" id="login-password" required placeholder="Tu contraseña"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
        <div className="auth-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRecover(); }}>¿Olvidaste tu contraseña?</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Crear cuenta</a>
        </div>
      </form>
    </div>
  );
}
