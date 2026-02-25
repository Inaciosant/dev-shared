"use client";

import styled from "styled-components";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SetupCardSkeleton } from "@/components/ui/Skeleton";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const Block = styled.div<{ $h: number; $w?: string }>`
  height: ${({ $h }) => `${$h}px`};
  width: ${({ $w }) => $w ?? "100%"};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.border};
  opacity: 0.65;
  margin-bottom: 0.75rem;
`;

export default function SetupsLoading() {
  return (
    <PageContainer>
      <Content>
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Setups" },
          ]}
        />
        <Block $h={28} $w="220px" />
        <Block $h={18} $w="420px" />
        <Grid>
          {Array.from({ length: 6 }).map((_, index) => (
            <SetupCardSkeleton key={index} />
          ))}
        </Grid>
      </Content>
    </PageContainer>
  );
}
