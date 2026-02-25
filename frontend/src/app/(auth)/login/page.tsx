'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// componentes
import { Button } from '@/components/ui/Button'; 
import { Input } from '@/components/ui/Input'; 
import { AuthFormWrapper, AuthHeader, AuthBottomLink, AuthError } from '@/components/auth/AuthStyles';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
});

const ApiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
      const [authError, setAuthError] = useState<string | null>(null);
      const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

 const onSubmit = async (data: LoginFormInputs) => {
    setAuthError(null); 
    try {
      console.log('Login data:', data);
      router.push('/setups');
    } catch (error) {
      setAuthError('Ops! O login falhou. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <>
      <AuthHeader>
        <h2>Bem-vindo de volta</h2>
        <p>Faça login para compartilhar seu setup</p>
      </AuthHeader>

      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input 
          label="E-mail" 
          type="email" 
          placeholder="seu@email.com" 
          {...register('email')}
          error={errors.email?.message} 
        />
        <Input 
          label="Senha" 
          type="password" 
          placeholder="••••••••" 
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" fullWidth disabled={isSubmitting}>
          
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </AuthFormWrapper>
      {authError && (
        <AuthError>
          {authError}
        </AuthError>
      )}

      <AuthBottomLink>
        Ainda não tem conta? <Link href="/register">Crie uma agora</Link>
      </AuthBottomLink>
    </>
  );
}