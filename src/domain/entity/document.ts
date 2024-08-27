import { DocumentType } from "../types";
import { MeasureType } from "../utils/measure-type";

export class Document {
	constructor(
		public readonly image: string,
		public readonly customer_code: string,
		public readonly measure_datetime: Date,
		public readonly measure_type: MeasureType,
	) {}

	public static create(document: DocumentType) {
		return new Document(
			document.image,
			document.customer_code,
			document.measure_datetime,
			document.measure_type,
		);
	}
}
