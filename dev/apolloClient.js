import { ApolloClient } from "apollo-client";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import config from './config'

import { getUser } from './common/utils/Authenticate'

const host = window.location.host;

let subdomain = do {
	if (host !== config.HOST) { host.split(".")[0] }
};

export const API_URL = do {
	if (subdomain) { `${subdomain}.${config.SERVER_HOST}` }
	else { config.SERVER_HOST }
};

const wsLink = new WebSocketLink({
	uri: `ws://${API_URL}/subscriptions`,
	options: {
		reconnect: true,
		connectionParams: {
			token: "",
			subdomain: subdomain
		}
	}
});

const httpLink = setContext(() => {
	const user = getUser();
	if(user)
		return ({
			headers: {
				authorization: `Bearer ${user.token}`
			}
		});
	return {}
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
	cache: new InMemoryCache({
		fragmentMatcher: new IntrospectionFragmentMatcher({
			introspectionQueryResultData: {
				__schema: {
					types: [{
						"kind": "INTERFACE",
						"name": "Activity",
						"possibleTypes": [{
							"name": "UpgradeActivity"
						},
							{
								"name": "CreationActivity"
							}
						]
					},
						{
							"kind": "INTERFACE",
							"name": "FieldValue",
							"possibleTypes": [{
								"name": "TextValue"
							},
								{
									"name": "NumberValue"
								},
								{
									"name": "SelectValue"
								},
								{
									"name": "CheckValue"
								}
							]
						},
						{
							"kind": "INTERFACE",
							"name": "Field",
							"possibleTypes": [{
								"name": "FreeField"
							},
								{
									"name": "SelectField"
								}
							]
						},
						{
							"kind": "INTERFACE",
							"name": "BusinessHours",
							"possibleTypes": [{
								"name": "TwentyFourSeven"
							},{
								"name": "Customized"
							},
								{
									"name": "SameForDays"
								}
							]
						}
					],
				}
			}
		})
	})
});
export default client
