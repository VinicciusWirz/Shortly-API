import { db } from "../database/database.connection.js";

export function getUrlFromIdDB(id, mode) {
  const result = db.query(
    `
        SELECT 
        ${mode === "verification" ? '"userId"' : 'id, "shortUrl", url'} 
        FROM links WHERE id=$1;
    `,
    [id]
  );
  return result;
}

export function deleteUrlDB(userId, id) {
  const result = db.query(
    `
        DELETE FROM links WHERE "userId"=$1 AND id=$2;
    `,
    [userId, id]
  );
  return result;
}

export function updateVisitCountDB(shortUrl) {
  const result = db.query(
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

export function createNewShortUrlDB(userId, url, shortUrl) {
  const result = db.query(
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
