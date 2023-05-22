import { nanoid } from "nanoid";
import {
  createNewShortUrlDB,
  deleteUrlDB,
  getUrlFromIdDB,
  updateVisitCountDB,
} from "../repositories/urls.repository.js";
import { getUserInfoDB } from "../repositories/users.repository.js";

export async function shortenUrlInfo(req, res) {
  const id = req.params.id;
  try {
    const { rows, rowCount } = await getUrlFromIdDB(id);

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
    const { rows } = await createNewShortUrlDB(user.id, url, shortUrl);

    const body = { id: rows[0].id, shortUrl };
    res.status(201).send(body);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function visitLink(req, res) {
  const shortUrl = req.params.shortUrl;
  try {
    const { rows, rowCount } = await updateVisitCountDB(shortUrl);
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
    await deleteUrlDB(userId, id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUserLinks(req, res) {
  const userId = req.params.userId;
  try {
    const { rows } = await getUserInfoDB(userId);
    res.send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
