'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

// componentes
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthFormWrapper, AuthHeader, AuthBottomLink, AuthError } from '@/components/auth/AuthStyles';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
  confirmPassword: z.string().min(6, 'Mínimo de 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [authError, setAuthError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setAuthError(null);
    try {
      console.log('Register data:', data);
    } catch (error) {
      setAuthError('Ops! O cadastro falhou. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <AuthHeader>
        <h2>Crie sua conta</h2>
        <p>Compartilhe seu setup com a comunidade</p>
      </AuthHeader>

      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome"
          type="text"
          placeholder="Seu nome"
          {...register('name')}
          error={errors.name?.message}
        />
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
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
        </Button>
      </AuthFormWrapper>

      {authError && <AuthError>{authError}</AuthError>}

      <AuthBottomLink>
        Já tem conta? <Link href="/login">Faça login</Link>
      </AuthBottomLink>
    </>
  );
}