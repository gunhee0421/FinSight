import { createStackNavigator } from "@react-navigation/stack";
import Finacial from "../components/Finacial";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import styled from "styled-components/native";

const SearchView = styled.View`
  background-color: white;
`
const HeaderView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
`
const HeaderTitle = styled.Text`
  font-size: 8px;
  color: gray;
  opacity: 0.8;
`
const HeaderNumber = styled.Text`
  font-size: 10px;
  color: red;
`

const Stack = createStackNavigator();

const Header = () => {
  return(
    <HeaderView>
      <HeaderTitle>삼성전자</HeaderTitle>
      <HeaderNumber>5000</HeaderNumber>
    </HeaderView>
  );
}

const Search = ({navigation}) => {
  const [index, setIndex] = useState(1);

  const company = "삼성전자";

  useEffect(() => {
    navigation.setOptions({
      title: "삼성전자",
      headerStyle: {
        height: 40,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTitleAlign: 'center',
      headerTitle: Header,
    })
  }, [navigation])

  return(
    <SearchView>
      <Navigation index={index} setIndex={setIndex} />
      {index==1 ? <Finacial company={company} /> : null}
    </SearchView>
  );
}



export default Search;