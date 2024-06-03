import { ViewSty, GView, TextG, TextSty, Rec, SkipText } from "./PageStyle";
import { View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

const Page1 = ({ navigation }) => {
  const [visited, setVisited] = useState(false);

  // 페이지 마운트시 모든 설명 페이지 접속 기록 삭제 : 앱을 닫았다 열시에도 안열림 로컬 스토리지에 저장되어서
  useEffect( () => {
    const fetchData = async() => {
      await AsyncStorage.removeItem("page1Visited");
      await AsyncStorage.removeItem("page2Visited");
      await AsyncStorage.removeItem("page3Visited");
    }
    fetchData();
  }, [])

  useEffect(() => {
    const checkVisited = async () => {
      const hasVisited = await AsyncStorage.getItem("page1Visited");
      if (hasVisited) {
        setVisited(true);
        navigation.navigate("page2", {screen: "Page2"});
      } else {
        await AsyncStorage.setItem("page1Visited", "true");
      }
    };
    checkVisited();
  }, [navigation]);

  if (visited) {
    return null;
  }

  return (
    <ViewSty>
      <GView>
        <TextG>
          <TextSty>초보자도</TextSty>
          <Image
            source={require("../../../assets/person.png")}
            style={{ width: 45, height: 45 }}
          />
        </TextG>
        <TextG>
          <Image
            source={require("../../../assets/easy.png")}
            style={{ width: 42, height: 42 }}
          />
          <TextSty>쉽게 알아가는</TextSty>
        </TextG>
        <TextG>
          <TextSty>주식 정보</TextSty>
          <Image
            source={require("../../../assets/stock.png")}
            style={{ width: 50, height: 50, marginLeft: 5 }}
          />
        </TextG>
      </GView>
      <Image
        source={require("../../../assets/Grin.gif")}
        style={{
          width: 120,
          height: 116,
          transform: "rotate(17deg)",
          marginLeft: 160,
          marginTop: 30,
        }}
      />
      <View
        style={{
          alignItems: "center",
          gap: 23,
          marginTop: 50,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Rec style={{ backgroundColor: "#0A265B" }} />
          <Rec />
          <Rec />
        </View>
        <Button title="다음" onPress={() => navigation.navigate("page2", {screen: "Page2"})} />
        <TouchableOpacity>
          <SkipText onPress={() => navigation.navigate("home", {screen: "Home"})}>Skip</SkipText>
        </TouchableOpacity>
      </View>
    </ViewSty>
  );
};

export default Page1;
