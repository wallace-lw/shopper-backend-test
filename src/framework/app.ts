import { routes } from "./route";
import { errorHandler } from "../interface/helpers/errors";
import express from "express";
import fs from "node:fs";
import path from "node:path";

class App {
	public server;
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}
	middlewares() {
		this.server.use(express.json({ limit: "10mb" }));
		this.server.use(
			express.urlencoded({
				extended: true,
				limit: "10mb",
			}),
		);
		const imagesDir = path.join("images");

		if (!fs.existsSync(imagesDir)) {
			fs.mkdirSync(imagesDir);
		}
		this.server.use("images", express.static(path.join("images")));

		this.server.use(errorHandler);
	}
	routes() {
		this.server.use("/", routes);
	}
}
export default new App().server;
