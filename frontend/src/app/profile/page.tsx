import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { userService } from "@/services/user/user.service";

export default async function ProfilePage() {
  const cookieHeader = (await cookies()).toString();

  try {
    const me = await userService.me(cookieHeader);
    redirect(`/users/${me._id}`);
  } catch {
    redirect("/login");
  }
}
