// ---------------------------------------------------------------
//
//  get_token.ts
//
//  Feb/19/2022
// ---------------------------------------------------------------
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as dotenv from 'dotenv';

console.error('*** start ***');

dotenv.config();
const user_pool_id = process.env.USER_POOL_ID!;
const user_pool_client_id = process.env.USER_POOL_CLIENT_ID!;
const usr = process.env.USER_NAME!;
const password = process.env.PASSWORD!;

console.error(usr);
console.error(password);

const poolData: AmazonCognitoIdentity.ICognitoUserPoolData = {
  UserPoolId: user_pool_id,
  ClientId: user_pool_client_id,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
  Username: usr,
  Password: password,
});
const userData: AmazonCognitoIdentity.ICognitoUserData = {
  Username: usr,
  Pool: userPool,
};
const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function (result) {
    console.log('access token');
    console.log(result.getAccessToken().getJwtToken());
  },

  onFailure: function (err) {
    console.error('*** error ***');
    console.error('error ' + err);
  },
});

console.error('*** end ***');
