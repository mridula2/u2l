import axios from 'axios';

const addRules = (data) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `/rules/add`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

const checkURL = () => {
  const config = {
    method: 'head',
    maxBodyLength: Infinity,
    url: '/checkurl',
    
  };
  return axios(config);
};
const RulesService = {
  addRules,
  checkURL,
};

export default RulesService;
