import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as dotenv from 'dotenv';

console.error('*** start ***');

dotenv.config();
const user_pool_id = process.env.USER_POOL_ID!;
const user_pool_client_id = process.env.USER_POOL_CLIENT_ID!;
const usr = process.env.USER_NAME!;
const refresh_token = process.env.REFRESH_TOKEN!;

const poolData: AmazonCognitoIdentity.ICognitoUserPoolData = {
  UserPoolId: user_pool_id,
  ClientId: user_pool_client_id,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const userData: AmazonCognitoIdentity.ICognitoUserData = {
  Username: usr,
  Pool: userPool,
};
const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

function refreshAccessToken(
  refreshToken: string,
  cognitoUser: AmazonCognitoIdentity.CognitoUser
): Promise<string> {
  const refreshTokenObj = new AmazonCognitoIdentity.CognitoRefreshToken({
    RefreshToken: refreshToken,
  });
  return new Promise((resolve, reject) => {
    cognitoUser.refreshSession(refreshTokenObj, (err, session) => {
      if (err) {
        reject(err);
      } else {
        resolve(session.getAccessToken().getJwtToken());
      }
    });
  });
}

refreshAccessToken(refresh_token, cognitoUser)
  .then((accessToken: string) => {
    console.log('Access token');
    console.log(accessToken);
  })
  .catch((err) => {
    console.error('*** error ***');
    console.error('error ' + err);
  });

console.error('*** end ***');
