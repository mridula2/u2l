import axios from "axios";
import url from "./url";

const getProjectDetails = (project_name) => {
  let config = {
    method: "get",
    url: `${url}/pdf/${project_name}`,
  };
  return axios(config);
};

const getProjects = (userName) => {
  let config = {
    method: "get",
    url: `${url}/projects/${userName}`,
  };
  return axios(config);
};

const postProjectDetails = (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${url}/analysis`,
    data: data,
  };
  return axios(config);
};

const getReport = (project_name) => {
  let config = {
    method: "get",
    url: `${url}/report/${project_name}`,
    reponseType: "blob",
    headers: {
      Accept: "application/zip",
    },
  };
  return axios(config);
};

export default {
  getProjectDetails,
  postProjectDetails,
  getProjects,
  getReport,
};
