import { boolean } from "zod";
import { pool } from "../config/db.js";

export interface CreateItemInput {
  content: string;
  isCompleted: boolean;
  userId: string;
  listId: string;
}

export type UpdateItemInput = Partial<
  Omit<CreateItemInput, "userId" | "listId">
>;

export const getAllByListId = async (userId: string, listId: string) => {
  const result = await pool.query(
    "SELECT * FROM items WHERE userid = $1 AND listid = $2 ORDER BY createdat DESC",
    [userId, listId],
  );
  return result.rows;
};

export const create = async (data: CreateItemInput) => {
  const result = await pool.query(
    `INSERT INTO items (content, iscompleted, userid, listid) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, content, iscompleted, listid, createdat`,
    [data.content, data.isCompleted, data.userId, data.listId],
  );

  return result.rows[0];
};

export const update = async (
  id: string,
  userId: string,
  data: UpdateItemInput,
) => {
  if (data.content === undefined && data.isCompleted === undefined) {
    throw new Error("No data provided for update");
  }

  const setClauses: string[] = [];
  const values: (string | boolean)[] = [];
  let paramIndex = 1;

  if (data.content) {
    setClauses.push(`content=$${paramIndex}`);
    values.push(data.content);
    paramIndex++;
  }

  if (data.isCompleted) {
    setClauses.push(`isCompleted=$${paramIndex}`);
    values.push(data.isCompleted);
    paramIndex++;
  }

  values.push(id);
  const idIndex = paramIndex;

  values.push(userId);
  const userIdIndex = paramIndex + 1;

  const query = `
    UPDATE items 
    SET ${setClauses.join(", ")} 
    WHERE id=$${idIndex} AND userid=$${userIdIndex} 
    RETURNING id, content, iscompleted, listid, createdat
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const remove = async (id: string, userId: string) => {
  (await pool.query("DELETE FROM items WHERE id=$1 AND userid=$2"),
    [id, userId]);
};
