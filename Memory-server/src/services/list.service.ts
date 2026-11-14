import { pool } from "../config/db.js";

export interface CreateListInput {
  title: string;
  icon: string;
  color: string;
  viewType: string;
  userId: string;
}

export type UpdateListInput = Partial<Omit<CreateListInput, "userId">>;

export const getAllByUserId = async (userId: string) => {
  const result = await pool.query(
    "SELECT * FROM lists WHERE userid = $1 ORDER BY createdat DESC",
    [userId],
  );
  return result.rows;
};

export const getById = async (listId: string, userId: string) => {
  const result = await pool.query(
    "SELECT id, title, icon, color, viewtype FROM lists WHERE id = $1 AND userid = $2",
    [listId, userId],
  );

  return result.rows[0];
};

export const create = async (data: CreateListInput) => {
  const result = await pool.query(
    `INSERT INTO lists (title, icon, color, viewtype, userid) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, icon, color, viewtype, createdat`,
    [data.title, data.icon, data.color, data.viewType, data.userId],
  );

  return result.rows[0];
};

export const update = async (
  id: string,
  userId: string,
  data: UpdateListInput,
) => {
  if (!data.title && !data.icon && !data.color && !data.viewType) {
    throw new Error("No data provided for update");
  }

  const setClauses: string[] = [];
  const values: string[] = [];
  let paramIndex = 1;

  if (data.title) {
    setClauses.push(`title=$${paramIndex}`);
    values.push(data.title);
    paramIndex++;
  }

  if (data.icon) {
    setClauses.push(`icon=$${paramIndex}`);
    values.push(data.icon);
    paramIndex++;
  }

  if (data.color) {
    setClauses.push(`color=$${paramIndex}`);
    values.push(data.color);
    paramIndex++;
  }

  if (data.viewType) {
    setClauses.push(`viewtype=$${paramIndex}`);
    values.push(data.viewType);
    paramIndex++;
  }

  values.push(id);
  const idIndex = paramIndex;

  values.push(userId);
  const userIdIndex = paramIndex + 1;

  const query = `UPDATE lists SET ${setClauses.join(", ")} WHERE id=$${idIndex} AND userid=$${userIdIndex} RETURNING id, title, icon, color, viewtype, createdat`;
  const result = await pool.query(query, values);

  return result.rows[0];
};

export const remove = async (id: string, userId: string) => {
  await pool.query("DELETE FROM lists WHERE id=$1 AND userid=$2", [id, userId]);
};
