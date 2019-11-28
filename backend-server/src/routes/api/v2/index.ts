import Router from 'koa-router';
import auth from './auth/auth';
import files from './files/files';
const v2 = new Router();

v2.get('/check', ctx => {
  ctx.body = {
    version: 'v2'
  };
});

v2.use('/auth', auth.routes());
v2.use('/files', files.routes());
export default v2;
