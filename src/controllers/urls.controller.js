import { nanoid } from "nanoid";
import {
  createNewShortUrlDB,
  deleteUrlDB,
  getUrlFromIdDB,
  updateVisitCountDB,
} from "../repositories/urls.repository.js";
import { getUserInfoDB } from "../repositories/users.repository.js";
import { db } from "../database/database.connection.js";

export async function shortenUrlInfo(req, res) {
  const id = req.params.id;
  try {
    // const { rows, rowCount } = await getUrlFromIdDB(id, "render");
    const { rows, rowCount } = await db.query(
      `
          SELECT 
          id, "shortUrl", url
          FROM links WHERE id=$1;
      `,
      [id]
    );

    if (!rowCount) return res.sendStatus(404);
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createShortenUrl(req, res) {
  const url = req.body.url;
  const user = res.locals.user;
  try {
    const shortUrl = nanoid(8);
    // const { rows } = await createNewShortUrlDB(user.id, url, shortUrl);
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
  const shortUrl = req.params.shortUrl;
  try {
    // const { rows, rowCount } = await updateVisitCountDB(shortUrl);
    const { rows, rowCount } = await db.query(
      `
          UPDATE links
          SET visits = visits+1
              WHERE "shortUrl"=$1
          RETURNING url;
      `,
      [shortUrl]
    );
    if (!rowCount) return res.sendStatus(404);

    res.redirect(rows[0].url);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteShortenUrl(req, res) {
  const userId = res.locals.user.id;
  const id = req.params.id;
  try {
    // await deleteUrlDB(userId, id);
    await db.query(
      `
          DELETE FROM links WHERE "userId"=$1 AND id=$2;
      `,
      [userId, id]
    );

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUserLinks(req, res) {
  const userId = req.params.userId;
  try {
    // const { rows } = await getUserInfoDB(userId);
    const query = `
    SELECT 
    users.id, 
    users.name, 
    COALESCE ( SUM ( links.visits ) , 0 ) AS "visitCount",
    CASE
      WHEN COUNT( links.id ) > 0
        THEN JSONB_AGG(JSONB_BUILD_OBJECT(
          'id', links.id,
          'shortUrl', links."shortUrl",
          'url', links.url,
          'visitCount', links.visits
        ))
      ELSE '[]'
    END AS "shortenedUrls"
    FROM users
      LEFT JOIN links ON users.id = links."userId"
    WHERE users.id=$1
    GROUP BY users.id, users.name;
  `;
    const { rows } = await db.query(query, [userId]);
    res.send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
