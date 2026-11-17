import { apiClient } from "../api";

export interface List {
  id: string;
  title: string;
  icon: string;
  color: string;
  viewtype: string;
  createdat: string;
}

export interface CreateListPayload {
  title: string;
  icon: string;
  color: string;
  viewType: string;
}

export type UpdateListPayload = Partial<CreateListPayload>;

export const listService = {
  async getAll(): Promise<List[]> {
    const response = await apiClient.get<List[]>("/lists");
    return response.data;
  },

  async getById(id: string): Promise<List> {
    const response = await apiClient.get<List>(`/lists/${id}`);
    return response.data;
  },

  async create(data: CreateListPayload): Promise<List> {
    const response = await apiClient.post<List>("/lists", data);
    return response.data;
  },

  async update(id: string, data: UpdateListPayload): Promise<List> {
    const response = await apiClient.patch<List>(`/lists/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `/lists/${id}`,
    );
    return response.data;
  },
};
