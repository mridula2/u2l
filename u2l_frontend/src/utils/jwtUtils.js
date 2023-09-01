import jwtDecode from 'jwt-decode';
import AuthenticationUtils from './AuthenticationUtils';

const decodeJWTToken = (token) => {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  return decodedToken;
};

const getItemFromToken = (item) => {
  const jwt = AuthenticationUtils.getToken();
  console.log(jwt)
  if(jwt){
    const token = decodeJWTToken(jwt);
    return token[item];
  }
  else{
    return 'jwt'
  }
};

const jwtUtils = {
  decodeJWTToken,
  getItemFromToken,
};

export default jwtUtils;
