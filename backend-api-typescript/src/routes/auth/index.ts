
import express from 'express';
import * as authCtrl from './auth.ctrl';

const auth = express.Router();

auth.get('/check', authCtrl.check);
auth.post('/register', authCtrl.creatLocalAccount);
auth.post('/login', authCtrl.localLogin);
export default auth;