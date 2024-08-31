import { Document } from "../../domain/entity/document";
import { DocumentRepository } from "../../domain/repository";
import { MeasureType } from "../../domain/utils";
import { prisma } from "../../framework/prisma";

export class SqliteDocumentRepository implements DocumentRepository {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async findById(id: string): Promise<any> {
		const document = await prisma.document.findUnique({
			where: { measure_uuid: id },
		});

		return document;
	}
	async findAll(
		customerCode: string,
		measureType?: MeasureType,
	): Promise<Document[]> {
		const documents = await prisma.document.findMany({
			where: {
				customer_code: customerCode,
				measure_type: measureType,
			},
		});

		return documents as unknown as Document[];
	}
	async update(
		document: Partial<Document>,
		confirmedValue: number,
	): Promise<boolean> {
		const response = await prisma.document.update({
			where: { measure_uuid: document.measureUuid },
			data: {
				measure_value: confirmedValue,
				measure_uuid: document.measureUuid,
				has_confirmed: true,
			},
		});

		if (!response) return false;

		return true;
	}
	async find(
		customerCode: string,
		type: MeasureType,
		datetime: number,
	): Promise<boolean> {
		const isExists = await prisma.document.findFirst({
			where: {
				measure_type: type,
				measure_datetime: new Date(datetime),
				customer_code: customerCode,
			},
		});

		if (!isExists) return false;

		return true;
	}
	async create(document: Document): Promise<Document> {
		const documentResponse = await prisma.document.create({
			data: {
				image_url: document.imageUrl!,
				measure_datetime: document.measureDatetime as unknown as Date,
				customer_code: document.customerCode,
				measure_type: document.measureType,
				has_confirmed: document.hasConfirmed!,
				measure_value: document.measureValue!,
				measure_uuid: document.measureUuid!,
			},
		});

		const newDocument = Document.create({
			measureValue: documentResponse.measure_value!,
			measureUuid: documentResponse.measure_uuid.toString(),
			imageUrl: documentResponse.image_url!,
			hasConfirmed: documentResponse.has_confirmed,
			measureDatetime: documentResponse.measure_datetime as unknown as number,
			measureType: documentResponse.measure_type as MeasureType,
			customerCode: documentResponse.customer_code,
			image: "",
		});
		return newDocument;
	}
}
