export const ROUTE_DEFINITIONS: Record<
  string,
  { path: string; label: string; parent?: string; permission?: string }
> = {
  '/login': { path: '/login', label: 'Login' },
  '/students': { path: '/students', label: 'Estudantes', parent: '/', permission: 'isAdmin' },
  '/students/new': {
    path: '/students/new',
    label: 'Novo Estudante',
    parent: '/students',
    permission: 'isAdmin',
  },
  '/students/import': {
    path: '/students/import',
    label: 'Importar Estudantes',
    parent: '/students',
    permission: 'isAdmin',
  },
  '/students/:id/edit': {
    path: '/students/:id/edit',
    label: 'Editar Estudante',
    parent: '/students',
    permission: 'isAdmin',
  },
  '/students/:id': {
    path: '/students/:id',
    label: 'Visualizar Estudante',
    parent: '/students',
    permission: 'isAdmin',
  },
};
