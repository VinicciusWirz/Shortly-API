import { db } from "../database/database.connection.js";

export async function userInfo(req, res) {
  const { id: userId } = res.locals.user;
  try {
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
    const userLinks = rows[0];

    res.send(userLinks);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getRanks(req, res) {
  try {
    res.send("placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
