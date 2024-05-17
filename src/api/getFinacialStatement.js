import axios from "axios";
import {key, proxy, day} from "./API";
import { Platform } from "react-native";

const url = `https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?`;

// api -> json : dart api에서 회사의 고유번호로 특정 회사의 특정 년도 재무재표 데이터를 가져옴
const getFinacialStatement = async (company) => {
  const URL = `${url}crtfc_key=${key}&corp_code=${company}&bsns_year=${day}&reprt_code=11011`;
  try{
    let response;

    if (Platform.OS=="web"){
      response = await axios.get(`${proxy}${URL}`, {
        headers: {
          "x-cors-api-key" : `temp_26636be978b259b7e7a203bb4fce455c`,
        }
      });
    } else{
      response = await axios.get(`${URL}`);
    }

    
    const json = await response.data;
    console.log(json);

    return json;
    
  } catch(error){
    console.error(error);
  }
};
export default getFinacialStatement;