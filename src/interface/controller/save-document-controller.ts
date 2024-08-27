import { VerifyDocumentDate } from "@/domain/service";
import { DocumentDTO } from "../dto/document-dto";

export class SaveDocumentController {
	constructor(private readonly service: VerifyDocumentDate) {}

	async execute(dto: DocumentDTO) {
		const response = await this.service.execute(dto);

		return response;
	}
}
