import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid Credentials Provided', HttpStatus.FORBIDDEN);
  }
}

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Either Token Invalid or Expired', HttpStatus.FORBIDDEN);
  }
}

export class TokenNotFoundException extends HttpException {
  constructor() {
    super('Token not present in request', HttpStatus.BAD_REQUEST);
  }
}
