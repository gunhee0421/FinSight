import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import FinacialCard from "./FinacialCard";
import getFinacialNumber from "../api/getFinacialNumber";
import getFinacialStatement from "../api/getFinacialStatement";

const MainView = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TopView = styled.View`
  background-color: white;
  flex: 3;
`
const BottomView = styled.View`
  background-color: white;
  flex: 1;
`
const CardView = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
  display: grid;
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 90px 90px;
  padding: 20px 0px ;
  border-bottom-width: 10px;
  border-bottom-style: solid;
  border-bottom-color: rgb(240, 240, 240);
`
const FinacialTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`
const Loading = styled.Text`
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

const Finacial = ({company}) => {
  const [code, setCode] = useState(null);
  const [statements, setStatements] = useState(null);
  const [totalMoney, setTotalMoney] = useState(null);

  useEffect(()=>{
    const getData = async() => {
      const data = await getFinacialNumber(company);

      setCode(data);

      if (code !== null) {
        const statusData = await getFinacialStatement(code);
        setStatements(statusData);
      }
    }
    getData();
  }, [code])

  const Card = () => {
    return(
      <CardView >
        <FinacialCard title="시가총액" value={statements?.list[0]?.thstrm_amount} />
        <FinacialCard title="당기순이익" value={1000} />
        <FinacialCard title="EPS" value={1000} /> 
        <FinacialCard title="PER" value={1000} />
        <FinacialCard title="PBR" value={1000} /> 
        <FinacialCard title="ROE" value={1000} />
      </CardView>
    );
  }

  return(
    <MainView>
      <TopView>
        <FinacialTitle>투자 지표</FinacialTitle>
        {statements ? Card() : <Loading>Loading...</Loading>}
      </TopView>
      <BottomView>
        
      </BottomView>
    </MainView>
  );
}

export default Finacial;