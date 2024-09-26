import { CallHandler, ExecutionContext, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HashIds } from '../Module/HashId';
import { get, has, isArray, set } from 'lodash';

export class HashIdsMeta {
  varName: string;
  location?: 'body' | 'params' | 'query';
  optional?: boolean;
}
export class ParseHashIdsInterceptors implements NestInterceptor {
  constructor(private variables: Array<HashIdsMeta> | HashIdsMeta) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();
    if (isArray(this.variables)) {
      const self = this;
      this.variables.forEach(function (item) {
        if (!item.location) {
          item.location = 'body';
        }

        if (!item.optional) {
          item.optional = false;
        }

        self.decoder(request, item);
        self.checker(request, item);
      });
    } else {
      if (!this.variables.location) {
        this.variables.location = 'body';
      }

      if (!this.variables.optional) {
        this.variables.optional = false;
      }

      this.decoder(request, this.variables);
      this.checker(request, this.variables);
    }

    return next.handle();
  }

  private decoder(request, item) {
    if (has(request[item.location], item.varName)) {
      const value = get(request[item.location], item.varName);
      set(request[item.location], item.varName, HashIds.decode(value));
    }
  }

  private checker(request: any, item: any): void {
    if (!has(request[item.location], item.varName) && !item.optional) {
      throw new HttpException('Invalid encoded id', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
