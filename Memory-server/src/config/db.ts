import { Pool } from "pg";
import dotenv from "dotenv";

//Reading env file
dotenv.config();

//Debag check-in
console.log(
  "DB URL starts with:",
  process.env.DATABASE_URL_DEV
    ? process.env.DATABASE_URL_DEV.substring(0, 15)
    : "UNDEFINED!!!",
);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL_DEV,

  //SSL CERTIFICATES
  // ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Errror to connection BD:", err.message);
  } else {
    console.log("Good connection to PostgreSQL!");
  }
});
