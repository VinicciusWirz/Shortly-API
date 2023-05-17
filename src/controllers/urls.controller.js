import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function shortenUrlInfo(req, res) {
  try {
    res.send("placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createShortenUrl(req, res) {
  const url = req.body.url;
  const user = res.locals.user;
  try {
    const shortUrl = nanoid(8);
    const { rows } = await db.query(
      `
        INSERT INTO links
          ("userId", url, "shortUrl")
        VALUES
          ($1, $2, $3)
        RETURNING id;
      `,
      [user.id, url, shortUrl]
    );
    const body = { id: rows[0].id, shortUrl };
    res.status(201).send(body);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function visitLink(req, res) {
  try {
    res.send("placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteShortenUrl(req, res) {
  try {
    res.send("placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
