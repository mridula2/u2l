import { Buffer } from 'buffer';

const convertStringToBase64 = (string) => {
  return Buffer.from(string).toString('base64');
};

const downloadFile = async (response, file) => {
  const blob = await response.blob();
  const url_blob = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url_blob;
  link.setAttribute('download', `${file}.zip`);
  document.body.appendChild(link);
  link.click();
};

const findItem = (item) => {
  return sessionStorage.getItem(item) !== null
    ? sessionStorage.getItem(item)
    : localStorage.getItem(item);
};

const CommonUtils = {
  convertStringToBase64,
  downloadFile,
  findItem,
};
export default CommonUtils;
