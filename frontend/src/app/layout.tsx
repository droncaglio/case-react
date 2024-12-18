import { ReactNode } from 'react';
import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from '@/configs/config';

export const metadata: Metadata = {
  title: {
    template: `%s | ${config.project.name}`,
    default: config.project.name,
  },
  description: config.project.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}