import { NextFunction, Request, Response } from "express";

import { AppError } from "./app-error";

export function errorHandler(
	err: Error,
	_request: Request,
	response: Response,
	_next: NextFunction,
) {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({ message: err.message });
	}
	return response.status(500).json({
		status: "Error",
		message: `Internal server error: ${err.message}`,
	});
}
