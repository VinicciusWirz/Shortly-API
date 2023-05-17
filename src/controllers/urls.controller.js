import { db } from "../database/database.connection.js";

export async function shortenUrlInfo(req, res) {
  try {
    res.send("placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createShortenUrl(req, res) {
  try {
    res.send("placeholder");
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
