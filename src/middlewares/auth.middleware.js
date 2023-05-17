import { db } from "../database/database.connection.js";
import jwt from "jsonwebtoken";

export default async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const token = authorization.replace("Bearer ", "");

  try {
    const secretKey = process.env.SECRET_KEY || "chave_super_secreta";
    const email = jwt.verify(token, secretKey).email;
    const { rows, rowCount } = await db.query(
      `
        SELECT * 
            FROM users 
            WHERE email=$1;
    `,
      [email]
    );
    if (!rowCount) return res.sendStatus(401);
    res.locals.user = rows[0];
    next();
  } catch (error) {
    if (error.message === "invalid signature")
      return res.status(401).send("invalid signature");
    res.status(500).send(error);
  }
}
