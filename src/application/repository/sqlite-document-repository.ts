import { DocumentRepository } from "@/domain/repository";

export class SqliteDocumentRepository implements DocumentRepository {
	find(id: number): Promise<Document> {
		throw new Error("Method not implemented.");
	}
	create(document: DocumentType): Promise<Document> {
		throw new Error("Method not implemented.");
	}
	update(): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<Document[]> {
		throw new Error("Method not implemented.");
	}
}
