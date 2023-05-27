import axios from "axios";
import url from "../config/url";

const getProjectDetails = (project_name) => {
  let config = {
    method: "get",
    url: `${url}/pdf/${project_name}`,
  };
  return axios(config);
};

const getProjects = (email) => {
  let config = {
    method: "get",
    url: `${url}/projects/${email}`,
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

const ProjectService = {
  getProjectDetails,
  postProjectDetails,
  getProjects,
  getReport,
};
export default ProjectService
