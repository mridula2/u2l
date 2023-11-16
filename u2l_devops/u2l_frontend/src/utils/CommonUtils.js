import { Buffer } from 'buffer';
import { useRef } from 'react';

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
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${file}.zip`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

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

const CommonUtils = {
  convertStringToBase64,
  downloadFile,
  findItem,
  downloadFileAxios,
  useFocus,
};
export default CommonUtils;
