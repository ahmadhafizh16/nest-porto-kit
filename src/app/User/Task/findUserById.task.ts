import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/ship/Module/prisma.service';

@Injectable()
export class FindUserByIdTask {
  constructor(private prismaService: PrismaService) {}

  /**
   * Return User model or null if user is not found.
   * @param {String} userId
   */
  async run(userId: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
