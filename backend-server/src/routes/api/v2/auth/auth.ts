import Router from 'koa-router';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import { validateBody } from '../../../../lib/utils';
import  User  from '../../../../entity/User';
import EmailAuth from '../../../../entity/EmailAuth';
import shortid = require('shortid');
import { createAuthEmail } from '../../../../etc/emailTemplates';

const auth = new Router();

/* LOCAL AUTH */
/* 
 POST /api/v2/auth/send-auth-email
  {
    email: string
  }
*/
auth.post('/send-auth-email', async ctx => {
    type RequestBody = {
      email: string;
    };
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
    });
    if (!validateBody(ctx, schema)) return false;
  
    const { email }: RequestBody = ctx.request.body;
  
    // find user by email
    try {
      const user = await getRepository(User).findOne({
        email
      });
      console.log("user??????",user);
      const emailAuth = new EmailAuth();
      emailAuth.code = shortid.generate();
      emailAuth.email = email;
      await getRepository(EmailAuth).save(emailAuth);
      const emailTemplate = createAuthEmail(!!user, emailAuth.code);
      ctx.body = emailTemplate;
    } catch (e) {
      ctx.throw(500, e);
    }
  });
auth.get('/code/:code', async ctx => {});
auth.post('/code-login', async ctx => {});
auth.post('/register/local', async ctx => {});

/* social Auth */
auth.post('/verify-social/:provider', async ctx => {});
auth.post('/register/:provider', async ctx => {});
auth.post('/login/:provider', async ctx => {});

/** GENERAL*/
auth.get('/check', async ctx => {});
auth.post('/logout', async ctx => {});
auth.post('/certify', async ctx => {});

export default auth;
