'use client';

import styled from 'styled-components';

export const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.3s ease;
  padding: 1rem;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;
