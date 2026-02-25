'use client';

import styled from 'styled-components';

export const AuthFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const AuthHeader = styled.div`
  text-align: center;
  
  h2 {
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const AuthBottomLink = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 1rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AuthError = styled.div`
  background-color: #ef4444;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.875rem;
`;