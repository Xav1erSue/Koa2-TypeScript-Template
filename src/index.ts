if (process.env.NODE_ENV !== 'dev') require('module-alias/register');
import path from 'path';
import dotenv from 'dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import { createConnection } from 'typeorm';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import { protectedRouter, unprotectedRouter } from '@/router';
import logger from '@/MiddleWare/logger';
import errorHandler from '@/MiddleWare/errorHandler';

// 从根目录下的 .env 文件中加载环境变量
dotenv.config({ path: '.env' });

const app = new Koa();
createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    app
      .use(errorHandler)
      .use(logger())
      .use(
        cors({
          origin: 'http://localhost:3000',
          credentials: true
        })
      )
      .use(koaStatic(path.resolve(__dirname, '../../public')))
      .use(
        koaBody({
          multipart: true,
          formidable: {
            uploadDir: path.resolve(__dirname, '../../public/uploads'),
            keepExtensions: true
          }
        })
      )
      // 无需 JWT Token 即可访问
      .use(unprotectedRouter.routes())
      // 注册 JWT 中间件
      .use(jwt({ secret: process.env.SECRET }).unless({ path: [/\..+$/] }))
      // 需要 JWT Token 才可访问
      .use(protectedRouter.routes())

      // 运行服务器
      .listen(8080, () => {
        console.log('Koa server is running at http://localhost:8080/');
      });
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
