import axios from 'axios';
import express from 'express';
import Joi from 'joi';
import stringify from 'json-stringify-safe';
import logger from '../../logger';
import { User } from '../../models/User';
require('dotenv').config();
export const creatLocalAccount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  type BodySchema = {
    email: string;
    password: string;
    username: string;
  };

  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required()
  });
  console.log(schema);

  const { email, password, username }: BodySchema = req.body;

  try {
    const [emailExists, usernameExists] = await Promise.all([
      User.findUser('email', email),
      User.findUser('username', username)
    ]);

    if (emailExists || usernameExists) {
      res.status(409);
      req.body = {
        name: 'DUPLICATED_ACCOUNT',
        payload: emailExists ? 'email' : 'username'
      };
      res.json(req.body);
      return;
    }
  } catch (e) {
    logger.error(e);
  }

  try {
    const hash = await User.crypt(password);
    const user: User = await User.build({
      username,
      email,
      password: hash
    }).save();

    const token: string = await user.generateToken();
    req.body = {
      //data: user.dataValues,
      user,
      token
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
): Promise<any> => {
  type BodySchema = {
    email?: string;
    password: string;
    username?: string;
  };

  const { email, username, password }: BodySchema = req.body;

  // email & username not given
  if (!(email || username)) {
    res.status(401);
    req.body = {
      name: 'LOGIN_FAILURE'
    };
    res.json(req.body);
    return;
  }
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string()
      .min(6)
      .required(),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
  });
  logger.info(schema);

  try {
    const value: any = email || username;
    const type: 'email' | 'username' = email ? 'email' : 'username';
    const user: User = await User.findUser(type, value);

    const validated: boolean = await user.validatePassword(password);
    if (!validated) {
      res.status(401);
      req.body = {
        name: 'LOGIN_FAILUREZZZ'
      };
      return;
    }
    const token: string = await user.generateToken();

    req.body = {
      user: {
        id: user.id,
        username: user.username
      },
      token
    };
    res.json(req.body);
  } catch (e) {
    logger.error('500', e);
  }
};

// 쿠키에 access_token 이 있다면, 현재 로그인된 유저의 정보를 응답
export const check = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { profile } = req.body;
  if (!profile) {
    logger.info(`${profile}null 이다`);
    return next();
  }
  res.json(profile);
};

export const durgStore = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await axios
      .get(
        'http://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList?serviceKey=' +
          process.env.API_KEY +
          '&pageNo=1&numOfRows=10&xPos=126.877916&yPos=37.481411&radius=1000'
      )
      .then(data => {
        logger.info(data);
        // const drugStore = JSON.parse(stringify(data.data.response.body.items));
        req.body = {
          Store: JSON.parse(stringify(data.data.response.body.items.item))
        };
        res.json(req.body);
      });
  } catch (err) {
    res.json(err);
  }
};
