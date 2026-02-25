"use client";

import styled from "styled-components";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SkeletonBase } from "@/components/ui/Skeleton";

const Page = styled.main`
  min-height: calc(100vh - 70px);
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
`;

export default function SetupDetailLoading() {
  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Setups", href: "/setups" },
            { label: "Carregando..." },
          ]}
        />

        <Grid>
          <Card>
            <SkeletonBase $height="320px" $radius="10px" />
          </Card>
          <Card>
            <SkeletonBase $height="28px" $width="80%" style={{ marginBottom: 12 }} />
            <SkeletonBase $height="18px" $width="60%" style={{ marginBottom: 10 }} />
            <SkeletonBase $height="18px" $width="70%" style={{ marginBottom: 10 }} />
            <SkeletonBase $height="18px" $width="65%" />
          </Card>
        </Grid>

        <Card style={{ marginBottom: 12 }}>
          <SkeletonBase $height="22px" $width="160px" style={{ marginBottom: 10 }} />
          <SkeletonBase $height="16px" style={{ marginBottom: 8 }} />
          <SkeletonBase $height="16px" style={{ marginBottom: 8 }} />
          <SkeletonBase $height="16px" $width="85%" />
        </Card>

        <Card>
          <SkeletonBase $height="22px" $width="180px" style={{ marginBottom: 12 }} />
          <SkeletonBase $height="70px" style={{ marginBottom: 10 }} />
          <SkeletonBase $height="110px" style={{ marginBottom: 10 }} />
          <SkeletonBase $height="40px" $width="220px" />
        </Card>
      </Container>
    </Page>
  );
}
