import styled from "styled-components/native";

const NavigationView = styled.View`
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 30px;
  position: relative;
  flex-direction: row;
`
const NavigationText = styled.Text`
  color: #666565;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
  color: ${props => props.index == props.value ? "#979797" : "black"};
`

const Navi = ({index, setIndex}) => {

  return(
    <NavigationView>
      <NavigationText index={index} value={1} onPress={() => setIndex(1)}>투자 정보</NavigationText>
      <NavigationText index={index} value={2} onPress={() => setIndex(2)}>투자 뉴스</NavigationText>
      <NavigationText index={index} value={3} onPress={() => setIndex(3)}>투자 시장</NavigationText>
    </NavigationView>
  );
}

export default Navi;