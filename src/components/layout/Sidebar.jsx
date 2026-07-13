import { useAuth } from '../../context/AuthContext';
import { getRoleLabel } from '../../utils/helpers';

const NAV_ITEMS = {
  postulante: [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' },
    { section: 'Evaluación' },
    { id: 'test', label: 'Test de Aptitudes', icon: '📝' },
    { id: 'grade', label: 'Ingresar Promedio', icon: '📊' },
    { section: 'Resultados' },
    { id: 'report', label: 'Informe de Afinidad', icon: '🎯' },
    { id: 'senecyt', label: 'Puntajes Senecyt', icon: '📈' }
  ],
  counselor: [
    { id: 'counselor-dashboard', label: 'Inicio', icon: '🏠' },
    { id: 'counselor-results', label: 'Resultados Estudiantes', icon: '👥' }
  ],
  admin: [
    { id: 'admin-dashboard', label: 'Inicio', icon: '🏠' },
    { section: 'Gestión' },
    { id: 'admin-questions', label: 'Preguntas del Test', icon: '❓' },
    { id: 'admin-careers', label: 'Carreras y Universidades', icon: '🎓' },
    { section: 'Usuarios' },
    { id: 'admin-users', label: 'Usuarios', icon: '👤' }
  ]
};

export default function Sidebar({ currentPage, onNavigate, onLogout, isOpen }) {
  const { currentUser } = useAuth();
  const items = NAV_ITEMS[currentUser?.role] || [];

  return (
    <nav className={`sidebar${isOpen ? ' open' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <h2>OrientaU</h2>
      </div>
      <ul className="nav-menu">
        {items.map((item, i) =>
          item.section ? (
            <li key={`s-${i}`}>
              <span className="nav-section-title">{item.section}</span>
            </li>
          ) : (
            <li key={item.id}>
              <a
                href="#"
                className={currentPage === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
              >
                <span>{item.icon}</span> {item.label}
              </a>
            </li>
          )
        )}
      </ul>
      <div className="sidebar-footer">
        <div className="user-info">
          <span className="user-name">{currentUser?.name}</span>
          <span className="user-role">{getRoleLabel(currentUser?.role)}</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
