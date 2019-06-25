import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import logger from 'koa-logger';
import routes from './routes';
import schema from './graphql/schema';

const app = new Koa();
/* setup middlewares */
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());
if (process.env.NODE_ENV === 'development') {
    app.use(logger());
}
const apollo = new ApolloServer({
    schema,
    context: ({ctx}: {ctx:  Context}) => {
        const { authorization }  = ctx.request.headers;
        if (!authorization) {
            return {};
        }
        const sp = authorization.split(' ');
        return {
            user_id: sp[1] 
        };
    }
});
apollo.applyMiddleware({app});

/**
 * initial tasks except Koa middlewares;
 */
async function initalize(){
 try {
    await createConnection();
    console.log('Postgres RDBMS connection is establishde');
 } catch (e){
    console.log(e);
 }
}
initalize();

export default app;