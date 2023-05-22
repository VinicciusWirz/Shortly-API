import { getUserIdFromUrlDB } from "../repositories/urls.repository.js";

export async function deleteUrlMiddleware(req, res, next) {
  const userId = res.locals.user.id;
  const id = req.params.id;
  try {
    const { rows, rowCount } = await getUserIdFromUrlDB(id);
    if (!rowCount) return res.sendStatus(404);
    if (rows[0].userId !== userId) return res.sendStatus(401);

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
