import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavWrapper from "@/components/Shared/NavWrapper";
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "@/components/Shared/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquario",
  description: "O seu melhor guia e comunidade para a UFPB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
              <ThemeProvider
                  attribute="class"
                  defaultTheme="light"
                  enableSystem
                  disableTransitionOnChange
                >
                  <NavWrapper />
                  {children}
              </ThemeProvider>
          </AuthProvider>
        </body>
    </html>
  );
}
