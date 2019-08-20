import Router from 'koa-router';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import { validateBody } from '../../../../lib/utils';
import  User  from '../../../../entity/User';
import EmailAuth from '../../../../entity/EmailAuth';
import shortid = require('shortid');
import { createAuthEmail } from '../../../../etc/emailTemplates';
import sendMail from '../../../../lib/sendMail';
import { generateToken, decodeToken, setTokenCookie } from '../../../../lib/token';
import UserProfile from '../../../../entity/UserProfile';
const auth = new Router();

/* LOCAL AUTH */
/* 
 POST /api/v2/auth/send-auth-email
  {
    email: string
  }
*/
auth.post('/sendmail', async ctx => {
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

      // create email
      const emailAuth = new EmailAuth();
      emailAuth.code = shortid.generate();
      emailAuth.email = email;
      await getRepository(EmailAuth).save(emailAuth);
      const emailTemplate = createAuthEmail(!!user, emailAuth.code);
      ctx.body = {
        registered: !!user,
      };
      // send email
      setImmediate(() => {
        sendMail({
          to: email,
          ...emailTemplate,
          from: 'verification@songc.io'
        });
      })
    } catch (e) {
      ctx.throw(500, e);
    }
  });
auth.get('/code/:code', async ctx => {
    const { code }: {code: string} = ctx.params;
    try {
      const emailAuth = await getRepository(EmailAuth).findOne({
        code,
      });
      if (!emailAuth){
        ctx.status = 404;
        return;
      }

      // check date expire
      const now = new Date().getTime();
      const diff = now - new Date(emailAuth.created_at).getTime();
      if (diff > 1000 * 60 * 60 * 24) {
        ctx.status = 410;
        ctx.body = {
          name: 'EXPIRED_CODE'
        };
        return;
      }
      const { email } = emailAuth;
      // check user with code 
      const user = await getRepository(User).findOne({
        email,
      });

      if (!user) {
        // generate register token
        const registerToken = await generateToken(
          {
          email,
          id: emailAuth.id
          }, 
          { expiresIn: '1h', subject: 'email-register'}
        );
        ctx.body = {
          email,
          register_token: registerToken
        };
      } else {
        // generate user token
        const profile = await getRepository(UserProfile).findOne({
          fk_user_id: user.id
        });
        if (!profile) return;
        const tokens = await user.generateUserToken();
        setTokenCookie(ctx, tokens);
        emailAuth.logged = true;
        ctx.body = {
          ...user,
          profile,
          tokens: {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
          }
        };
        setImmediate(() => {
          getRepository(EmailAuth).save(emailAuth);
        });
      }
    } catch (e) {}
});
auth.post('/code-login', async ctx => {});
  auth.post('/register/local', async ctx => {
    type RequestBody = {
      register_token: string;
      form: {
        display_name: string;
        username: string;
        short_bio: string;
      };
    };
  
    type RegisterToken = {
      email: string;
      id: string;
      sub: string;
    };
  
    const schema = Joi.object().keys({
      register_token: Joi.string().required(),
      form: Joi.object()
        .keys({
          display_name: Joi.string()
            .min(1)
            .max(45)
            .required(),
          username: Joi.string()
            .regex(/^[a-z0-9-_]+$/)
            .min(3)
            .max(16)
            .required(),
          short_bio: Joi.string()
            .allow('')
            .max(140)
        })
        .required()
    });
  
    if (!validateBody(ctx, schema)) return;
  
    const {
      register_token,
      form: { username, short_bio, display_name }
    }: RequestBody = ctx.request.body;
  
    // check token
    let decoded: RegisterToken | null = null;
    try {
      decoded = await decodeToken<RegisterToken>(register_token);
      if (decoded.sub !== 'email-register') {
        ctx.status = 400;
        ctx.body = {
          name: 'INVALID_TOKEN'
        };
        return;
      }
    } catch (e) {
      ctx.body = {
        name: 'INVALID_TOKEN'
      };
      return;
    }
  
    // check duplicates
    const { email, id: codeId } = decoded;
    const exists = await getRepository(User)
      .createQueryBuilder()
      .where('email = :email OR username = :username', { email, username })
      .getOne();
    if (exists) {
      ctx.status = 409;
      ctx.body = {
        name: 'ALREADY_EXISTS',
        payload: email === exists.email ? 'email' : 'username'
      };
      return;
    }
  
    // disable code
    const emailAuthRepo = getRepository(EmailAuth);
    const emailAuth = await emailAuthRepo.findOne(codeId);
    if (emailAuth) {
      emailAuth.logged = true;
      await emailAuthRepo.save(emailAuth);
    }
  
    // create user
    const userRepo = getRepository(User);
    const user = new User();
    user.email = email;
    user.is_certified = true;
    user.username = username;
    await userRepo.save(user);
  
    const profile = new UserProfile();
    profile.fk_user_id = user.id;
    profile.display_name = display_name;
    profile.short_bio = short_bio;
    await getRepository(UserProfile).save(profile);
  
    const tokens = await user.generateUserToken();
    setTokenCookie(ctx, tokens);
    ctx.body = {
      ...user,
      profile,
      tokens: {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }
    };
  });

/* social Auth */
auth.post('/verify-social/:provider', async ctx => {});
auth.post('/register/:provider', async ctx => {});
auth.post('/login/:provider', async ctx => {});

/** GENERAL*/
auth.get('/check', async ctx => {
  ctx.body = { user_id: ctx.state.user_id };
});
auth.post('/logout', async ctx => {
  // clears cookies
  ctx.cookies.set('access_token', undefined, {
    domain: process.env.NODE_ENV === 'development' ? undefined : '.songc.io'
  });
  ctx.cookies.set('refresh_token', undefined, {
    domain: process.env.NODE_ENV === 'development' ? undefined : '.songc.io'
  });
  ctx.status = 204;
});
auth.post('/certify', async ctx => {});

export default auth;
