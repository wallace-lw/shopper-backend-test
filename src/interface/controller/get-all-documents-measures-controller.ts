import {
	ListAllDocumentsUseCase,
	ListAllInputDTO,
} from "../../domain/usecases/get-all-documents-measures-usecases";
import { MeasureType } from "../../domain/utils";
import { AppError } from "../helpers/errors";
import { Errors } from "../shared/Errors";

export class ListAllDocumentsController {
	constructor(
		private readonly listAllDocumentsUseCase: ListAllDocumentsUseCase,
	) {}

	async execute(dto: ListAllInputDTO) {
		if (!dto.customerCode) {
			throw new AppError(Errors.CUSTOMER_CODE_REQUIRED, 400);
		}

		if (
			dto.type &&
			!Object.values(MeasureType).includes(dto.type as MeasureType)
		) {
			throw new AppError(Errors.INVALID_TYPE, 400);
		}

		const response = await this.listAllDocumentsUseCase.execute(dto);

		return response;
	}

	private isEnumValuePresent(obj: string, enumType: MeasureType) {
		return Object.values(enumType).includes(obj);
	}
}
