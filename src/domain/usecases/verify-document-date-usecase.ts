import { DocumentInputDTO } from "@/interface/dto/document-dto";
import { Document } from "../entity/document";
import { DocumentRepository } from "../repository/document-repository";
import { MeasureType } from "../utils";

export class VerifyDocumentDateUseCase {
	constructor(private readonly documentRepository: DocumentRepository) {}

	async execute(documentDto: DocumentInputDTO): Promise<Document> {
		const newDocument = Document.create({
			image: documentDto.image,
			measureValue: documentDto.measureValue,
			customerCode: documentDto.customerCode,
			measureDatetime: new Date() as unknown as number,
			measureType:
				documentDto.measureType === "WATER"
					? MeasureType.WATER
					: MeasureType.GAS,
			hasConfirmed: documentDto.hasConfirmed,
			measureUuid: documentDto.measureUuid,
			imageUrl: documentDto.imageUrl,
		});

		const document = await this.documentRepository.create(newDocument);

		return document;
	}
}
