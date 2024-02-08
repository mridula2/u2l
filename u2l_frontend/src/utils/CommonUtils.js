import { Buffer } from 'buffer';
import { useRef } from 'react';
import { saveAs } from 'file-saver';

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

const downloadFileAxios = async (response, file) => {
  const blob = new Blob([response.data], { type: 'application/zip' });
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', `${file}.zip`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// const downloadFileAxios = async (response, file) => {
//   console.log(response.data.length)
//   const blob = new Blob([response.data], { type: 'application/zip' });
//   saveAs(blob, `${file}.zip`);
// };

const findItem = (item) => {
  return sessionStorage.getItem(item) !== null
    ? sessionStorage.getItem(item)
    : localStorage.getItem(item);
};

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const getSize = (size) => {
  if (size < 1024) {
    return `${Math.round(size)} kb`;
  } else {
    const num = size / 1024;
    return `${Math.round((num + Number.EPSILON) * 100) / 100} mb`;
  }
};

const CommonUtils = {
  convertStringToBase64,
  downloadFile,
  findItem,
  downloadFileAxios,
  useFocus,
  getSize,
};
export default CommonUtils;
