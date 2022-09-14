import Router from '@koa/router';

import UserController from '../Controller/userController';

const userRoutes = new Router()
  .get('/', UserController.getUserInfo)
  .post('/update', UserController.updateUserInfo);

export { userRoutes };
