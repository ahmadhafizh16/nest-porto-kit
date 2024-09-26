import { ApiProperty } from '@nestjs/swagger';
import { z, ZodType } from 'zod';

export class RegisterUserRequest {
  @ApiProperty({
    type: String,
    description: 'User Email',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User Name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
  })
  password: string;
}

export class RegisterUserValidation {
  static readonly RULES: ZodType = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(40),
    password: z.string().min(8).max(20),
  });
}
