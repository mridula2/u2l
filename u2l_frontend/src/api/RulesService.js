import axios from 'axios';

const addRules = (data) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `/collectdata`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      java_doc_version: `${data.package_version}`,
    },
  };
  return axios(config);
};

const addJavaLibraries = (data) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `/collect_other_libraries`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      package_language: `${data.package_language}`,
      package_url: `${data.package_url}`,
      package_name: `${data.package_name}`,
      package_version: `${data.package_version}`,
    },
  };
  return axios(config);
};

const checkURL = (url) => {
  const config = {
    method: 'post',
    url: '/check_website',
    data: { url: url },
  };
  return axios(config);
};
const RulesService = {
  addRules,
  checkURL,
  addJavaLibraries,
};

export default RulesService;
