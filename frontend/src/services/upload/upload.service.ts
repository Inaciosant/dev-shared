import { apiRequest } from "@/services/api/client";

type UploadFolder = "avatars" | "setups" | "general";

export type UploadImageResponse = {
  url: string;
  publicId: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
};

export const uploadService = {
  uploadImage(file: File, folder: UploadFolder = "general") {
    const payload = new FormData();
    payload.append("image", file);
    payload.append("folder", folder);

    return apiRequest<UploadImageResponse>("/uploads/image", {
      method: "POST",
      body: payload,
    });
  },
};
