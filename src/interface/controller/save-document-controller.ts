import { SaveDocumentUseCase } from "../../domain/usecases/save-document-usecase";
import { DocumentInputDTO, DocumentOutputDTO } from "../dto/document-dto";

export class SaveDocumentController {
	constructor(private readonly saveDocumentUseCase: SaveDocumentUseCase) {}

	async execute(dto: DocumentInputDTO) {
		const response = await this.saveDocumentUseCase.execute(dto);

		const output: DocumentOutputDTO = {
			image_url: response.imageUrl!,
			measure_uuid: response.measureUuid!,
			measure_value: response.measureValue!,
		};

		return output;
	}
}
