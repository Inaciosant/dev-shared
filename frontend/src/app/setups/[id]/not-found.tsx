"use client";

import Link from "next/link";
import styled from "styled-components";

const Page = styled.main`
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.35rem;
`;

const Description = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ActionLink = styled(Link)<{ $variant?: "primary" | "ghost" }>`
  text-decoration: none;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-weight: 600;
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "primary" ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $variant }) =>
    $variant === "primary" ? "#fff" : theme.colors.text};
`;

export default function SetupNotFound() {
  return (
    <Page>
      <Card>
        <Title>Setup não encontrado</Title>
        <Description>
          O setup que você tentou abrir não existe no mock atual.
        </Description>
        <Actions>
          <ActionLink href="/" $variant="ghost">
            Voltar ao início
          </ActionLink>
          <ActionLink href="/setups" $variant="primary">
            Ver todos os setups
          </ActionLink>
        </Actions>
      </Card>
    </Page>
  );
}
