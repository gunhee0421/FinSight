import { useState, useEffect } from "react";
import { TouchableOpacity, Alert, ActivityIndicator } from "react-native";
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
      Alert.alert("기업명을 입력하세요");
      return;
    } else{
      setEnter(true);
    }
  };

  const handleKeyPress = () => {
    if (!company.trim()) {
      Alert.alert("기업명을 입력하세요");
      return;
    } else{
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      const data = await getFinacialNumber(company);

      setCode(data);
    }

    if(enter) {
      fetchData();
    }
  }, [enter])

  useEffect(() => {
    if(code != null){

      const list = [company, code[0], code[1]];

      setEnter(!enter);
      setCompany("");

      navigation.navigate("search", {screen: "Search", company: list});
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