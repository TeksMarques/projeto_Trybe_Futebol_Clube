import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Token from '../utils/token';
import ILogin from '../interfaces/ILogin';
import IToken from '../interfaces/IToken';
import UserModel from '../database/models/UserModel';

class UserService {
  protected model: ModelStatic<UserModel> = UserModel;

  async login({ email, password }: ILogin): Promise<IToken | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return undefined;

    const token = Token.build(user.email);
    return { token };
  }

  async role(email: string): Promise<string | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    return user.role;
  }
}

export default UserService;
