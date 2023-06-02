const userEmail = 'user_email';
const userName = 'user_name';

const storeUserDetails = (data) => {
  //check if checked values is sent(for login page)
  if (data.checked) {
    //here write logic for staying signed in
    //set email,name,role,jwt in localstorage
    localStorage.setItem(userEmail, data.email);
    localStorage.setItem(userName, data.name);
    localStorage.setItem('jwt', data.jwt);
  }
  //if checked is not sent
  else {
    sessionStorage.setItem(userEmail, data.email);
    sessionStorage.setItem(userName, data.name);
    sessionStorage.setItem('jwt', data.jwt);
  }
};

const removeUserDetails = () => {
  sessionStorage.clear();
  localStorage.clear();
};

const isUserLoggedIn = () => {
  return (sessionStorage.getItem(userEmail) === null &&
    localStorage.getItem(userEmail)) === null
    ? false
    : true;
};
const getEmail = () => {
  return sessionStorage.getItem(userEmail) !== null
    ? sessionStorage.getItem(userEmail)
    : localStorage.getItem(userEmail);
};

const getUserName = () => {
  return sessionStorage.getItem(userName) !== null
    ? sessionStorage.getItem(userName)
    : localStorage.getItem(userName);
};

const AuthenticationUtils = {
  storeUserDetails,
  removeUserDetails,
  isUserLoggedIn,
  getEmail,
  getUserName,
};

export default AuthenticationUtils;
