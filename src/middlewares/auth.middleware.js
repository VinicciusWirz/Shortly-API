import { db } from "../database/database.connection.js";
import jwt from "jsonwebtoken";

export default async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const token = authorization.replace("Bearer ", "");
  const key = process.env.SECRET_KEY || "super_secret_key";

  try {
    const email = jwt.verify(token, key).email;
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
    if (error.name === "JsonWebTokenError")
      return res.status(401).send("invalid signature");
    res.status(500).send(error);
  }
}
