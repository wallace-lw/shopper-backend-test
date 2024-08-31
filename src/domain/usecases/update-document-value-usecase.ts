import { AppError } from "../../interface/helpers/errors";
import { Errors } from "../../interface/shared/Errors";
import { DocumentRepository } from "../repository/document-repository";

export type UpdateInputDTO = {
	confirmedValue: number;
	measureUuid: string;
};

export class UpdateDocumentValueUseCase {
	constructor(private readonly documentRepository: DocumentRepository) {}

	async execute(dto: UpdateInputDTO) {
		const response = await this.documentRepository.findById(dto.measureUuid);
		if (!response) {
			throw new AppError(Errors.MEASURE_NOT_FOUND, 404);
		}
		if (response.has_confirmed) {
			throw new AppError(Errors.CONFIRMATION_DUPLICATE, 409);
		}
		const output = await this.documentRepository.update(
			{
				measureUuid: dto.measureUuid,
			},
			dto.confirmedValue,
		);

		return output;
	}
}
