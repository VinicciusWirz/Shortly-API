import { db } from "../database/database.connection.js";

export async function getUserInfoDB(userId) {
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
  const result = await db.query(query, [userId]);
  return result;
}

export async function getRanksDB() {
  const result = await db.query(
    `
      SELECT 
        users.id,
        users.name,
        COUNT (links.id) AS "linksCount",
        COALESCE (SUM (links.visits) , 0 ) AS "visitCount"
      FROM users
      LEFT JOIN links ON links."userId" = users.id
      GROUP BY users.id
      ORDER BY "visitCount" DESC, "linksCount" DESC
      LIMIT 10
    ;`
  );
  return result;
}
