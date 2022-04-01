import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import User from '@/entity/user';

export default class AuthServices {
  public static async login(username: string, password: string) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository
      .createQueryBuilder()
      .where({ username })
      .addSelect('User.password')
      .getOne();
    // 如果没有查询到对应用户
    if (!user) return { code: 40002, message: '用户名不存在' };
    // 密码正确，签发token
    else if (user.password === password)
      return {
        code: 2000,
        message: '登录成功',
        data: { token: jwt.sign({ uid: user.uid }, process.env.SECRET) }
      };
    // 密码错误，拒绝登录
    else return { code: 40003, message: '密码错误' };
  }

  public static async register(
    username: string,
    phoneNumber: string,
    password: string
  ) {
    const userRepository = getManager().getRepository(User);
    const userInside = await userRepository
      .createQueryBuilder()
      .where({ username })
      .getOne();
    if (userInside) return { code: 40001, message: '当前用户名已被注册' };
    const newUser = new User();
    /* 密码需要加密储存 */
    Object.assign(newUser, { username, phoneNumber, password });
    // 保存到数据库
    const user = await userRepository.save(newUser);
    return {
      code: 2000,
      message: '注册成功',
      data: { token: jwt.sign({ uid: user.uid }, process.env.SECRET) }
    };
  }

  public static async tokenValidate(uid: string) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(uid);
    // 查询到user
    if (user)
      return {
        code: 2000,
        message: 'token合法',
        data: { user }
      };
    // 查询不到user
    else
      return {
        code: 40005,
        message: 'token不合法或持有者已注销'
      };
  }
}
