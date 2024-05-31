import axios from "axios"
import { useEffect } from "react"
import { key, proxy, day } from "./API";
import { Platform } from "react-native";

const url = `https://opendart.fss.or.kr/api/stockTotqySttus.json?crtfc_key=`;
const getStockNumber = async(crop) => {
  const URL = `${url}${key}&corp_code=${crop}&bsns_year=${day}&reprt_code=11011`
  try{
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
    console.log("stockNumber: ", json);

    return json;
    
  } catch(error){
    console.error(error);
  }
}

export default getStockNumber;