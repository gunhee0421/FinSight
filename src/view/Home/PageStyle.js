import styled from "styled-components/native";

export const ViewSty = styled.View`
  display: flex;
  padding: 68px 17px;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  height: 100%;
  background-color: white;
`;

export const GView = styled.View`
  display: flex;
  padding: 31px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 17px;
`;

export const TextG = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 9px;
  align-self: stretch;
`;

export const TextSty = styled.Text`
  color: #0a265b;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const Rec = styled.View`
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  background-color: #d9d9d9;
  border-radius: 100%;
  margin: 3px;
`;

export const SkipText = styled.Text`
  color: #595959;
  text-decoration-line: underline;
`;
