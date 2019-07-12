import Koa, { Middleware } from 'koa';

const app = new Koa();

const ssr: Middleware = async ctx => {

};
app.listen(5000, () => {
    console.log('SSR server listening to http://localhost:5000')
})
