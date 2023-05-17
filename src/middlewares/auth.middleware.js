import { db } from "../database/database.connection.js";

export default async function authValidation(req, res, next) {
  try {
    res.send("placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
