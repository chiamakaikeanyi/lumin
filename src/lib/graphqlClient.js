import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { API } from './constants';

export const client = new ApolloClient({
  uri: API,
  cache: new InMemoryCache()
});

export default ApolloProvider;
