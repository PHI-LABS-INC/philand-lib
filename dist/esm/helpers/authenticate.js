import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as dotenv from 'dotenv';
dotenv.config();
const user_pool_id = process.env.USER_POOL_ID;
const user_pool_client_id = process.env.USER_POOL_CLIENT_ID;
const usr = process.env.USER_NAME;
const password = process.env.PASSWORD;
export const getAuthenticationJwtToken = () => {
    const poolData = {
        UserPoolId: user_pool_id,
        ClientId: user_pool_client_id,
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: usr,
        Password: password,
    });
    const userData = {
        Username: usr,
        Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token');
                console.log(result.getAccessToken().getJwtToken());
                resolve(result.getAccessToken().getJwtToken());
            },
            onFailure: function (err) {
                console.error('*** error ***');
                console.error('error ' + err);
                reject(err);
            },
        });
    });
};
