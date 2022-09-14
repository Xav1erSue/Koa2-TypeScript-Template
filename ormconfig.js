module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: process.env.NODE_ENV === 'dev' ? true : false,
  logging: false,
  entities: [
    `${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/entity/*{.ts,.js}`
  ]
};
