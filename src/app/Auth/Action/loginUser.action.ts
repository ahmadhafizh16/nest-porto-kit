import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindExisitingUserByEmailTask } from '../../User/Task/findExistingUserByEmail.task';
import { LoginUserRequest } from '../Request/loginUser.request';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUserAction {
  constructor(
    private findExistingUserByEmailTask: FindExisitingUserByEmailTask,
    private jwtService: JwtService,
  ) {}

  async run(request: LoginUserRequest): Promise<Object> {
    let { email, password } = request;

    let user = await this.findExistingUserByEmailTask.run(email);

    if (!user) {
      throw new HttpException('Wrong email or password.', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Wrong email or password.', HttpStatus.BAD_REQUEST);
    }

    let token = await this.jwtService.signAsync({ email: user.email, role: user.role, id: user.id });
    let tokenData = await this.jwtService.decode(token);

    return {
      user: user,
      token_data: {
        access_token: token,
        created_at: tokenData.iat,
        expired_at: tokenData.exp,
        company_id: user.company_id,
      },
    };
  }
}
