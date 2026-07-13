import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    const result = register(name, email, password);
    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setTimeout(() => onSwitchToLogin(), 2000);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <h1>Crear Cuenta</h1>
        <p>Regístrate para comenzar tu evaluación</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre completo</label>
          <input type="text" required placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input type="email" required placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" required placeholder="Mínimo 8 caracteres, letras y números" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirmar contraseña</label>
          <input type="password" required placeholder="Repite tu contraseña" value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
        <div className="auth-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </form>
    </div>
  );
}
