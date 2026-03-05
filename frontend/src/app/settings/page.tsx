"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { userService } from "@/services/user/user.service";
import { IUser } from "@/types/user";

const SettingsContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function SettingsPage() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    userService
      .me()
      .then((response) => setUser(response))
      .catch(() => setUser(null));
  }, []);

  return (
    <SettingsContainer>
      <Title>Configurações</Title>
      <Subtitle>
        {user
          ? `Logado como ${user.name} (${user.email}).`
          : "Faça login para editar suas configurações."}
      </Subtitle>
    </SettingsContainer>
  );
}
