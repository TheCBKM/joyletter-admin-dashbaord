const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || "Request failed") as ApiError;
    error.status = response.status;
    throw error;
  }

  return response.json() as Promise<T>;
}

export const api = {
  listGroups: () => request<GroupResponse[]>(`/super-admin/groups`),
  createGroup: (payload: CreateGroupPayload) =>
    request<GroupResponse>(`/super-admin/groups`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  listSankalps: (groupId: string) =>
    request<SankalpResponse[]>(`/super-admin/groups/${groupId}/sankalps`),
  createSankalp: (groupId: string, payload: CreateSankalpPayload) =>
    request<SankalpResponse>(`/super-admin/groups/${groupId}/sankalps`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateSankalp: (
    groupId: string,
    sankalpId: string,
    payload: UpdateSankalpPayload,
  ) =>
    request<SankalpResponse>(`/super-admin/groups/${groupId}/sankalps/${sankalpId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  listMembers: (groupId: string) =>
    request<MemberResponse[]>(`/super-admin/groups/${groupId}/members`),
  createMember: (groupId: string, payload: CreateMemberPayload) =>
    request<MemberResponse>(`/super-admin/groups/${groupId}/members`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export type GroupResponse = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    members: number;
  };
  activeSankalp?: {
    id: string;
    title: string;
    description?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    targetMalaCount?: number | null;
    isActive?: boolean;
    completedMalaCount?: number | null;
    remainingMalaCount?: number | null;
    progressPercentage?: number | null;
  } | null;
};

export type CreateGroupPayload = {
  name: string;
  description?: string;
};

export type SankalpResponse = {
  id: string;
  title: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  targetMalaCount?: number | null;
  isActive?: boolean;
  completedMalaCount?: number | null;
  remainingMalaCount?: number | null;
  progressPercentage?: number | null;
};

export type CreateSankalpPayload = {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  targetMalaCount?: number;
};

export type UpdateSankalpPayload = CreateSankalpPayload & {
  isActive?: boolean;
};

export type MemberResponse = {
  id: string;
  userId: string;
  groupId: string;
  role?: string;
  joinedAt?: string;
  user?: {
    id: string;
    name?: string | null;
    mobileNumber?: string | null;
  } | null;
};

export type CreateMemberPayload = {
  name: string;
  mobileNumber?: string;
  role?: string;
};

export type ApiError = Error & { status?: number };

