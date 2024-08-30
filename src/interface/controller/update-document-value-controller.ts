import { UpdateInputDTO } from "@/domain/usecases/update-document-value-usecase";
import { UpdateDocumentValueUseCase } from "../../domain/usecases/update-document-value-usecase";

type UpdateOutputDTO = {
	success: boolean;
};

export class UpdateDocumentValueController {
	constructor(
		private readonly updateDocumentValueUseCase: UpdateDocumentValueUseCase,
	) {}

	async execute(dto: UpdateInputDTO) {
		const response = await this.updateDocumentValueUseCase.execute(dto);
		const output: UpdateOutputDTO = {
			success: response,
		};

		return output;
	}
}
