import { Buffer } from "buffer";

const convertStringToBase64=(string)=>{
    return Buffer.from(string).toString('base64')
}

const CommonUtils={
    convertStringToBase64
}
export default CommonUtils