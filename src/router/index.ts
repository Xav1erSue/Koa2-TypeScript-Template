// 所有路由汇总到入口文件
import Router from '@koa/router';
import { login, register, tokenValidate } from './auth';
import { fileRoutes } from './file';
import { userRoutes } from './user';

// 不受保护的路由
const unprotectedRouter = new Router()
  .use('/auth', login.routes(), login.allowedMethods())
  .use('/auth', register.routes(), register.allowedMethods());

// 受保护的路由
const protectedRouter = new Router()
  .use('/auth', tokenValidate.routes(), tokenValidate.allowedMethods())
  .use('/file', fileRoutes.routes(), fileRoutes.allowedMethods())
  .use('/user', userRoutes.routes(), userRoutes.allowedMethods());

export { protectedRouter, unprotectedRouter };
