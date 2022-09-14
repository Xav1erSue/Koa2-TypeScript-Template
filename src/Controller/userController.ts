import { Context } from 'koa';
import UserServices from '@/Services/userServices';

export default class UserController {
  public static async getUserInfo(ctx: Context) {
    // 获取请求该方法的用户
    const uid = ctx.state.user.uid;
    const result = await UserServices.getUserInfo(uid);
    ctx.body = result;
  }

  public static async updateUserInfo(ctx: Context) {
    // 获取请求该方法的用户
    const uid = ctx.state.user.uid;
    const userInfo = ctx.request.body;
    const result = await UserServices.updateUserInfo(uid, userInfo);
    ctx.body = result;
  }
}
