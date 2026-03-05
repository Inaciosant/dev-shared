import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { UserProfileView } from "@/components/user/UserProfileView";
import { userService } from "@/services/user/user.service";

interface UserProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = await params;
  const cookieHeader = (await cookies()).toString();

  if (!id) {
    notFound();
  }

  let userData;
  try {
    userData = await userService.show(id, cookieHeader);
  } catch {
    notFound();
  }

  const posts = await userService.setupsByUser(id, cookieHeader);

  let currentUserId: string | null = null;
  try {
    const me = await userService.me(cookieHeader);
    currentUserId = me._id;
  } catch {
    currentUserId = null;
  }

  const user = userData.user;
  const isOwnProfile = currentUserId === id;

  return <UserProfileView userId={id} user={user} posts={posts} isOwnProfile={isOwnProfile} />;
}
