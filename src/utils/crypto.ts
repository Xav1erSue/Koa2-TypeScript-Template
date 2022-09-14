import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const encrypt = (pwd: string) => {
  return bcrypt.hashSync(pwd, salt);
};

export const compare = (pwd: string, hash: string) => {
  return bcrypt.compareSync(pwd, hash);
};
