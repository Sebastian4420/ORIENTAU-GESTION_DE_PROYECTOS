import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import DB, { saveDB } from '../utils/database';
import { hashPassword, validateEmail, validatePassword } from '../utils/helpers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    const token = sessionStorage.getItem('orientau_token');
    const userId = sessionStorage.getItem('orientau_user_id');
    if (token && userId) {
      const user = DB.users.find(u => u.id === parseInt(userId));
      if (user) setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const createSession = useCallback((user) => {
    const token = 'tok_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('orientau_token', token);
    sessionStorage.setItem('orientau_user_id', user.id.toString());
    setCurrentUser(user);
  }, []);

  const login = useCallback((email, password) => {
    const user = DB.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) return { success: false, error: 'Correo no registrado.' };

    if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
      const mins = Math.ceil((new Date(user.lockoutUntil) - new Date()) / 60000);
      return { success: false, error: `Cuenta bloqueada. Intenta de nuevo en ${mins} minuto(s).` };
    }

    if (user.password !== hashPassword(password)) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      if (user.loginAttempts >= 3) {
        user.lockoutUntil = new Date(Date.now() + 10 * 60000).toISOString();
        user.loginAttempts = 0;
        saveDB();
        return { success: false, error: 'Demasiados intentos. Bloqueado por 10 minutos.' };
      }
      saveDB();
      return { success: false, error: `Credenciales incorrectas. Intento ${user.loginAttempts}/3.` };
    }

    user.loginAttempts = 0;
    user.lockoutUntil = null;
    saveDB();
    createSession(user);
    return { success: true };
  }, [createSession]);

  const register = useCallback((name, email, password) => {
    if (!validateEmail(email)) return { success: false, error: 'El correo no tiene un formato válido.' };
    if (DB.users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { success: false, error: 'Este correo ya está registrado.' };
    if (!validatePassword(password))
      return { success: false, error: 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.' };

    const newUser = {
      id: DB.users.length + 1,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashPassword(password),
      role: 'postulante',
      createdAt: new Date().toISOString()
    };
    DB.users.push(newUser);
    saveDB();
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('orientau_token');
    sessionStorage.removeItem('orientau_user_id');
    setCurrentUser(null);
  }, []);

  const recoverPassword = useCallback((email) => {
    const user = DB.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) return { success: false, error: 'No se encontró una cuenta con ese correo.' };

    const token = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    DB.recoveryTokens.push({
      token, userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 60000).toISOString()
    });
    saveDB();
    return { success: true, token };
  }, []);

  const resetPassword = useCallback((token, newPassword) => {
    if (!validatePassword(newPassword))
      return { success: false, error: 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.' };

    const tokenData = DB.recoveryTokens.find(t => t.token === token && new Date(t.expiresAt) > new Date());
    if (!tokenData) return { success: false, error: 'El enlace ha expirado o no es válido.' };

    const user = DB.users.find(u => u.id === tokenData.userId);
    user.password = hashPassword(newPassword);
    DB.recoveryTokens = DB.recoveryTokens.filter(t => t.token !== token);
    saveDB();
    return { success: true };
  }, []);

  const value = { currentUser, loading, login, register, logout, recoverPassword, resetPassword };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
