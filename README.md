# Koa2 TS Template

> 基于 TypeScript 的 Koa2 后端脚手架，集成 ESlint、Prettier、TypeORM、PM2等库在内

## Quick Strat

```bash
yarn
```

> 本地需要配置 `.env`文件

```bash
yarn start
```

文件接口将文件储存在本地，需要自行建立文件夹

```
Serve
 ├── Koa2-TypeScript-Template
 │	├── src
 │	├── ...
 │	└── README.md
 └── public # 自行建立
    └── uploads # 自行建立
      	└── ...png # 上传的文件会放到这里
```

## Build

```bash
yarn build
```

## Production

### 启动服务

```bash
yarn pro
```

### 查看日志

```bash
pm2 logs -f
```

### 关停服务

```bash
yarn stop
```

