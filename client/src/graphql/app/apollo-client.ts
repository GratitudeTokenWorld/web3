import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink
({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: { 'Apollo-Require-Preflight': 'true' }
});

export const client = new ApolloClient
({
    link: httpLink,
    cache: new InMemoryCache()
});
