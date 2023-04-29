import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidArgumentException extends HttpException {
  constructor(argumentName: string) {
    super(`Invalid Argument. Name: ${argumentName}`, HttpStatus.FORBIDDEN);
  }
}
