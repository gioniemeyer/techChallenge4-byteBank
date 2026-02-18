import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./modules/auth/presentation/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Bytebank"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
