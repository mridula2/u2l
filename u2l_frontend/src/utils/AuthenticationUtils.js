import CommonUtils from './CommonUtils';
import jwtUtils from './jwtUtils';

const userEmail = 'email';
const firstName = 'first_name';
const lastName = 'last_name';
const userRole = 'user_role';
const jwt = 'jwt';

const storeUserDetails = (data) => {
  //check if checked values is sent(for login page)
  if (data.checked) {
    //here write logic for staying signed in
    //set email,name,role,jwt in localstorage
    // localStorage.setItem(userEmail, data.email);
    // localStorage.setItem(firstName, data.firstName);
    // localStorage.setItem(lastName, data.lastName);
    // localStorage.setItem(userRole, data.userRole);
    localStorage.setItem(jwt, data.jwt);
  }
  //if checked is not sent
  else {
    // sessionStorage.setItem(userEmail, data.email);
    // sessionStorage.setItem(firstName, data.firstName);
    // sessionStorage.setItem(lastName, data.lastName);
    // sessionStorage.setItem(userRole, data.userRole);
    sessionStorage.setItem(jwt, data.jwt);
  }
};

const removeUserDetails = () => {
  sessionStorage.clear();
  localStorage.clear();
};

const isUserLoggedIn = () => {
  return !(
    sessionStorage.getItem(jwt) === null &&
    localStorage.getItem(jwt) === null
  );
};
const getEmail = () => {
  return jwtUtils.getItemFromToken(userEmail);
};

const getUserName = () => {
  return sessionStorage.getItem(jwt)
    ? `${jwtUtils.getItemFromToken(firstName)} ${jwtUtils.getItemFromToken(lastName)}`
    : `${jwtUtils.getItemFromToken(firstName)} ${jwtUtils.getItemFromToken(lastName)}`;
};

const getUserRole = () => {
  return jwtUtils.getItemFromToken(userRole);
};
const getToken = () => {
  return CommonUtils.findItem(jwt);
};

const AuthenticationUtils = {
  storeUserDetails,
  removeUserDetails,
  isUserLoggedIn,
  getEmail,
  getUserName,
  getUserRole,
  getToken,
};

export default AuthenticationUtils;
