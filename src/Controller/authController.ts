import { Context } from 'koa';
import { getManager } from 'typeorm';
import User from '@/entity/user';
import jwt from 'jsonwebtoken';
import { send } from '@/utils/baseUtils';

export default class AuthController {
  // 登录Controller
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository
      .createQueryBuilder()
      .where({ username: ctx.request.body.username })
      .addSelect('User.password')
      .getOne();
    // 如果没有查询到对应用户
    if (!user) send(ctx, 40002, '用户名不存在');
    // 密码正确，签发token
    else if (user.password === ctx.request.body.password)
      send(ctx, 2000, '登录成功', {
        token: jwt.sign({ uid: user.uid }, process.env.SECRET)
      });
    // 密码错误，拒绝登录
    else send(ctx, 40003, '密码错误');
  }

  // 注册用户
  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const userInside = await userRepository
      .createQueryBuilder()
      .where({ username: ctx.request.body.username })
      .getOne();
    if (userInside) send(ctx, 40001, '当前用户名已被注册');
    else {
      const newUser = new User();
      newUser.username = ctx.request.body.username;
      newUser.phoneNumber = ctx.request.body.phoneNumber;
      /** @todo 密码需要加密储存 */
      newUser.password = ctx.request.body.password;
      // 保存到数据库
      const user = await userRepository.save(newUser);
      send(ctx, 2000, '注册成功', {
        token: jwt.sign({ uid: user.uid }, process.env.SECRET)
      });
    }
  }

  // 校验token
  public static async tokenValidate(ctx: Context) {
    // 获取请求该方法的用户
    const uid = ctx.state.user.uid;
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(uid);
    // 查询到user
    if (user) send(ctx, 2000, 'token合法', { user });
    // 查询不到user
    else send(ctx, 40005, 'token不合法或持有者已注销');
  }
}
