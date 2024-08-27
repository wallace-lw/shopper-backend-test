import { Document } from "../entity/document";
import { DocumentRepository } from "../repository/document-repository";

export class VerifyDocumentDate {
	constructor(private readonly documentRepository: DocumentRepository) {}

	async execute(documentDto: any): Promise<Document> {
		const document = await this.documentRepository.find(documentDto.id);

		return document;
	}
}
