import { Context } from 'koa';
import AuthServices from '../Services/authServices';

export default class AuthController {
  // 登录Controller
  public static async login(ctx: Context) {
    const { username, password } = ctx.request.body;
    const result = await AuthServices.login(username, password);
    ctx.body = result;
  }

  // 注册用户
  public static async register(ctx: Context) {
    const { username, phoneNumber, password } = ctx.request.body;
    const result = await AuthServices.register(username, phoneNumber, password);
    ctx.body = result;
  }

  // 校验token
  public static async tokenValidate(ctx: Context) {
    // 获取请求该方法的用户
    const uid = ctx.state.user.uid;
    const result = await AuthServices.tokenValidate(uid);
    ctx.body = result;
  }
}
