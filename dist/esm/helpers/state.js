let authenticationToken = null;
export const setAuthenticationToken = (token) => {
    authenticationToken = token;
    console.log('setAuthenticationToken: token', token);
};
export const getAuthenticationToken = () => {
    return authenticationToken;
};
