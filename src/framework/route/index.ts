import { Router } from "express";
import { confirmRoute } from "./confirm-route";
import { listDocumentsRoute } from "./list-route";
import { uploadRoute } from "./upload-route";

export const routes = Router();

routes.use("/upload", uploadRoute);
routes.use("/confirm", confirmRoute);
routes.use("/", listDocumentsRoute);
