import { Request, Response, NextFunction } from "express";
import { ResourceNotFoundError, ValidationError } from "../exception/errors";


export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const base = {
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };

  if (err instanceof ResourceNotFoundError) {
    return res.status(err.statusCode).json({
      ...base,
      status: err.statusCode,
      error: "Not Found",
      messages: [err.message],
    });
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      ...base,
      status: err.statusCode,
      error: "Bad Request",
      messages: err.details,
    });
  }

  
  console.error(err);
  return res.status(500).json({
    ...base,
    status: 500,
    error: "Internal Server Error",
    messages: [err.message ?? "Erreur inconnue"],
  });
}
