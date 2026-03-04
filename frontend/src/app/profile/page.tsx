import { redirect } from "next/navigation";

import { MOCK_LOGGED_USER_ID } from "@/mocks/setups";

export default function ProfilePage() {
  redirect(`/users/${MOCK_LOGGED_USER_ID}`);
}
