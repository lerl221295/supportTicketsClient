import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { getUser } from './Authenticate'

const API_URL = "localhost:3000";

const wsClient = new SubscriptionClient(`ws://${API_URL}/subscriptions`, {
  	reconnect: true
});

const networkInterface = createNetworkInterface({
    uri: `http://${API_URL}/graphql`
});

/*funcionalidad JTW*/
networkInterface.use([{
    applyMiddleware : (req, next) => {
    	 // Crear el objeto de headers si es necesario.
        if (!req.options.headers)  req.options.headers = {};
        // obtener el token del local storage.
        const user = getUser();
        //agregar el token al header authorization si existe, sino: null.
        req.options.headers.authorization = user ? `Bearer ${user.token}` : null;
        next();
    }
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
 	networkInterface,
  	wsClient
);

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
});

export default client