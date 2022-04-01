# Koa2 TS Template

---

> 基于 TypeScript 的 Koa2 后端脚手架，集成 ESlint、Prettier、TypeORM、PM2等库在内

## Quick Strat

```bash
yarn 
```

&

```bash
yarn start
```

## Build

```bash
yarn build
```

## Production

```bash
yarn pro
```

```bash
yarn stop
```

> 生产环境使用pm2实现负载均衡


| 响应码   | 信息            |
|-------|---------------|
| 2000  | 一切正常          |
| 40000 | 未知错误，请联系网站负责人 |
| 40001 | 查询项命名重复       |
| 40002 | 查询项不存在        |
| 40003 | 密码错误          |
| 40004 | 没有权限访问该内容     |
| 40005 | token 不合法或已过期 |
| 40006 | 短信验证码错误       |
| 40007 | 短信验证码发送过于频繁   |
