export type DocumentInputDTO = {
	image: string;
	customerCode: string;
	measureDatetime: number;
	measureType: string;
	hasConfirmed?: boolean;
	measureUuid?: string;
	imageUrl?: string;
	measureValue?: number;
};

export type DocumentOutputDTO = {
	measure_value: number;
	measure_uuid: string;
	image_url: string;
};
