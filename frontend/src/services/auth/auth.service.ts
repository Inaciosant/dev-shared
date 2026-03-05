import { apiRequest } from "@/services/api/client";

type AuthPayload = {
  email: string;
  password: string;
};

type RegisterPayload = AuthPayload & {
  name: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export const authService = {
  register(payload: RegisterPayload) {
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  login(payload: AuthPayload) {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout(cookie?: string) {
    return apiRequest<void>(
      "/auth/logout",
      {
        method: "POST",
      },
      cookie ? { cookie } : undefined,
    );
  },
};
