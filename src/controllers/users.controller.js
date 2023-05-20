import { getRanksDB, getUserInfoDB } from "../repositories/users.repository.js";

export async function userInfo(req, res) {
  const { id: userId } = res.locals.user;
  try {
    const { rows } = await getUserInfoDB(userId);

    const userLinks = rows[0];

    res.send(userLinks);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getRanks(req, res) {
  try {
    const { rows } = await getRanksDB();
    res.send(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
