import axios from "axios";
import { useEffect, useState } from "react";
import {key, proxy, day} from "./API";

const url = `https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?`;

// api -> json : dart api에서 회사의 고유번호로 특정 회사의 특정 년도 재무재표 데이터를 가져옴
const getFinacialStatement = (company) => {
  const URL = `${url}crtfc_key=${key}&corp_code=${company}&bsns_year=${day}&reprt_code=11011`;

  const [data, setData] = useState(null);

  const fetchData = async() => {
    try{
      const response = await axios.get(`${proxy}${URL}`, {
        headers: {
          "x-cors-api-key" : `temp_69440402647a45224c435b039b0c2354`,
        }
      });
      const json = await response.data;
      console.log(json.data);
      setData(json.data);
    } catch(error){
      console.error(error);
    }
  };

  fetchData();

  return data;
}
export default getFinacialStatement;