import express from 'express';
import logger from '../../logger';

   
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

