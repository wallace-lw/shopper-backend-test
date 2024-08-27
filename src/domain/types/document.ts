import { MeasureType } from "../utils/measure-type";

export type DocumentType = {
	image: string;
	customer_code: string;
	measure_datetime: Date;
	measure_type: MeasureType;
};
