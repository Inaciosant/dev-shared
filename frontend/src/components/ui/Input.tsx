"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label<{ $hasError?: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, $hasError }) => ($hasError ? '#ef4444' : theme.colors.text)};
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? "#ef4444" : theme.colors.border)};
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? "#ef4444" : theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    ${({ $hasError }) => $hasError && "color: #ef4444;"} 
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #ef4444; /* Vermelho padrão para erros */
  margin-top: 0.25rem;
  display: block;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <Wrapper>
        <Label $hasError={!!error}>{label}</Label>
        <StyledInput ref={ref} $hasError={!!error} {...rest} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Wrapper>
    );
  },
);

Input.displayName = "Input";
