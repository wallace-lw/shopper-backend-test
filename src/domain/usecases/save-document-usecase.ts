import { ExtractImageValueUseCase } from "../../application/usecases";
import { DocumentInputDTO } from "../../interface/dto/document-dto";
import { AppError } from "../../interface/helpers/errors";
import { Errors } from "../../interface/shared/Errors";
import { Document } from "../entity/document";
import { DocumentRepository } from "../repository/document-repository";
import { MeasureType } from "../utils";

export class SaveDocumentUseCase {
	constructor(
		private readonly documentRepository: DocumentRepository,
		private readonly extractImageValueUseCase: ExtractImageValueUseCase,
	) {}

	async execute(dto: DocumentInputDTO): Promise<Document> {
		const exists = await this.documentRepository.find(
			dto.customerCode,
			dto.measureType as MeasureType,
			dto.measureDatetime,
		);

		if (exists) {
			throw new AppError(Errors.DOUBLE_REPORT, 409);
		}

		const newDocument = Document.create({
			image: dto.image,
			measureValue: dto.measureValue,
			customerCode: dto.customerCode,
			measureDatetime: new Date(dto.measureDatetime) as unknown as number,
			measureType:
				dto.measureType === "WATER" ? MeasureType.WATER : MeasureType.GAS,
			hasConfirmed: dto.hasConfirmed,
			measureUuid: dto.measureUuid,
			imageUrl: dto.imageUrl,
		});

		const analyzedDocument =
			await this.extractImageValueUseCase.execute(newDocument);

		const document = await this.documentRepository.create(analyzedDocument);

		return document;
	}
}
