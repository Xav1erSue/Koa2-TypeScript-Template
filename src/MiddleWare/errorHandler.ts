import { Context, Next } from 'koa';
import { send } from "@/utils/baseUtils";

// 统一错误处理中间件
export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    send(ctx,40000,e.message)
  }
};
