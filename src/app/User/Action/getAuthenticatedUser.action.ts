import { Injectable, Req } from '@nestjs/common';
import { FindExisitingUserByEmailTask } from '../Task/findExistingUserByEmail.task';
import { User } from '@prisma/client';

@Injectable()
export class GetAuthenticatedUserAction {
  constructor(private findExisitingUserByEmailTask: FindExisitingUserByEmailTask) {}

  async run(@Req() req: Request): Promise<User> {
    let user = req['user'];
    let userModel = await this.findExisitingUserByEmailTask.run(user.email);

    return userModel;
  }
}
