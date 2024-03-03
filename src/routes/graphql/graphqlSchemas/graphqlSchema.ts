import { GraphQLSchema } from 'graphql/index.js';
import RootQuery from './queries.js';

export const graphqlSchema = new GraphQLSchema({
  query: RootQuery
});