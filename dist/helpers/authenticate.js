"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticationJwtToken = void 0;
const AmazonCognitoIdentity = __importStar(require("amazon-cognito-identity-js"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const user_pool_id = process.env.USER_POOL_ID;
const user_pool_client_id = process.env.USER_POOL_CLIENT_ID;
const usr = process.env.USER_NAME;
const password = process.env.PASSWORD;
const getAuthenticationJwtToken = () => {
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
exports.getAuthenticationJwtToken = getAuthenticationJwtToken;
