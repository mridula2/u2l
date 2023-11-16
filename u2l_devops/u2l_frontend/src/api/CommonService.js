import axios from 'axios';

const getDocumentation = (file_name, application_name, email) => {
  let config = {
    method: 'get',
    url: `/documentation/${file_name}`,
    reponseType: 'blob',
    headers: {
      Accept: 'application/zip',
    },
  };
  return axios(config);
};

const CommonService = {
  getDocumentation,
};

export default CommonService;
