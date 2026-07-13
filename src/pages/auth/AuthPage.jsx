import { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

export default function AuthPage() {
  const [view, setView] = useState('login');
  const [resetToken, setResetToken] = useState('');

  return (
    <div id="auth-container">
      {view === 'login' && (
        <div className="auth-view">
          <LoginForm
            onSwitchToRegister={() => setView('register')}
            onSwitchToRecover={() => setView('recover')}
          />
        </div>
      )}
      {view === 'register' && (
        <div className="auth-view">
          <RegisterForm onSwitchToLogin={() => setView('login')} />
        </div>
      )}
      {view === 'recover' && (
        <div className="auth-view">
          <ForgotPasswordForm onSwitchToLogin={(token) => {
            if (token) { setResetToken(token); setView('reset'); }
            else setView('login');
          }} />
        </div>
      )}
      {view === 'reset' && (
        <div className="auth-view">
          <ResetPasswordForm token={resetToken} onSwitchToLogin={() => setView('login')} />
        </div>
      )}
    </div>
  );
}
