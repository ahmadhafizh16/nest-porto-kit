import { User } from '@prisma/client';
import { HashIds } from 'src/ship/Module/HashId';
import { ParentTransformer } from 'src/ship/Parent/Transformer/parentTransformer';

export class UserTransformer extends ParentTransformer {
  transform(user: User): Object {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      last_login: user.last_login,
      company_id: user.company_id,
    };
  }
}
