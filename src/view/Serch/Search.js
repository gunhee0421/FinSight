import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect, useState } from "react";
import {SearchView, HeaderView, Reactangle, HeaderText, HeaderNumber, BodyView, LoadingView} from "./SerchStyle";
import { ActivityIndicator, ScrollView } from "react-native";
import FinancialPage from "../../components/Serch/Financial/FinancialPage";
import getFinacialNumber from "../../api/getFinacialNumber";
import getFinacialStatement from "../../api/getFinacialStatement";
import getCurPrice from "../../api/getCurPrice";
import Nav from "../../components/Serch/Financial/Navigation";

const Header = ({title, number, percent}) => {
  const text = number.toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return(
      <HeaderView>
        <HeaderText>{title}</HeaderText>
        <HeaderNumber percent={percent}>{text}</HeaderNumber>
      </HeaderView>
  )
};

const Search = ({navigation, route}) => {
  const [index, setIndex] = useState(1);
  const [crop, setCrop] = useState(null);
  const [state, setState] = useState(null);
  const [curPrice , setCurPrice] = useState(null);

  const {company} = route.params;

  useEffect(() => {
    list = [company[1], company[2]]
    setCrop(list);
  }, []);

  useEffect(() => {
    const fetchData = async() => {
      if(crop != null) {
        const stateData = await getFinacialStatement(crop[0]);
        setState(stateData);

        const priceData = await getCurPrice(crop[1]);
        
        const curData = priceData?.response?.body?.items?.item[0]?.clpr;
        const preData = priceData?.response?.body?.items?.item[1]?.clpr;
        const percent = ((curData - preData) / preData) * 100;
        const list = [curData, percent.toFixed(2)];

        setCurPrice(list);
      }
    }
    fetchData();
  }, [crop]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 120,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTitleAlign: 'center',
      headerTitle: () => (curPrice != null ? <Header title={company[0]} number={`${curPrice[0]}원\n${curPrice[1]}%`} percent={curPrice[1]}/> : null),
  })
  }, [navigation, curPrice])

  return(
    <ScrollView >
      {state != null && curPrice != null ? 
      <SearchView>
        <HeaderView>
          <Nav index={index} setIndex={setIndex} />
          <Reactangle source={require("../../../assets/image/Rectangle.png")} alt="reactangle" />
        </HeaderView>
        {index == 1 && <FinancialPage crop={crop} state={state} price={curPrice} />}
      </SearchView> : <LoadingView><ActivityIndicator size="large" color="red"/></LoadingView>}
    </ScrollView>
  );
}

export default Search;
