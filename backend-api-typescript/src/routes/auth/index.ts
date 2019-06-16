
import express from 'express';
import * as authCtrl from './auth.ctrl';

const auth = express.Router();

auth.get('/check', authCtrl.check);

export default auth;