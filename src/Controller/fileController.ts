import { Context } from 'koa';
import path from 'path';
import { unlink } from 'fs';
import { Code } from '../code';

export default class FileController {
  // 上传图片
  public static async upload(ctx: Context) {
    const files = ctx.request.files.file;
    let url;
    if (files instanceof Array) {
      url = files.map(
        file =>
          `${
            process.env.NODE_ENV === 'dev'
              ? process.env.DEV_URL
              : process.env.PRO_URL
          }/uploads/${path.basename(file.filepath)}`
      );
    } else
      url = [
        `${
          process.env.NODE_ENV === 'dev'
            ? process.env.DEV_URL
            : process.env.PRO_URL
        }/uploads/${path.basename(files.filepath)}`
      ];
    ctx.body = {
      code: Code.SUCCESS,
      message: '上传成功',
      data: {
        url
      }
    };
  }

  // 删除图片
  public static async delete(ctx: Context) {
    const fileName = ctx.params.filename;
    const filePath = path.resolve(__dirname, '../../../public/uploads');
    unlink(`${filePath}/${fileName}`, error => {
      if (error) console.log(error.message);
    });
    ctx.body = {
      code: Code.SUCCESS,
      message: '删除成功'
    };
  }
}
