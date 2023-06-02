import axios from 'axios';
import url from '../config/url';

const signIn = (data) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { email: `${data.email}`, password: `${data.password}` },
  };
  return axios(config);
};

const signUp = (data) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}/signup`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

const AuthenticationService = {
  signIn,
  signUp,
};
export default AuthenticationService;
