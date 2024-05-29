import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const ViewSty = styled.View`
  display: flex;
  height: 100%;
  padding: 0px 41px;
  justify-content: center;

  gap: 10px;
  background-color: #fff;
`;

const SearchContainer = styled.View`
  position: relative;
  width: 315px;
  height: 55px;
`;
const Search = styled.TextInput`
  width: 315px;
  height: 55px;
  background-color: #89d3fa;
  border-radius: 20px;
  padding-left: 30px;
  font-size: 16px;
`;

const SearchImg = styled.Image`
  width: 17.6px;
  height: 17.575px;
`;

const TouchableImg = styled(TouchableOpacity)`
  position: absolute;
  right: 23.4px;
  top: 18px;
`;

// 처음 홈 화면 입니다.
const Home = () => {
  return (
    <ViewSty>
      <SearchContainer>
        <Search
          placeholder="기업명을 입력하세요..."
          placeholderTextColor="#3498db"
        />
        <TouchableImg>
          <SearchImg source={require("../../assets/search.png")} />
        </TouchableImg>
      </SearchContainer>
    </ViewSty>
  );
};

export default Home;
