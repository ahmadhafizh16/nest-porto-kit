import { HashIds } from 'src/ship/Module/HashId';
import { ParentTransformer } from 'src/ship/Parent/Transformer/parentTransformer';

export class LoginTransformer extends ParentTransformer {
  transform(data: Object): Object {
    let user = data['user'];

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      last_login: user.last_login,
      access_token: data['token_data'].access_token,
      token_expires: data['token_data'].expired_at,
      company_id: HashIds.encode(user.company_id),
    };
  }
}
