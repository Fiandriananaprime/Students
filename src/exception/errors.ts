export class ResourceNotFoundError extends Error {
  public readonly statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
  }
}
export class Unauthorized extends Error {
  public readonly statusCode = 403;

  constructor(message:string) {
    super(message);
    this.name= "Ressource Forbidden"
  }
}
export class ValidationError extends Error {
  public readonly statusCode = 400;
  public readonly details: string[];

  constructor(details: string[]) {
    super("Erreur de validation");
    this.name = "ValidationError";
    this.details = details;
  }
}
