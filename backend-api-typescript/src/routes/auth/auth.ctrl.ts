import express from 'express';
import Joi from 'joi';
import logger from '../../logger';
import { User } from '../../models/User';

export const creatLocalAccount = async ( 
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
    ) => {
        type BodySchema = {
            email: string,
            password: string,
            username: string
          };
          
         const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            username: Joi.string().alphanum().min(3).max(20)
              .required(),
          });
        console.log(schema);
        //   const result: any = Joi.validate(req.body, schema);

        //   if (result.error) {
        //     res.status(400);
        //     req.body = {
        //       name: 'WRONG_SCHEMA',
        //       payload: result.error,
        //     };
        //     res.json(req.body);
        //     return;
        //   }

        const { 
            email, 
            password, 
            username 
        }: BodySchema 
        = (req.body);

        try {
            const [emailExists, usernameExists] = await Promise.all([
            User.findUser('email', email),
            User.findUser('username', username),
            ]);

            if (emailExists || usernameExists) {
            res.status(409);
            req.body = {
                name: 'DUPLICATED_ACCOUNT',
                payload: emailExists ? 'email' : 'username',
            };
            res.json(req.body);
            return;
            }
        } catch (e) {
            logger.error(e);
        }


        try {
            const hash = await User.crypt(password);
            const user:User = await User.build({
              username,
              email,
              password: hash,
            }).save();

            const token: string = await user.generateToken();
            req.body = {
              //data: user.dataValues,
              user,
              token,
            };
            res.json(req.body);
        
          } catch (e) {
             logger.error(e);
          }
    };
export const localLogin = async (
     req: express.Request,
     res: express.Response,
     next: express.NextFunction
        ): Promise<any> => 
        {
            type BodySchema = {
                email?: string,
                password: string,
                username?: string
                    };
            
    const { email, username, password}: BodySchema = (req.body);
        
        // email & username not given
        if(!(email || username)){
            res.status(401);
            req.body={
              name: 'LOGIN_FAILURE',
            };
            res.json(req.body);
            return;
        }
        const schema = Joi.object().keys({
          email: Joi.string().email(),
          password: Joi.string().min(6).required(),
          username: Joi.string().alphanum().min(3).max(20),
        });
        logger.info(schema);
        // somehow wrong schema
        // const result: any = Joi.validate(req.body, schema);
        // if( result.error){
        //   res.status(401);
        //   req.body = {
        //     name: 'LOGIN_FAILURE',
        //   };
        //   return  res.json(req.body); 
        // }
      
        try {
          const value: any = email || username;
          const type: ('email' | 'username') = email ? 'email': 'username';
          const user: User = await User.findUser(type, value);
        //   if(!user){
        //     res.status(401);
        //     req.body= {
        //       name: 'LOGIN_FAILURE11',
        //     };
        //     res.json(req.body);
        //     return;
        //   }
          
          const validated: boolean = await user.validatePassword(password);
          if(!validated){
            res.status(401);
            req.body= {
              name: 'LOGIN_FAILUREZZZ',
            };
            return;
          }
          const token: string= await user.generateToken();
      
          // set-cookie
          // $flowFixme: intersection bug
        //   req.cookies.set('token',token,{
        //     httpOnly:true,
        //     maxAge: 1000
        //   });

          req.body ={
            user: {
              id: user.id,
              username: user.username,
            },
            token
          };
          res.json(req.body);
        }catch(e){
            logger.error("500", e);
        }
      
    };

      
// 쿠키에 access_token 이 있다면, 현재 로그인된 유저의 정보를 응답
export const check = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { profile } = req.body;
    if (!profile) {
        logger.info(`${profile}null 이다`);
      return next();
    }
    res.json(profile);
    
  };

