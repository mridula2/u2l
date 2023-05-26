import axios from "axios";
import url from "../config/url";

const signIn = (data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {email:`${data.email}`, password:`${data.password}`},
  };
  return axios(config)
};

const storeUserDetails = (data) => {
  console.log(data)
  //check if checked values is sent(for login page)
  if (data.checked) {
    //here write logic for staying signed in
    //set email,name,role,jwt in localstorage
    localStorage.setItem("user_email", data.email)
    localStorage.setItem("user_name", data.name)
    localStorage.setItem("jwt", data.jwt);
  }
  //if checked is not sent 
  else {
      sessionStorage.setItem("user_email", data.email);
      sessionStorage.setItem("user_name", data.name);
    sessionStorage.setItem("jwt", data.jwt);
  }
};

const removeUserDetails = () => {
  console.log("rem user");
  sessionStorage.clear();
  localStorage.clear();
};

const isUserLoggedIn = () => {
  console.log("chk user");
  return sessionStorage.getItem("user_email") === null ? false : true;
};
const getEmail = () => {
  return sessionStorage.getItem("user_email");
};
const AuthenticationService = {
  signIn,
  storeUserDetails,
  removeUserDetails,
  isUserLoggedIn,
  getEmail
};
export default AuthenticationService
