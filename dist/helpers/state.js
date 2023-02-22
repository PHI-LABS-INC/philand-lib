"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticationToken = exports.setAuthenticationToken = void 0;
let authenticationToken = null;
const setAuthenticationToken = (token) => {
    authenticationToken = token;
    console.log('setAuthenticationToken: token', token);
};
exports.setAuthenticationToken = setAuthenticationToken;
const getAuthenticationToken = () => {
    return authenticationToken;
};
exports.getAuthenticationToken = getAuthenticationToken;
