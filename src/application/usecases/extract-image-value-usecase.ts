import { Document } from "@/domain/entity";
import { AppError } from "@/interface/helpers/errors";
import { Errors } from "@/interface/shared/Errors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import path from "node:path";

export class ExtractImageValueUseCase {
	async execute(document: Document): Promise<Document> {
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const base64Data = document.image.replace(/^data:image\/\w+;base64,/, "");
		const buffer = Buffer.from(base64Data, "base64");
		const fileName = `${Date.now()}.png`;
		const filePath = path.join("images", fileName);

		function isBase64(str: string): boolean {
			const base64Regex =
				/^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;
			return base64Regex.test(str);
		}

		if (!isBase64(base64Data)) {
			throw new AppError(Errors.INVALID_DATA, 400);
		}

		if (!base64Data) {
			throw new AppError(Errors.INVALID_DATA, 400);
		}

		const prompt =
			"Give me the total water consumption charged for this image and return this value in a number.";

		const decodedImage = {
			inlineData: {
				data: base64Data,
				mimeType: "image/png",
			},
		};

		const result = await model.generateContent([prompt, decodedImage]);

		fs.writeFile(filePath, buffer, (err) => {
			if (err) {
				return "ERROR TO LOCALE THE IMAGE";
			}
		});

		const imageUrl = `http://localhost:${process.env.PORT}/images/${fileName}`;

		return Document.create({
			...document,
			measureValue: Number(result.response.text()),
			imageUrl: imageUrl,
		});
	}
}
