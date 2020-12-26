import { createHash } from 'crypto';

export default {
  jwt: {
    secret: createHash('md5')
      .update(process.env.SECRET || '')
      .digest('hex'),
    expiresIn: '1d',
  },
};
