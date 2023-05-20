import { db } from "../database/database.connection.js";

export function createUserDB(name, email, hashPassword) {
  const result = db.query(
    `
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
    `,
    [name, email, hashPassword]
  );
  return result;
}

export function getUserDB(email) {
  const result = db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
  return result;
}
