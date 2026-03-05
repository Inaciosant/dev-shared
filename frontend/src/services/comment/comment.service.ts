import { apiRequest } from "@/services/api/client";
import { IComment } from "@/types/comments";

type CreateCommentPayload = {
  content: string;
  parentComment?: string | null;
};

export const commentService = {
  listBySetup(setupId: string, cookie?: string) {
    return apiRequest<IComment[]>(`/setups/${setupId}/comments`, {}, cookie ? { cookie } : undefined);
  },

  create(setupId: string, payload: CreateCommentPayload) {
    return apiRequest<IComment>(`/setups/${setupId}/comments`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  remove(commentId: string) {
    return apiRequest<void>(`/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};
