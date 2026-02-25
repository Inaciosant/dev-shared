"use client";

import Link from "next/link";
import styled from "styled-components";

const Wrap = styled.main`
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.25rem;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Text = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Action = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-decoration: none;
  font-weight: 600;
`;

export default function SetupError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <Wrap>
      <Card>
        <Title>Erro ao carregar setup</Title>
        <Text>
          Ocorreu um erro inesperado ao abrir os detalhes. Você pode tentar
          novamente.
        </Text>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Action href="/setups">Voltar para lista</Action>
          <button
            type="button"
            onClick={reset}
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              padding: "0.75rem 1rem",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Tentar de novo
          </button>
        </div>
      </Card>
    </Wrap>
  );
}
