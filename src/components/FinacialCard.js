import styled from "styled-components/native";
import { Image } from "react-native";
import { useState } from "react";

const CardView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(247, 247, 247);
  margin: 10px;
  border-radius: 5px;
  width: 90%;
  height: 90%;
  padding: 10px;
`
const Title = styled.Text`
  font-size: 14px;
  color: black;
`
const Value = styled.Text`
  font-size: 20px;
  color: black;
  font-weight: 300;
`
const Icon = styled.Image`
  position: absolute;
  left: 80px;
  bottom: 50px;
  width: 20px;
  height: 20px;
`
const TextView = styled.View`
  position: absolute;
  margin: 20px;
`
const VsText = styled.Text`
  font-size: 10px;
`


const FinacialCard = (props) => {
  const [visual, setVisual] = useState(false);
  
  const Onvisual = () => {
    setVisual(true);
  }
  const OffVisual = () => {
    setVisual(false);
  }
  const makeTextView = () => {
    if(props.title == "시가총액") {
      return <VsText>시가총액이란 ~~</VsText>
    } else{
      return <VsText>none</VsText>
    }
  }

  return(
    <CardView>
      <Icon source={require("../../assets/image/info.png")} alt="icon" onMouseEnter={Onvisual} onMouseLeave={OffVisual}/>
      {!visual && <Title>{props.title}</Title>}
      {!visual && <Value>{props.value}</Value>}
      {visual && (<TextView>{makeTextView()}</TextView>)}
    </CardView>
  );
}


export default FinacialCard;