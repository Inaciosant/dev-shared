"use client";

import styled from "styled-components";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LastPosts } from "@/components/user/LastPosts";
import { WorkBudget } from "@/components/user/WorkBudget";
import { ISetup } from "@/types/setup";
import { IPopulatedUser } from "@/types/user";

const Page = styled.main`
  min-height: calc(100vh - 70px);
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

type UserProfileViewProps = {
  userId: string;
  user: IPopulatedUser;
  posts: ISetup[];
  isOwnProfile: boolean;
};

export function UserProfileView({
  userId,
  user,
  posts,
  isOwnProfile,
}: UserProfileViewProps) {
  return (
    <Page>
      <Content>
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Perfil", href: `/users/${userId}` },
            { label: user.name },
          ]}
        />

        <WorkBudget
          user={user}
          postsCount={posts.length}
          isOwnProfile={isOwnProfile}
        />

        <LastPosts posts={posts} ownerName={user.name} />
      </Content>
    </Page>
  );
}
