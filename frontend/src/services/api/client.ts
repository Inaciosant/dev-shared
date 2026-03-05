import { API_URL } from "@/config/env";

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type ApiRequestOptions = {
  cookie?: string;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
};

function buildHeaders(body: BodyInit | null | undefined, headers?: HeadersInit) {
  const nextHeaders = new Headers(headers);

  if (!(body instanceof FormData) && !nextHeaders.has("Content-Type")) {
    nextHeaders.set("Content-Type", "application/json");
  }

  return nextHeaders;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  options: ApiRequestOptions = {},
): Promise<T> {
  const headers = buildHeaders(init.body, init.headers);

  if (options.cookie) {
    headers.set("cookie", options.cookie);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
    cache: options.cache ?? init.cache,
    next: options.next,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && "error" in data && typeof data.error === "string" && data.error) ||
      "Falha na requisição";

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}
