import { HttpException } from '@nestjs/common';

export class ModelUpdateFailedException extends HttpException {
  constructor(message?: string) {
    super(message || 'Failed to update resource', 400);
  }
}
