import { MeasureType } from "../utils/measure-type";

export type DocumentType = {
	image: string;
	customerCode: string;
	measureDatetime: number;
	measureType: MeasureType;
	hasConfirmed?: boolean;
	measureUuid?: string;
	imageUrl?: string;
	measureValue?: number;
};
