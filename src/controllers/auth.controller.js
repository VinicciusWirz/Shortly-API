import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const { email, password: passwordInput } = req.body;
  try {
    const { rows, rowCount } = await db.query(
      `SELECT users.password, users.id FROM users WHERE email=$1;`,
      [email]
    );
    if (!rowCount) return res.sendStatus(401);

    const { password, id } = rows[0];
    const passwordMatch = bcrypt.compareSync(passwordInput, password);
    if (!passwordMatch) return res.sendStatus(401);
    const key = process.env.SECRET_KEY || "super_secret_key";
    const token = jwt.sign({ email }, key);

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
