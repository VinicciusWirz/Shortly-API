import { db } from "../database/database.connection.js";

export async function getUrlFromIdDB(id, mode) {
  const result = await db.query(
    `
        SELECT 
        ${mode === "verification" ? '"userId"' : 'id, "shortUrl", url'} 
        FROM links WHERE id=$1;
    `,
    [id]
  );
  return result;
}

export async function deleteUrlDB(userId, id) {
  const result = await db.query(
    `
        DELETE FROM links WHERE "userId"=$1 AND id=$2;
    `,
    [userId, id]
  );
  return result;
}

export async function updateVisitCountDB(shortUrl) {
  const result = await db.query(
    `
        UPDATE links
        SET visits = visits+1
            WHERE "shortUrl"=$1
        RETURNING url;
    `,
    [shortUrl]
  );
  return result;
}

export async function createNewShortUrlDB(userId, url, shortUrl) {
  const result = await db.query(
    `
          INSERT INTO links
            ("userId", url, "shortUrl")
          VALUES
            ($1, $2, $3)
          RETURNING id;
        `,
    [userId, url, shortUrl]
  );
  return result;
}
