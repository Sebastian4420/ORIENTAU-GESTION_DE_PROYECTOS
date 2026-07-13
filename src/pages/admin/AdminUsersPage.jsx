import DB from '../../utils/database';
import { getRoleLabel } from '../../utils/helpers';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader title="Gestión de Usuarios" subtitle="Administra los usuarios del sistema" />
      <Card>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Registro</th>
              </tr>
            </thead>
            <tbody>
              {DB.users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'counselor' ? 'warning' : 'primary'}>
                      {getRoleLabel(u.role)}
                    </Badge>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
