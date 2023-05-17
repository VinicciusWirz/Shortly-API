import { Router } from "express";
import authValidation from "../middlewares/auth.middleware.js";
import {
  createShortenUrl,
  deleteShortenUrl,
  shortenUrlInfo,
  visitLink,
} from "../controllers/urls.controller.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlsRouter = Router();

urlsRouter.get("/urls/:id", shortenUrlInfo);
urlsRouter.get("/urls/open/:shortUrl", visitLink);
urlsRouter.post(
  "/urls/shorten",
  authValidation,
  schemaValidation(urlSchema),
  createShortenUrl
);
urlsRouter.delete("/urls/:id", authValidation, deleteShortenUrl);

export default urlsRouter;
