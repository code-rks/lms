import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  RpcExceptionFilter,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const err = getError(exception);
    return response.status(err.statusCode).json(err);
  }
}

@Catch(ValidationError)
export class ValidationErrorFilter implements RpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    return response.status(400).json({
      statusCode: 400,
      errorType: 'ValidationErrorFilter',
      message: exception.message,
      errors: exception.errors,
    });
  }
}

export interface IExceptionType {
  statusCode: number;
  errorType: string;
  message: string;
  errors?: any;
  code?: string | number;
}
function getError(exception: MongoError): IExceptionType {
  let statusCode: number;
  let errorType: string;
  switch (exception.code) {
    case 11000:
      statusCode = 409;
      errorType = 'DuplicateEntry';
      break;
    default:
      statusCode = 500;
      errorType = 'UnknownException';
      break;
  }
  return {
    statusCode,
    errorType,
    errors: exception,
    message: exception.message,
    code: exception.code,
  };
}
