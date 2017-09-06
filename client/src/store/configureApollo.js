import { ApolloClient, createNetworkInterface } from 'react-apollo';


const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_API_GRAPHQL_URL 
});

const client = new ApolloClient({
  ssrMode: true,
  networkInterface: networkInterface
});

export default client;