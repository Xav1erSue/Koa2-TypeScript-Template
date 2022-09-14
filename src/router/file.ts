import Router from '@koa/router';
import fileController from '@/Controller/fileController';

export const fileRoutes = new Router()
  .post('/', fileController.upload)
  .delete('/:filename', fileController.delete);
