import { SqliteDocumentRepository } from "@/application/repository";
import { VerifyDocumentDate } from "@/domain/service";
import { SaveDocumentController } from "@/interface/controller/save-document-controller";
import { DocumentDTO } from "@/interface/dto/document-dto";
import { Router } from "express";
import { AppRouter } from "./app-router";

export function createRoute(): AppRouter {
	const router = Router();

	const repository = new SqliteDocumentRepository();
	const service = new VerifyDocumentDate(repository);
	const saveDocumentController = new SaveDocumentController(service);

	router.post("/", async (request, response) => {
		const dto = request.body as DocumentDTO;
		const result = await saveDocumentController.execute(dto);

		return response.json(result);
	});

	return {
		path: "/confirm",
		router,
	};
}
