// app/(admin)/layout.tsx

import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {


  return (
    <html lang="pt-BR">
      <body>{children}</body>
      </html>
  );
}
