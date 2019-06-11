import merge from 'lodash/merge';
import {gql, IResolvers, makeExecutableSchema } from 'apollo-server-koa';
import * as post from './post';
import * as user from './user';
import DateScalar from './scalars/DateScalar';

const typeDef = gql`
    scalar JSON
    scalar Date
    type Query {
        _version : String  
    }
`;

const resolvers: IResolvers = {
    Query: {
        _version: ()  => '1.0',
    },
    Date: DateScalar
};

const schema = makeExecutableSchema({
    typeDefs: [typeDef, user.typeDef,post.typeDef],
    resolvers: merge(resolvers, user.resolvers, post.resolvers)
});

export default schema;