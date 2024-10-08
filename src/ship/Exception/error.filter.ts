import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        message: exception.message,
      });
    } else if (exception instanceof ZodError) {
      response.status(422).json({
        message: 'Validation Error',
        errors: exception.errors,
      });
    } else {
      response.status(400).json({
        errors: exception.message,
      });
    }
  }
}
