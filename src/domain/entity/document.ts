import { DocumentType } from "../types";
import { MeasureType } from "../utils/measure-type";

export class Document {
	private constructor(
		public readonly image: string,
		public readonly customerCode: string,
		public readonly measureDatetime: number,
		public readonly measureType: MeasureType,
		public readonly hasConfirmed?: boolean,
		public readonly measureUuid?: string,
		public readonly imageUrl?: string,
		public readonly measureValue?: number,
	) {}

	public static create(document: DocumentType) {
		return new Document(
			document.image,
			document.customerCode,
			document.measureDatetime,
			document.measureType,
			document.hasConfirmed,
			document.measureUuid,
			document.imageUrl,
			document.measureValue,
		);
	}
}
