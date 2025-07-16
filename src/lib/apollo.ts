// src/lib/apollo.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql", // Change in production
  cache: new InMemoryCache(),
});

export default client;
