const env = process.env.NODE_ENV;

module.exports = {
  type: 'mysql',
  host: `${env === 'dev' ? '127.0.0.1' : process.env.HOST}`,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [`${env === 'dev' ? 'src' : 'dist'}/entity/*{.ts,.js}`],
};
