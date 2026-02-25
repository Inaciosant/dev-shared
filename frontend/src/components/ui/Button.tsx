'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* Variante: Primary */
  ${({ variant, theme }) => variant === 'primary' && css`
    background-color: ${theme.colors.primary};
    color: #ffffff;
    border: none;

    &:hover {
      filter: brightness(0.9);
    }
  `}

  /* Variante: Outline */
  ${({ variant, theme }) => variant === 'outline' && css`
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary};

    &:hover {
      background-color: ${theme.colors.primary};
      color: #ffffff;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export function Button({ children, variant = 'primary', fullWidth = false, ...rest }: ButtonProps) {
  return (
    <StyledButton variant={variant} fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
}