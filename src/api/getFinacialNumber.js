import axios from "axios";
import { useEffect, useState } from "react"
import xml2js from "react-native-xml2js";


// 고유번호 xml -> json으로 변환해서 특정 기업 한글로 입력시 그 기업의 고유번호 반환
const getFinacialNumber = (finacialName) => {
  const [data, setData] = useState("");

  const fetchData = async() => {
    try{
      const response = await axios(`http://localhost:8081/assets/CORPCODE.xml`);

      xml2js.parseString(response.data, (error, res) => {
        if(error){
          console.log(error);
        }
        const json = JSON.parse(JSON.stringify(res));

        const code = json?.result?.list
        ?.filter(item => item.corp_name[0] === finacialName)
        .map(item => item.corp_code[0])
        
        {code ? setData(code[0]) : setData(null)}
      })
    } catch(error) {
      console.log(error);
    }
  }

  fetchData();

  return data;
}

export default getFinacialNumber;