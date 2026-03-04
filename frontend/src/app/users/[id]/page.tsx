"use client";

import styled from "styled-components";
import { useParams } from "next/navigation";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LastPosts } from "@/components/user/LastPosts";
import { WorkBudget } from "@/components/user/WorkBudget";
import {
  getSetupsByUserId,
  getUserById,
  MOCK_LOGGED_USER_ID,
} from "@/mocks/setups";

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

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return null;
  }

  const user = getUserById(id);

  if (!user) {
    return null;
  }

  const posts = getSetupsByUserId(id);
  const isOwnProfile = id === MOCK_LOGGED_USER_ID;

  return (
    <Page>
      <Content>
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Perfil", href: `/users/${id}` },
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
