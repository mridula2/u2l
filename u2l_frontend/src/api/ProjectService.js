import axios from 'axios';
import url from '../config/url';

const getProjectDetails = (project_name, application_name, email) => {
  let config = {
    method: 'get',
    url: `${url}/pdf/${project_name}/${application_name}/${email}`,
  };
  return axios(config);
};

const getProjects = (email) => {
  let config = {
    method: 'get',
    url: `${url}/projects/${email}`,
  };
  return axios(config);
};

const postProjectDetails = (data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}/analysis`,
    data: data,
  };
  return axios(config);
};

const getReport = (project_name, application_name, email) => {
  let config = {
    method: 'get',
    url: `${url}/report/${project_name}/${application_name}/${email}`,
    reponseType: 'blob',
    headers: {
      Accept: 'application/zip',
    },
  };
  return axios(config);
};

const saveContact = (data) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}/contact`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...data,
    },
  };
  return axios(config);
};

const ProjectService = {
  getProjectDetails,
  postProjectDetails,
  getProjects,
  getReport,
  saveContact,
};
export default ProjectService;
