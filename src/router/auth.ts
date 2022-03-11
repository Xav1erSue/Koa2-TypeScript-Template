import Router from '@koa/router';

import AuthController from '../Controller/authController';

const login = new Router()
  .post('/login', AuthController.login);

const register = new Router()
  .post('/register', AuthController.register);

const tokenValidate = new Router()
  .post('/validate', AuthController.tokenValidate);

export { login, register, tokenValidate };
