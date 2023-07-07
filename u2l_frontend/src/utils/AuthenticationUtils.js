const userEmail = 'user_email';
const firstName = 'first_name';
const lastName = 'last_name';
const userRole = 'user_role';

const storeUserDetails = (data) => {
  //check if checked values is sent(for login page)
  if (data.checked) {
    //here write logic for staying signed in
    //set email,name,role,jwt in localstorage
    localStorage.setItem(userEmail, data.email);
    localStorage.setItem(firstName, data.firstName);
    localStorage.setItem(lastName, data.lastName);
    localStorage.setItem(userRole, data.userRole);
    localStorage.setItem('jwt', data.jwt);
  }
  //if checked is not sent
  else {
    sessionStorage.setItem(userEmail, data.email);
    sessionStorage.setItem(firstName, data.firstName);
    sessionStorage.setItem(lastName, data.lastName);
    sessionStorage.setItem(userRole, data.userRole);
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
  return sessionStorage.getItem(userEmail)
    ? sessionStorage.getItem(userEmail)
    : localStorage.getItem(userEmail);
};

const getUserName = () => {
  return sessionStorage.getItem(firstName)
    ? `${sessionStorage.getItem(firstName)} ${sessionStorage.getItem(lastName)}`
    : `${localStorage.getItem(firstName)} ${localStorage.getItem(lastName)}`;
};

const getUserRole = () => {
  return sessionStorage.getItem(userRole)
    ? sessionStorage.getItem(userRole)
    : localStorage.getItem(userRole);
};

const AuthenticationUtils = {
  storeUserDetails,
  removeUserDetails,
  isUserLoggedIn,
  getEmail,
  getUserName,
  getUserRole,
};

export default AuthenticationUtils;
