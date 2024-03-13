import axios from 'axios';

const addMiddleware = (data) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `/extract_middleware`,

    data: data
  };
  return axios(config);
};


const MiddlewareService = {
  addMiddleware
};

export default MiddlewareService;
