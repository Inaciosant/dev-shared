import { apiRequest } from "@/services/api/client";
import { ISetup } from "@/types/setup";
import { IUser } from "@/types/user";

type PublicUserProfileResponse = {
  user: Pick<IUser, "_id" | "name" | "avatar" | "bio" | "githubUrl" | "createdAt" | "updatedAt">;
  stats: {
    postsCount: number;
  };
};

export const userService = {
  me(cookie?: string) {
    return apiRequest<IUser>("/users/me", {}, cookie ? { cookie } : undefined);
  },

  show(userId: string, cookie?: string) {
    return apiRequest<PublicUserProfileResponse>(`/users/${userId}`, {}, cookie ? { cookie } : undefined);
  },

  setupsByUser(userId: string, cookie?: string) {
    return apiRequest<ISetup[]>(`/users/${userId}/setups`, {}, cookie ? { cookie } : undefined);
  },

  update(payload: FormData | Partial<Pick<IUser, "name" | "bio" | "avatar" | "githubUrl">> & { password?: string }) {
    return apiRequest<IUser>("/users/me", {
      method: "PUT",
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    });
  },

  remove() {
    return apiRequest<void>("/users/me", {
      method: "DELETE",
    });
  },
};
