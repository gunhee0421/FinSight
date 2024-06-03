import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { TouchableOpacity, Alert, Image } from "react-native";
import styled from "styled-components";
import getFinacialNumber from "../api/getFinacialNumber";

const ViewSty = styled.View`
  display: flex;
  height: 100%;
  padding: 21px 41px 110px 41px;
  justify-content: center;
  flex-direction: column;
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
const Home = (props) => {
  const [code, setCode] = useState(null);
  const [company, setCompany] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (!company.trim()) {
      Alert.alert("기업명을 입력하세요");
      return;
    }
    navigation.navigate("Company", { CompanyName: company, CompanyCode: code });
  };

  const handleKeyPress = () => {
    if (!company.trim()) {
      Alert.alert("기업명을 입력하세요");
      return;
    }
    handleSearch();
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getFinacialNumber(props.finacial);

      setCode(data);
    };
    getData();
  }, [code]);

  return (
    <ViewSty>
      <Image
        source={require("../../assets/Logo.png")}
        style={{ width: 310, height: 150 }}
      />
      <SearchContainer>
        <Search
          placeholder="기업명을 입력하세요..."
          placeholderTextColor="#3498db"
          value={company}
          onChangeText={setCompany}
          onSubmitEditing={handleKeyPress}
        />
        <TouchableImg onPress={handleSearch}>
          <SearchImg source={require("../../assets/search.png")} />
        </TouchableImg>
      </SearchContainer>
    </ViewSty>
  );
};

export default Home;
