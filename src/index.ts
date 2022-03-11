import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import { protectedRouter, unprotectedRouter } from './router';
import { logger } from './MiddleWare/logger';
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const app = new Koa();
createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    app
      .use(logger())
      .use(
        cors({
          origin: 'http://localhost:3000',
          credentials: true,
        }),
      )
      .use(bodyParser())
      // 无需 JWT Token 即可访问
      .use(unprotectedRouter.routes())
      // 注册 JWT 中间件
      .use(jwt({secret: process.env.secret}))
      // 需要 JWT Token 才可访问
      .use(protectedRouter.routes())

      // 运行服务器
      .listen(8080, () => {
        console.log('Koa server is running at http://localhost:8080/');
      });
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
