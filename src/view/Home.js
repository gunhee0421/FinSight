import { useState, useEffect } from "react";
import getFinacialNumber from "../api/getFinacialNumber";
import getFinacialStatement from "../api/getFinacialStatement";

// 처음 홈 화면 입니다.
const Home= (props) => {
  const [code, setCode] = useState(null);       // code에 기업의 고유번호가 존재합니다.
  const [status, setStatus] = useState(null);   // status에 기업의 재무재표가 존재합니다. ex)이 부분은 삭제해도 무방합니다. 홈이 아닌 검색 이후의 화면에서 사용할 데이터 입니다.


  useEffect(()=>{
    const getData = async() => {
      const data = await getFinacialNumber(props.finacial);

      setCode(data);

      if (code !== null) {
        const statusData = await getFinacialStatement(code);
        setStatus(statusData);
      }
    }
    getData();
  }, [code])

  return (
    <div>
      {code ? (
        <p>기업 고유번호: {code}</p>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
      {status ? (
        <p>총 매출액: {status?.list[0]?.thstrm_amount}</p>
      ) : (
        <p>status 로딩중</p>
      )}
    </div>
  );
};


export default Home;