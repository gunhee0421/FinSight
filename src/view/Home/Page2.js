import { ViewSty, GView, TextG, TextSty, Rec, SkipText } from "./PageStyle";
import { View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

const Page2 = ({ navigation }) => {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const checkVisited = async () => {
      const hasVisited = await AsyncStorage.getItem("page2Visited");
      if (hasVisited) {
        setVisited(true);
        navigation.navigate("page3", {screen: "Page3"});
      } else {
        await AsyncStorage.setItem("page2Visited", "true");
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
          <TextSty>한번의</TextSty>
          <Image
            source={require("../../../assets/Balloon.gif")}
            style={{ width: 45, height: 45 }}
          />
        </TextG>
        <TextG>
          <TextSty>기업 검색으로</TextSty>
          <Image
            source={require("../../../assets/touch.png")}
            style={{ width: 70, height: 50 }}
          />
        </TextG>
      </GView>
      <Image
        source={require("../../../assets/page.png")}
        style={{ borderRadius: 67, width: 222, height: 226 }}
      />
      <View
        style={{
          alignItems: "center",
          gap: 23,
          marginTop: 35,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Rec />
          <Rec style={{ backgroundColor: "#0A265B" }} />
          <Rec />
        </View>
        <Button title="다음" onPress={() => navigation.navigate("page3", {screen: "Page3"})} />
        <TouchableOpacity>
          <SkipText onPress={() => navigation.navigate("home", {screen: "Home"})}>Skip</SkipText>
        </TouchableOpacity>
      </View>
    </ViewSty>
  );
};

export default Page2;
