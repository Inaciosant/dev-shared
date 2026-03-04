"use client";

import Link from "next/link";
import styled from "styled-components";
import { Edit3, Plus } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { IPopulatedUser } from "@/types/user";

interface WorkBudgetProps {
  user: IPopulatedUser;
  postsCount: number;
  isOwnProfile: boolean;
}

const Header = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const UserBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const UserInfo = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const Name = styled.h1`
  margin: 0;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  color: ${({ theme }) => theme.colors.text};
`;

const Sub = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Meta = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const EditPanel = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 0.85rem;
  display: grid;
  gap: 0.6rem;
`;

const EditTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const EditHint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export function WorkBudget({ user, postsCount, isOwnProfile }: WorkBudgetProps) {
  return (
    <Header>
      <Main>
        <UserBlock>
          <Avatar src={user.avatar} fallback={user.name} size={56} />

          <UserInfo>
            <Name>{user.name}</Name>
            <Sub>{user.workRole ?? "Sem cargo informado"}</Sub>
          </UserInfo>
        </UserBlock>

        {isOwnProfile ? (
          <Actions>
            <Button type="button">
              <Edit3 size={16} /> Editar perfil
            </Button>
            <Link href="/setups/new" style={{ textDecoration: "none" }}>
              <Button type="button" variant="outline">
                <Plus size={16} /> Novo setup
              </Button>
            </Link>
          </Actions>
        ) : null}
      </Main>

      <Meta>{postsCount} postagem(ns) publicada(s)</Meta>

      {isOwnProfile ? (
        <EditPanel>
          <EditTitle>Area de edicao</EditTitle>
          <EditHint>
            Como este perfil e seu, aqui voce pode editar dados de usuario e gerenciar suas postagens.
          </EditHint>
        </EditPanel>
      ) : null}
    </Header>
  );
}
