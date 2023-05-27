import axios from "axios";
import url from "./url";

const signIn = (data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {user_name:`${data.name}`, password:`${data.password}`},
  };
  return axios(config)
};

const storeUserDetails = (/*jwt*/ name) => {
  // console.log("add user");
  sessionStorage.setItem("user_name", name);
  // sessionStorage.setItem('jwt',jwt)
};

const removeUserDetails = () => {
  console.log("rem user");
  sessionStorage.removeItem("user_email");
};

const isUserLoggedIn = () => {
  console.log("chk user");
  return sessionStorage.getItem("user_email") === null ? false : true;
};
const getUserName = () => {
  return sessionStorage.getItem("user_name");
};

export default {
  signIn,
  storeUserDetails,
  removeUserDetails,
  isUserLoggedIn,
  getUserName
};
