import axios from "axios";
import { useEffect, useState } from "react"
import xml2js from "react-native-xml2js";
import { Platform } from "react-native";


// 고유번호 xml -> json으로 변환해서 특정 기업 한글로 입력시 그 기업의 고유번호 반환하는 함수입니다.
const getFinacialNumber = async (finacialName) => {
    try{
      const response = await axios(
        Platform.OS === 'web'
          ? `http://localhost:8081/assets/CORPCODE.xml`
          : `http://192.168.45.106:8081/assets/CORPCODE.xml`
      );

      const data = await new Promise((resolve, reject) => 
        {
          xml2js.parseString(response.data, (error, res) => {
          if(error){
            reject(error);
          }
          const json = JSON.parse(JSON.stringify(res));

          const code = json?.result?.list
          ?.filter(item => item.corp_name[0] === finacialName)
          .map(item => item.corp_code[0])
          
          resolve(code ? code[0] : null);
        });
      });

      const sortCode = await new Promise((resolve, reject) => 
        {
          xml2js.parseString(response.data, (error, res) => {
          if(error){
            reject(error);
          }
          const json = JSON.parse(JSON.stringify(res));

          const code = json?.result?.list
          ?.filter(item => item.corp_name[0] === finacialName)
          .map(item => item.stock_code[0])
          
          resolve(code ? code[0] : null);
        });
      });
      
      const result = [data, sortCode];
      console.log("finacialNumber: ", result);

      if((data == undefined || data == " "  || data == null )|| (sortCode == undefined || sortCode == null || sortCode == " ")) {
        return "fail";
      } else{
        return result;
      }
    } catch(error) {
      console.log(error);
    }
}

export default getFinacialNumber;