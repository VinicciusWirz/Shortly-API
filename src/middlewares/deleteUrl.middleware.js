import { db } from "../database/database.connection.js";

export async function deleteUrlMiddleware(req, res, next) {
  const userId = res.locals.user.id;
  const id = req.params.id;
  try {
    const { rows, rowCount } = await db.query(
      `
            SELECT "userId" FROM links WHERE id=$1;
        `,
      [id]
    );
    if (!rowCount) return res.sendStatus(404);
    if (rows[0].userId !== userId) return res.sendStatus(401);

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
