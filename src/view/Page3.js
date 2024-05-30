import { ViewSty, GView, TextG, TextSty, Rec, SkipText } from "./PageStyle";
import { View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Button from "../component/Button";

const Page3 = ({ navigation }) => {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const checkVisited = async () => {
      const hasVisited = await AsyncStorage.getItem("page3Visited");
      if (hasVisited) {
        setVisited(true);
        navigation.navigate("Home");
      } else {
        await AsyncStorage.setItem("page3Visited", "true");
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
          <TextSty>기업과</TextSty>
          <Image
            source={require("../../assets/building.png")}
            style={{ width: 35, height: 38 }}
          />
        </TextG>
        <TextG>
          <Image
            source={require("../../assets/Red-heart.gif")}
            style={{ width: 45, height: 45 }}
          />
          <TextSty>관련한</TextSty>
        </TextG>
        <TextG>
          <TextSty>뉴스 검색까지!</TextSty>
          <Image
            source={require("../../assets/news.png")}
            style={{ width: 48, height: 48 }}
          />
        </TextG>
      </GView>
      <Image
        source={require("../../assets/Star-struck.gif")}
        style={{
          width: 120,
          height: 118,
          transform: "rotate(18deg)",
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
          <Rec />
          <Rec />
          <Rec style={{ backgroundColor: "#0A265B" }} />
        </View>
        <Button title="시작하기" onPress={() => navigation.navigate("Home")} />
        <TouchableOpacity>
          <SkipText onPress={() => navigation.navigate("Home")}>Skip</SkipText>
        </TouchableOpacity>
      </View>
    </ViewSty>
  );
};

export default Page3;
