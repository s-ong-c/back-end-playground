import crypto from 'crypto';

const SECRET_KEY: any = process.env.SECRET_KEY;

export const hash = (password: string) => {
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(password)
    .digest('hex');
};
