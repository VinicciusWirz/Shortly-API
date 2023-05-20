import { Router } from "express";
import authValidation from "../middlewares/auth.middleware.js";
import {
  createShortenUrl,
  deleteShortenUrl,
  getUserLinks,
  shortenUrlInfo,
  visitLink,
} from "../controllers/urls.controller.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import { deleteUrlMiddleware } from "../middlewares/deleteUrl.middleware.js";

const urlsRouter = Router();

urlsRouter.get("/urls/:id", shortenUrlInfo);
urlsRouter.get("/urls/user/:userId", getUserLinks);
urlsRouter.get("/urls/open/:shortUrl", visitLink);
urlsRouter.post(
  "/urls/shorten",
  authValidation,
  schemaValidation(urlSchema),
  createShortenUrl
);
urlsRouter.delete("/urls/:id", authValidation, deleteUrlMiddleware, deleteShortenUrl);

export default urlsRouter;
