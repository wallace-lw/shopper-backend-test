import { AppError } from "../../interface/helpers/errors";
import { Errors } from "../../interface/shared/Errors";
import { DocumentRepository } from "../repository";
import { MeasureType } from "../utils";

export type ListAllInputDTO = {
	customerCode: string;
	type?: MeasureType | null;
};

export class ListAllDocumentsUseCase {
	constructor(private readonly documentRepository: DocumentRepository) {}

	async execute(dto: ListAllInputDTO) {
		const response = await this.documentRepository.findAll(
			dto.customerCode,
			dto.type as MeasureType,
		);

		if (!response) {
			throw new AppError(Errors.MEASURES_NOT_FOUND, 404);
		}

		const output = {
			customer_code: dto.customerCode,
			measures: response,
		};

		return output;
	}
}
