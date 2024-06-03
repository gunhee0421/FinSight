import styled from "styled-components/native";

export const SearchView = styled.View`
  align-items: flex-start;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
  padding: 0px 0px;
  position: relative;
  overflow-y: scroll;
  height: 100vh;
`;
export const HeaderView = styled.View`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 14px;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;
export const HeaderText = styled.Text`
  color: #979797;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: 100%;
  text-align: center;
`
export const HeaderNumber = styled.Text`
  color: ${props => props.percent > 0 ? "red" : "#1400ff"};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: 175px;
  text-align: center;
`
export const Reactangle = styled.Image`
  height: 19px;
  width: 100%;
  align-self: stretch;
  background: #D9D9D9;
`
export const BodyView = styled.View`
  display: flex;
  height: 530px;
  padding: 17px 0px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;
  flex-shrink: 0;
  align-self: stretch;
`
export const BodyTitle = styled.View`
  width: 339px;
  height: 50px;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-between;
`
export const BodyTitleText = styled.Text`
  width: 80%;
  height: 50px;
  flex-shrink: 0;
  color: #000;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;  
`
export const Icon = styled.Image`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`
export const CardList = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`
export const CardListOne = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`
export const Card = styled.View`
  width: 160px;
  height: 80px;
  flex-shrink: 0;
  background-color: #F2F2F2;
  border-radius: 15px;
  padding: 10px;
`
export const CardTitle = styled.Text`
  margin-left: 30px;
  display: flex;
  width: 80px;
  height: 21px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #878787;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  gap: 20px;
  text-align: center;
`
export const CardNumber = styled.Text`
  display: flex;
  width: 100%;
  height: 21px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #525252;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`
export const CardTop = styled.View`
  height: 30px;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-between;
`
export const FooterView = styled.View`
  display: flex;
  height: 158px;
  padding: 21px 25px;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
`
export const FooterText = styled.Text`
  width: 150px;
  height: 34px;
  flex-shrink: 0;
  text-align: center;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
export const FooterBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  height: 120px;
  align-self: stretch;
  border-radius: 15px;
  background-color: #F2F2F2;
`
export const FooterBoxText = styled.Text`
  color: ${props => props.percent > 0 ? "red" : props.percent == 0 ? "black" : "#1400ff"};
  width: 70%;
  text-align: right;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
export const InfoBox = styled.View`
  height: 70%;
  width: 70%;
  flex-shrink: 0;
  background-color: #F2F2F2;
  border-radius: 15px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2cqi;
`
export const InfoText = styled.Text`
  width: 80%;
  flex-shrink: 0;
  color: #525252;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 10px;
`
export const LoadingView = styled.View`
  width: 100%;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`
export const FinacialView = styled.View`
  width: 100vw;
  margin-bottom: 30px;
`