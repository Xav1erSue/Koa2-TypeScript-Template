import { Context, Next } from 'koa';

// 统一错误处理中间件
export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    ctx.body = {
      code: 40000,
      message: e.message
    };
  }
};
