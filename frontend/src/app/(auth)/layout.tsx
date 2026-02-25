import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AuthWrapper, AuthCard, Logo } from './AuthLayoutStyles';
import { Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login - Dev-Stack-Share',
  description: 'Faça login para compartilhar seu setup de desenvolvimento com a comunidade.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <AuthCard>
        <Logo>
            <Link href="/">Dev-Stack <Share2 size={20} style={{ marginLeft: '0.2rem', marginTop: '1rem' }} /></Link>
          </Logo>
        {children}
      </AuthCard>
    </AuthWrapper>
  );
}