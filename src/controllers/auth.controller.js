import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDB, getUserDB } from "../repositories/auth.repository.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    await createUserDB(name, email, hashPassword);

    res.sendStatus(201);
  } catch (error) {
    if (error.constraint === "users_email_key") return res.sendStatus(409);
    res.status(500).send(error.message);
  }
}

export async function signin(req, res) {
  const { email, password: passwordInput } = req.body;
  try {
    const { rows, rowCount } = await getUserDB(email);

    if (!rowCount) return res.sendStatus(401);

    const { password } = rows[0];
    const passwordMatch = bcrypt.compareSync(passwordInput, password);
    if (!passwordMatch) return res.sendStatus(401);
    const key = process.env.SECRET_KEY || "super_secret_key";
    const token = jwt.sign({ email }, key);

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
