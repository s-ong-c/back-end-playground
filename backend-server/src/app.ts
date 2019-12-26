import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import logger from 'koa-logger';
import routes from './routes';
import schema from './graphql/schema';
import { consumeUser } from './lib/token';
import createLoaders, { Loaders } from './lib/createLoader';

const app = new Koa();
/* setup middlewares */
app.use(consumeUser);
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());
if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}

export type ApolloContext = {
  user_id: string | null;
  loaders: Loaders;
};

const apollo = new ApolloServer({
  schema,
  context: async ({ ctx }: { ctx: Context }) => {
    try {
      // await consumeUser(ctx);
      return {
        user_id: ctx.state.user_id,
        loaders: createLoaders()
      };
    } catch (e) {
      return {};
    }
  },
  tracing: process.env.NODE_ENV === 'development'
});
apollo.applyMiddleware({ app });

/**
 * initial tasks except Koa middlewares;
 */
async function initalize() {
  try {
    await createConnection();
    console.log('Postgres RDBMS connection is establishde');
  } catch (e) {
    console.log(e);
  }
}
initalize();

export default app;
