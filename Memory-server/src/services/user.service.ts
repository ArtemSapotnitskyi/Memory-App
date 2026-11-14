import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  username?: string;
  password?: string;
}

export const getById = async (id: string) => {
  const result = await pool.query(
    "SELECT id, username, email, createdat FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

export const findByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

export const create = async (data: CreateUserInput) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const userResult = await pool.query(
    "INSERT INTO users (username, email, passwordhash) VALUES ($1, $2, $3) RETURNING id, username, email, createdat",
    [data.username, data.email, hashedPassword],
  );

  const newUser = userResult.rows[0];

  return newUser;
};

export const update = async (id: string, data: UpdateUserInput) => {
  if (!data.username && !data.password) {
    throw new Error("No data provided for update");
  }

  // Variables for Dynamic SQL requests
  const setClauses: string[] = [];
  const values: string[] = [];
  let paramIndex = 1;

  if (data.username) {
    setClauses.push(`username=$${paramIndex}`);
    values.push(data.username);
    paramIndex++;
  }

  if (data.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    setClauses.push(`passwordhash=$${paramIndex}`);
    values.push(hashedPassword);
    paramIndex++;
  }

  //As the last parameter, we add the user ID for the WHERE clause
  values.push(id);

  const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${paramIndex} RETURNING id, username, email, createdat`;
  const result = await pool.query(query, values);

  return result.rows[0];
};

export const remove = async (id: string) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};
