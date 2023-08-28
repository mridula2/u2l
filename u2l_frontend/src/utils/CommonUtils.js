import { Buffer } from 'buffer';

const convertStringToBase64 = (string) => {
  return Buffer.from(string).toString('base64');
};

const downloadFile = async (response, file) => {
  console.log(file + ' downloaded');
  const url_blob = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url_blob;
  link.setAttribute('download', `${file}.zip`);
  document.body.appendChild(link);
  link.click();
};

const CommonUtils = {
  convertStringToBase64,
  downloadFile,
};
export default CommonUtils;
