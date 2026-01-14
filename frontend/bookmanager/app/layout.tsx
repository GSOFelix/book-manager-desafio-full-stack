import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "BookManager",
  description: "Controle básico de livros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className="min-h-screen bg-black text-green-100"
      >
        {children}
      </body>
    </html>
  );
}
