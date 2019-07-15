import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Koa, { Middleware } from 'koa';
import { StaticRouter } from 'react-router';
import App from './App';

const app = new Koa();

const ssr: Middleware = async ctx => {
    const context =  {};
    const rendered = ReactDOMServer.renderToString(
        <StaticRouter location={ctx.url} context={context}>
            <App />
        </StaticRouter>,
    );
    ctx.body = rendered;
};
app.use(ssr);
app.listen(5000, () => {
    console.log('SSR server listening to http://localhost:5000')
})
