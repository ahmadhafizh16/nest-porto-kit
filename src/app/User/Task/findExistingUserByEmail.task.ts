import { Global, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserTransformer } from 'src/app/User/Transformer/user.transformer';
import { HttpNotFoundException } from 'src/ship/Exception/httpNotFound.exception';
import { PrismaService } from 'src/ship/Module/prisma.service';

@Global()
@Injectable()
export class FindExisitingUserByEmailTask {
  constructor(private prismaService: PrismaService) {}

  /**
   * Return User model or null if user is not found.
   * @param {String} email
   */
  async run(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
