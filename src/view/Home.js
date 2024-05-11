import { useState, useEffect } from "react";
import getFinacialNumber from "../api/getFinacialNumber";
import getFinacialStatement from "../api/getFinacialStatement";
import { Text } from "react-native";

const Home= (props) => {
  
  const code = getFinacialNumber(props.finacial);
  const data = getFinacialStatement(code);

  return(
    <>
    {code}
    </>
  );
}

export default Home;