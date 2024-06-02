import { useState, useEffect } from "react";
import { TouchableOpacity, Alert, ActivityIndicator, Platform } from "react-native";
import styled from "styled-components/native";
import getFinacialNumber from "../../api/getFinacialNumber";
import Search from "../Serch/Search";
import { LoadingView } from "../Serch/SerchStyle";

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

const SearchText = styled.TextInput`
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
const Home = ({navigation}) => {
  const [code, setCode] = useState(null);
  const [company, setCompany] = useState("");
  const [enter, setEnter] = useState(false);

  const handleSearch = () => {
    if (!company.trim()) {
      if (Platform.OS == "web"){
        alert("기업명을 입력하세요");
      } else {
        Alert.alert("기업명을 입력하세요");
      }
    } else{
      setEnter(true);
    }
  };

  const handleKeyPress = () => {
    if (!company.trim()) {
      if (Platform.OS == "web"){
        alert("기업명을 입력하세요");
      } else {
        Alert.alert("기업명을 입력하세요");
      }
    } else{
      handleSearch();
    }
  };

  // 다음화면으로의 이동이 감지되면 회사 검색 시작
  useEffect(() => {
    const fetchData = async() => {
      const data = await getFinacialNumber(company);

      setCode(data);
    }

    if(enter) {
      fetchData();
    }
  }, [enter])

  // 회사를 검색해서 code가 발급되면 데이터 전송과 페이지 이동
  useEffect(() => {
    if(code != null){

      const list = [company, code[0], code[1]];

      // enter가 true상태이기때문에 재검색이 안됨
      // 재검색을 위해 enter를 false로 회사이름을 빈값으로 변경
      setEnter(!enter);
      setCompany("");

      if(code == "fail") {
        if (Platform.OS == "web") {
          alert("존재하지 않는 기업입니다. 다시 입력해 주세요.");
        } else{
          Alert.alert("존재하지 않는 기업입니다. 다시 입력해 주세요.");
        }
      } else{
        navigation.navigate("search", {screen: "Search", company: list});
      }
    }
  }, [code])

  return (
    <ViewSty>
      {!enter ? <SearchContainer>
        <SearchText
          placeholder="기업명을 입력하세요..."
          placeholderTextColor="#3498db"
          value={company}
          onChangeText={setCompany}
          onSubmitEditing={handleKeyPress}
        />
        <TouchableImg onPress={handleSearch}>
          <SearchImg source={require("../../../assets/search.png")} />
        </TouchableImg>
      </SearchContainer> : <LoadingView><ActivityIndicator size="large" color="red" /></LoadingView>}
    </ViewSty>
  );
};

export default Home;