import { useState, Eff } from "react";
import getTotal from "../api/getFinacialStatement"

const Home= () => {
  let obj = getTotal("00126380");

  return(
    <></>
  );
}

export default Home;