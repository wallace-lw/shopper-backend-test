import { Document } from "../entity";
import { MeasureType } from "../utils";

export interface DocumentRepository {
	create(document: Document): Promise<Document>;
	find(
		customerCode: string,
		type: MeasureType,
		datetime: number,
	): Promise<boolean>;
	update(document: Partial<Document>, confirmedValue: number): Promise<boolean>;
	// biome-ignore lint/suspicious/noExplicitAny: <>
	findById(id: string): Promise<any>;
	findAll(customerCode: string, measureType?: MeasureType): Promise<Document[]>;
}
