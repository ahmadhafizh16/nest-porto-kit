import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { GetAuthenticatedUserAction } from './Action/getAuthenticatedUser.action';
import { FindExisitingUserByEmailTask } from './Task/findExistingUserByEmail.task';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,

    // Action
    GetAuthenticatedUserAction,

    // Task
    FindExisitingUserByEmailTask,
  ],
})
export class UserModule {}
