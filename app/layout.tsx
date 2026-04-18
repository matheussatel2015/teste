import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saíso Korean Food Market',
  description:
    'Saíso Korean Food Market - Restaurante e Mercearia Coreana com foco em experiência, cultura e bons momentos.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
