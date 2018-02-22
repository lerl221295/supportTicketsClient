import React from 'react'
import GraphiQL from 'graphiql';
import voy, { Voyager } from 'graphql-voyager';
import fetch from 'isomorphic-fetch';
import { API_URL } from "../../apolloClient";
import { getUser } from "../../common/utils/Authenticate";
import 'graphiql/graphiql.css';

const graphQLFetcher = (graphQLParams) => {
    const user = getUser();
    return(
        fetch(`http://${API_URL}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'Authorization':  user ? `Bearer ${user.token}` : null
            },
            body: JSON.stringify(graphQLParams),
        }).then(response => response.json())
    )
}

export default () => (
    <div style={{height: "100vh"}}>
        <GraphiQL fetcher={graphQLFetcher} />
        {/*<link rel="stylesheet" href="/voyager.css" />
        <Voyager 
            introspection={(query) => graphQLFetcher({query})}
        />*/}
    </div>
)