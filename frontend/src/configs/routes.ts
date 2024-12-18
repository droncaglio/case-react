//src/configs/routes.ts

export type StaticRoutes = {
  STUDENTS: string;
  STUDENTS_NEW: string;
  STUDENTS_IMPORT: string;
  LOGIN: string;
};

export type DynamicRoutes = {
  STUDENTS_EDIT: (id: number | string) => string;
  STUDENTS_SHOW: (id: number | string) => string;
};

export const ROUTES: StaticRoutes & DynamicRoutes = {
  // Rotas Estáticas
  STUDENTS: "/students",
  STUDENTS_NEW: "/students/new",
  STUDENTS_IMPORT: "/students/import",
  LOGIN: "/login",

  // Rotas Dinâmicas
  STUDENTS_EDIT: (id: number | string) =>
    `/students/${encodeURIComponent(id)}/edit`,
  STUDENTS_SHOW: (id: number | string) => `/students/${encodeURIComponent(id)}`,
};
