import cors from 'cors';
import express from 'express';
import auth from './auth';
const routes = express.Router();
routes.use('/auth',cors(), auth);
routes.get('/check',(req,res) => {
    req.body = {
        version: '1.0.0-alpha.0',
    };
    res.json(req.body);
});

export default routes;
