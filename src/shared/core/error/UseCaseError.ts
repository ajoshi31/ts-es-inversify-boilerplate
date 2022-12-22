interface IUseCaseError {
  message: string;
  isOperational: boolean;
}

export abstract class UseCaseError implements IUseCaseError {
  public readonly message: string;
  public readonly isOperational: boolean;

  constructor(message: string, isOperational: boolean) {
    this.message = message;
    this.isOperational = isOperational;
  }
}
