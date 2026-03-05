import { IComment } from "@/types/comments";
import { ISetup } from "@/types/setup";
import { apiRequest } from "@/services/api/client";

export type SetupDetailResponse = {
  setup: ISetup;
  comments: IComment[];
};

type SetupUpdatePayload = {
  title?: string;
  description?: string;
  workRole?: string;
  workModality?: "Remote" | "Hybrid" | "Office";
  thumbnail?: string;
  gears?: unknown[];
  softwareStack?: string[];
  tags?: string[];
};

export const setupService = {
  list(params?: { q?: string; role?: string; tag?: string }, cookie?: string) {
    const search = new URLSearchParams();

    if (params?.q) search.set("q", params.q);
    if (params?.role) search.set("role", params.role);
    if (params?.tag) search.set("tag", params.tag);

    const suffix = search.toString() ? `?${search.toString()}` : "";

    return apiRequest<ISetup[]>(`/setups${suffix}`, {}, cookie ? { cookie } : undefined);
  },

  getById(id: string, cookie?: string) {
    return apiRequest<SetupDetailResponse>(`/setups/${id}`, {}, cookie ? { cookie } : undefined);
  },

  create(payload: FormData) {
    return apiRequest<ISetup>("/setups", {
      method: "POST",
      body: payload,
    });
  },

  update(id: string, payload: SetupUpdatePayload | FormData) {
    return apiRequest<ISetup>(`/setups/${id}`, {
      method: "PUT",
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    });
  },

  remove(id: string) {
    return apiRequest<void>(`/setups/${id}`, {
      method: "DELETE",
    });
  },
};
