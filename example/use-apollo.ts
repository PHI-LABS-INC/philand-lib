import { gql } from '@apollo/client';
import { apolloClient } from '../src/helpers/apolloClient';
import { setAuthenticationToken } from '../src/helpers/state';
import { getAuthenticationJwtToken } from '../src/helpers/authenticate';

const query = `
  query {listQuests { items { Condition Value }}}
`;

const query2 = `
  query query($address: String!) {
    conditionCheck(input: { address: $address }) {
      data {
        Condition
        Result
        TokenId
        Value
      }
    }
  }
`;

const mutation = `
  mutation MyMutation($address: String!) {
    conditionTrigger(input: { address: $address }){
        status
    }
  }
`;

export const queryExample = async () => {
  const response = await apolloClient.query({
    query: gql(query),
  });
  console.log('example data: ', response.data.listQuests.items[0]);
};

export const queryExample2 = async (address: string) => {
  const response = await apolloClient.query({
    query: gql(query2),
    variables: {
      address: address,
    },
  });
  console.log('example data: ', response.data.conditionCheck.data[0]);
};

export const queryExample3 = async (address: string) => {
  const response = await apolloClient.mutate({
    mutation: gql(mutation),
    variables: {
      address: address,
    },
  });
  if (response.data) {
    console.log('Mutation was successful');
  } else {
    console.error('Mutation failed');
  }
};

const exampleTokenFlow = async () => {
  getAuthenticationJwtToken()
    .then((token: string) => {
      // Do something with the access token
      setAuthenticationToken(token);
      queryExample();
      queryExample2('0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce');
      queryExample3('0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce');
    })
    .catch((err) => {
      // Handle the error
    });
};

exampleTokenFlow();
