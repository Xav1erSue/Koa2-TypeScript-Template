import { getManager } from 'typeorm';
import User from '@/entity/user';
import { Code } from '../code';

export default class UserServices {
  public static async getUserInfo(uid: string) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(uid);
    if (!user) {
      return {
        code: Code.USER_NOT_FOUND,
        message: '用户不存在或token过期！'
      };
    }
    return {
      code: Code.SUCCESS,
      message: '获取用户信息成功',
      data: { user }
    };
  }

  public static async updateUserInfo(
    uid: string,
    userInfo: {
      nickname?: string;
      avatar?: string;
      birthday?: string;
      sex?: boolean;
    }
  ) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(uid);
    if (!user) {
      return {
        code: Code.USER_NOT_FOUND,
        message: '用户不存在或token过期！'
      };
    }
    const { nickname, avatar, birthday, sex } = userInfo;
    Object.assign(user, { nickname, avatar, birthday, sex });
    const result = await userRepository.save(user);
    return {
      code: Code.SUCCESS,
      message: '更新用户信息成功',
      data: { user: result }
    };
  }
}
