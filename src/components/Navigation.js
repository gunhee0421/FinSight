import styled from "styled-components";

const ULComponent = styled.ul`
  list-style-type: none;
  padding: 0px 10px;
  margin: 0px;
  border-bottom-width: 10px;
  border-bottom-style: solid;
  border-bottom-color: rgb(240, 240, 240);
`
const LIComponent = styled.li`
  display: inline-block;
  font-size: 16px;
  color: ${({index, value}) => (index == value ? "black" : "gray")};
  opacity: 0.8;
  margin-left: 20px;
  padding: 14px;
  font-weight: ${({index, value}) => (index == value ? "bold" : "normal")};
  border-bottom: ${({index, value}) => (index == value ? "1px solid black" : "")};
`


const Navigation = ({index, setIndex}) => {

  return(
    <ULComponent>
      <LIComponent value={1} index={index} onClick={() => setIndex(1)}>종목 정보</LIComponent>
      <LIComponent value={2} index={index} onClick={() => setIndex(2)}>종목 뉴스</LIComponent>
      <LIComponent value={3} index={index} onClick={() => setIndex(3)}>세계 지수</LIComponent>
    </ULComponent>
  );
}

export default Navigation;