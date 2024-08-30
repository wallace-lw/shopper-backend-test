import { SqliteDocumentRepository } from "@/application/repository";
import { ListAllDocumentsUseCase } from "@/domain/usecases/get-all-documents-measures-usecases";
import { MeasureType } from "@/domain/utils";
import { ListAllDocumentsController } from "@/interface/controller/get-all-documents-measures-controller";
import { AppError } from "@/interface/helpers/errors";
import { Router } from "express";

export const listDocumentsRoute = Router();

const repository = new SqliteDocumentRepository();
const usecase = new ListAllDocumentsUseCase(repository);
const listAllDocumentsController = new ListAllDocumentsController(usecase);

listDocumentsRoute.get("/:id/list", async (request, response) => {
	try {
		const params = request.params;
		const query = request.query;
		const type =
			query.measure_type === "WATER"
				? MeasureType.WATER
				: query.measure_type === "GAS"
					? MeasureType.GAS
					: null;
		const result = await listAllDocumentsController.execute({
			customerCode: params.id,
			type,
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
