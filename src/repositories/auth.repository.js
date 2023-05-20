import { db } from "../database/database.connection.js";

export async function createUserDB(name, email, hashPassword) {
  const result = await db.query(
    `
          INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
        `,
    [name, email, hashPassword]
  );
  return result;
}

export async function getUserDB(email) {
  const result = await db.query(
    `SELECT * FROM users WHERE email=$1;`,
    [email]
  );
  return result;
}
