'use client'
import React from 'react';
import AuthNav from './_components/AuthNav';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <AuthNav />
      <section className="flex-1 flex-center bg-gradient-to-r from-[#FFCB4E]/15 to-[#AD75E2]/15">{children}</section>
    </main>
  );
} 
