"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloClient = void 0;
const core_1 = require("@apollo/client/core");
const error_1 = require("@apollo/client/link/error");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const config_1 = require("./config");
const state_1 = require("./state");
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};
const httpLink = new core_1.HttpLink({
    uri: config_1.PHILAND_API,
    fetch: cross_fetch_1.default,
});
const errorLink = (0, error_1.onError)(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`));
    if (networkError)
        console.log(`[Network error]: ${networkError}`);
});
// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new core_1.ApolloLink((operation, forward) => {
    const token = (0, state_1.getAuthenticationToken)();
    console.log('jwt token:', token);
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    // Call the next link in the middleware chain.
    return forward(operation);
});
exports.apolloClient = new core_1.ApolloClient({
    link: (0, core_1.from)([errorLink, authLink, httpLink]),
    cache: new core_1.InMemoryCache(),
    defaultOptions: defaultOptions,
});
