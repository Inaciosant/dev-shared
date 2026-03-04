"use client";

import styled from "styled-components";

import { SetupCard } from "@/components/setup/SetupCard";
import { ISetup } from "@/types/setup";

interface LastPostsProps {
  posts: ISetup[];
  ownerName: string;
}

const Section = styled.section`
  margin-top: 1rem;
`;

const Title = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1rem;
`;

const EmptyState = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export function LastPosts({ posts, ownerName }: LastPostsProps) {
  return (
    <Section>
      <Title>Postagens de {ownerName}</Title>

      {posts.length === 0 ? (
        <EmptyState>
          Este usuario ainda nao publicou setups.
        </EmptyState>
      ) : (
        <Grid>
          {posts.map((setup) => (
            <SetupCard key={setup._id} setup={setup} />
          ))}
        </Grid>
      )}
    </Section>
  );
}
