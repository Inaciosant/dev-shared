import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { SetupDetailView } from "@/components/setup/SetupDetailView";
import { setupService } from "@/services/setup/setup.service";
import { userService } from "@/services/user/user.service";

interface SetupDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function SetupDetailsPage({
  params,
}: SetupDetailsPageProps) {
  const { id } = await params;
  const cookieHeader = (await cookies()).toString();

  let setup;
  let comments;

  try {
    const data = await setupService.getById(id, cookieHeader);
    setup = data.setup;
    comments = data.comments;
  } catch {
    notFound();
  }

  let currentUserId: string | null = null;

  try {
    const me = await userService.me(cookieHeader);
    currentUserId = me._id;
  } catch {
    currentUserId = null;
  }

  if (!setup) {
    notFound();
  }

  return (
    <SetupDetailView
      setup={setup}
      initialComments={comments}
      currentUserId={currentUserId}
    />
  );
}
