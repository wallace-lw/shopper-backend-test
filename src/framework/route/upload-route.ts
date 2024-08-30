import { SqliteDocumentRepository } from "@/application/repository";
import { ExtractImageValueUseCase } from "@/application/usecases";
import { SaveDocumentUseCase } from "@/domain/usecases";
import { SaveDocumentController } from "@/interface/controller/save-document-controller";
import { AppError } from "@/interface/helpers/errors";
import { Router } from "express";

export const uploadRoute = Router();

const repository = new SqliteDocumentRepository();
const extract = new ExtractImageValueUseCase();
const service = new SaveDocumentUseCase(repository, extract);
const saveDocumentController = new SaveDocumentController(service);

uploadRoute.post("/", async (request, response) => {
	try {
		const dto = request.body;
		const result = await saveDocumentController.execute({
			customerCode: dto.customer_code,
			image: dto.image,
			measureDatetime: dto.measure_datetime,
			measureType: dto.measure_type,
			hasConfirmed: false,
		});

		return response.json(result);
	} catch (err) {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({ error: err.message });
		}
		return response.status(500).json({
			status: "Error",
			message: `Internal server error: ${err}`,
		});
	}
});
