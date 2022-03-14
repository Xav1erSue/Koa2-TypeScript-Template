import { Context } from 'koa';

export const send = (
  ctx: Context,
  code: number,
  message: string,
  data?: object,
  total?: number,
  page?: number
) => {
  ctx.body = {
    code,
    message,
    data,
    total,
    page
  };
};
