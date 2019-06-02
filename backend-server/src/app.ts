import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { ApolloServer, gql } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import routes from './routes';
const app = new Koa();


/* setup middlewares */
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());

/* integerate GraphQL */
const typeDefs = gql`
    type Query{
        hello : String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!'
    }
};

const apollo = new ApolloServer({typeDefs,resolvers});
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