import { useState, useEffect } from "react";
import getFinacialNumber from "../api/getFinacialNumber";
import getFinacialStatement from "../api/getFinacialStatement";
import { Button, Text, View } from "react-native";

// 처음 홈 화면 입니다.
const Home= ({navigation}) => {

  return (
    <View>
      <Button
        title="next"
        onPress={() => navigation.navigate("search")} />
    </View>
  );
};


export default Home;