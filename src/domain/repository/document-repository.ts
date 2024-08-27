export interface DocumentRepository {
	create(document: DocumentType): Promise<Document>;
	update(id: number, document: Partial<Document>): Promise<boolean>;
	find(id: number): Promise<Document>;
	findAll(customerCode: number): Promise<Document[]>;
}
