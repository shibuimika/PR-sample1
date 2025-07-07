import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from '@/components/layout/MainLayout';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PR Reporter - 記者管理システム",
  description: "社外広報担当者向けの記者管理・マッチング・メッセージ生成システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
