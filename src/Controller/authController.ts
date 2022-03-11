import { Context } from 'koa';
import { getManager } from 'typeorm';
import User from '@/entity/user';
import jwt from 'jsonwebtoken';

export default class AuthController {
  // 登录Controller
  public static async login(ctx: Context) {
    try {
      const userRepository = getManager().getRepository(User);
      const user = await userRepository
        .createQueryBuilder()
        .where({ name: ctx.request.body.name })
        .addSelect('User.password')
        .getOne();

      // 如果没有查询到对应用户
      if (!user) {
        ctx.body = { code: 40002, message: '用户名不存在' };
      }
      // 密码正确，签发token
      else if (user.password === ctx.request.body.password)
        ctx.body = {
          code: 2000,
          message: '登录成功',
          token: jwt.sign({ id: user.id }, process.env.SECRET)
        };
      // 密码错误，拒绝登录
      else {
        ctx.body = { code: 40003, message: '密码错误' };
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 40000,
        message: '未知错误，请联系网站负责人'
      };
    }
  }

  // 注册用户
  public static async register(ctx: Context) {
    try {
      const userRepository = getManager().getRepository(User);
      const userInside = await userRepository
        .createQueryBuilder()
        .where({ name: ctx.request.body.name })
        .getOne();

      if (userInside) {
        ctx.body = { code: 40001, message: '当前用户名已被注册' };
        return;
      } else {
        const newUser = new User();
        newUser.name = ctx.request.body.name;
        newUser.email = ctx.request.body.email;
        newUser.phoneNumber = ctx.request.body.phoneNumber;
        /* @todo { 密码需要加密储存 } */
        newUser.password = ctx.request.body.password;
        // 保存到数据库
        const user = await userRepository.save(newUser);
        ctx.body = {
          code: 2000,
          message: '注册成功',
          token: jwt.sign({ id: user.id }, process.env.SECRET)
        };
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 40000,
        message: '未知错误，请联系网站负责人'
      };
    }
  }

  public static async tokenValidate(ctx: Context) {
    try {
      // 获取请求该方法的用户
      const uid = ctx.state.user.id;
      const userRepository = getManager().getRepository(User);
      const user = await userRepository.findOne(uid);
      // 查询到user
      if (user) {
        ctx.body = {
          code: 2000,
          message: 'token合法',
          user: user
        };
      }
      // 查询不到user
      else {
        ctx.body = {
          code: 40005,
          message: 'token不合法或持有者已注销'
        };
      }
    } catch {
      ctx.body = {
        code: 40000,
        message: '未知错误，请联系网站负责人'
      };
    }
  }
}
