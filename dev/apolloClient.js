import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { getUser } from './Authenticate'

let host = window.location.host.split(".")[0];

const API_URL = `${host}.localhost:3000`;

const wsLink = new WebSocketLink({
    uri: `ws://${API_URL}/subscriptions`,
    options: {
        reconnect: true
    }
});

const httpLink = setContext(() => {
    const user = getUser();
    return ({
        headers: { 
            authorization: user ? `Bearer ${user.token}` : null,
        }
    })
}).concat(createHttpLink({ uri: `http://${API_URL}/graphql` }));

const link = split( /*ni idea aun de que hace esta pinga!*/
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});

export default client