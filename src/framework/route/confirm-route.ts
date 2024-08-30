import { SqliteDocumentRepository } from "@/application/repository";
import { UpdateDocumentValueUseCase } from "@/domain/usecases/update-document-value-usecase";
import { UpdateDocumentValueController } from "@/interface/controller/update-document-value-controller";
import { AppError } from "@/interface/helpers/errors";
import { Router } from "express";

export const confirmRoute = Router();

const repository = new SqliteDocumentRepository();
const usecase = new UpdateDocumentValueUseCase(repository);
const updateDocumentValueController = new UpdateDocumentValueController(
	usecase,
);

confirmRoute.patch("/", async (request, response) => {
	try {
		const dto = request.body;
		const result = await updateDocumentValueController.execute({
			confirmedValue: dto.confirmed_value,
			measureUuid: dto.measure_uuid,
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
