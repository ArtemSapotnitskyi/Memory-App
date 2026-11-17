import { apiClient } from "../api";

export interface Item {
  id: string;
  content: string;
  iscompleted: boolean;
  listid: string;
  createdat: string;
}

export interface CreateItemPayload {
  content: string;
  isCompleted: boolean;
  listId: string;
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, "listId">>;

export const itemService = {
  async getAllByListId(listId: string): Promise<Item[]> {
    const response = await apiClient.get<Item[]>(`/lists/${listId}/items`);
    return response.data;
  },

  async create(data: CreateItemPayload): Promise<Item> {
    const response = await apiClient.post<Item>("/items", data);
    return response.data;
  },

  async update(id: string, data: UpdateItemPayload): Promise<Item> {
    const response = await apiClient.patch<Item>(`/items/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `/items/${id}`,
    );
    return response.data;
  },
};
