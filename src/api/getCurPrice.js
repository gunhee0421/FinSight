import axios from "axios"
import { useEffect } from "react"
import { OpenKey, sixDay, proxy } from "./API";
import { Platform } from "react-native";


const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=`;

const getCurPrice = async(sortCode) => {
  const URL = `${url}${OpenKey}&resultType=json&baseDt=${sixDay}&likeSrtnCd=${sortCode}`;
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
    console.log("curPirce: ", json);

    return json;
    
  } catch(error){
    console.error(error);
  }
}

export default getCurPrice;