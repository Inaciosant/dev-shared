"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Page = styled.main`
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
`;

export default function ProfileLoading() {
  return (
    <Page>
      <Spinner aria-label="Carregando perfil" role="status" />
    </Page>
  );
}
