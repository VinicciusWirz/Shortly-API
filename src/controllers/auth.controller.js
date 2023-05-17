import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    await db.query(
      `
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
      `,
      [name, email, hashPassword]
    );

    res.sendStatus(201);
  } catch (error) {
    if (error.constraint === "users_email_key") return res.sendStatus(409);
    res.status(500).send(error.message);
  }
}

export async function signin(req, res) {
  try {
    res.send("placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
