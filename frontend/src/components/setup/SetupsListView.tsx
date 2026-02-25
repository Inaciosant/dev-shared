"use client";

import styled from "styled-components";

import { SetupCard } from "@/components/setup/SetupCard";
import { SetupCardSkeleton } from "@/components/ui/Skeleton";
import { ISetup } from "@/types/setup";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";

interface SetupsListViewProps {
  title: string;
  subtitle?: string;
  setups: ISetup[];
  isLoading?: boolean;
  query?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

const PageContainer = styled.main`
  min-height: calc(100vh - 70px);
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.25rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.4rem, 2vw, 2rem);
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.5rem 0 0;
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const EmptyState = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
`;

export function SetupsListView({
  title,
  subtitle,
  setups,
  isLoading = false,
  query,
  breadcrumbItems,
}: SetupsListViewProps) {
  const showEmpty = !isLoading && setups.length === 0;

  return (
    <PageContainer>
      <Content>
        {breadcrumbItems?.length ? <Breadcrumb items={breadcrumbItems} /> : null}

        <Header>
          <Title>{title}</Title>
          {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
          {query ? (
            <Summary>
              {setups.length} resultado(s) para "{query}"
            </Summary>
          ) : null}
        </Header>

        {showEmpty ? (
          <EmptyState>
            Nenhum setup encontrado para "{query}". Tente outro termo.
          </EmptyState>
        ) : (
          <Grid>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SetupCardSkeleton key={`skeleton-${index}`} />
                ))
              : setups.map((setup) => <SetupCard key={setup._id} setup={setup} />)}
          </Grid>
        )}
      </Content>
    </PageContainer>
  );
}
