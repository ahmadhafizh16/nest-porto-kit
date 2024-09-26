/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetAuthenticatedUserAction } from './Action/getAuthenticatedUser.action';

@Injectable()
export class UserService {
  constructor(private getAuthenticatedUserAction: GetAuthenticatedUserAction) {}
  async getAuthencticatedUser(@Req() req: Request): Promise<User> {
    let user = await this.getAuthenticatedUserAction.run(req);
    return user;
  }
}
