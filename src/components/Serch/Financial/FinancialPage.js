import { useContext, useEffect, useMemo, useState } from "react";
import {
  BodyView,
  BodyTitle,
  BodyTitleText,
  Icon,
  Card,
  CardList,
  CardListOne,
  CardTitle,
  CardNumber,
  CardTop,
  FooterView,
  FooterBox,
  FooterBoxText,
  FooterText,
  Reactangle,
  LoadingView
} from "../../../view/Serch/SerchStyle";
import getStockNumber from "../../../api/getStockNumber";
import BigNumber from "bignumber.js";
import FormatBinNumber from "./FormatBinNumber";
import Info from "./Info";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Platform } from "react-native";

let dumyPercent
const FinancialPage = ({ crop, state, price }) => {

  const Cards = ({title, value}) => {

    return (
      <Card>
        <CardTop>
          <CardTitle>{title}</CardTitle>
          <TouchableOpacity onPress={() => {
            setClick(!click);
            setTitle(title);
          }}>
            <Icon source={require("../../../../assets/image/Icon2.png")} alt="icon"/>
          </TouchableOpacity>
        </CardTop>
        <CardNumber>{value}</CardNumber>
      </Card>
    );
  };

  const [click, setClick] = useState(false);
  const [title, setTitle] = useState(null);

  const [totalMoney, setTotalMoney] = useState(null);
  const [netIncon, setNetIncon] = useState(null);
  const [allMoney, setAllMoney] = useState(null);
  const [gainMoney, setGainMoney] = useState(null);
  const [per, setPER] = useState(null);
  const [pbr, setPBR] = useState(null);
  const [eps, setEPS] = useState(null);
  const [roe, setROE] = useState(null);
  const [STOCK, setSTOCK] = useState(null);
  const [percent, setPercent] = useState(null);


  useEffect(() => {
    const fetchData = async() => {
      // 1. 시가 총액
      const StockNumberData = await getStockNumber(crop[0]);
      let totalStocksString;
      if (StockNumberData?.list[1]?.se == "우선주"){
        totalStocksString = StockNumberData?.list[2]?.istc_totqy.replace(/,/g, ''); // 발행 총 주식
      } else{
        totalStocksString = StockNumberData?.list[0]?.istc_totqy.replace(/,/g, ''); // 발행 총 주식

      }

      const n1 = new BigNumber(totalStocksString);
      const n2 = new BigNumber(parseInt(price));
      const value = n1.multipliedBy(n2);

      // 2. 당기순이익
      const StocknetIncon = state?.list[12]?.thstrm_amount.replace(/,/g, ''); // 당기 순이익

      // 3. PER
      const BigTotalMoney = new BigNumber(value); //시가총액
      const BigNetIncon = new BigNumber(StocknetIncon); // 당기순이익
      const stockPer = BigTotalMoney.dividedBy(BigNetIncon);

      // 4. PBR
      const netWorth = state?.list[8]?.thstrm_amount.replace(/,/g, ''); // 자본총계(순자산)
      const stockPbr = BigTotalMoney.dividedBy(netWorth);

      // 자본총계 allMoney
      setAllMoney(FormatBinNumber(netWorth));

      // 매출액
      setGainMoney(FormatBinNumber(state?.list[9]?.thstrm_amount.replace(/,/g, '')))

      // 5. EPS
      const istc_totqy = StockNumberData?.list[0]?.istc_totqy.replace(/,/g, ''); 
      const BigIstc_totqy = new BigNumber(istc_totqy); // 유통주식 수 
      const stockEPS = BigNetIncon.dividedBy(BigIstc_totqy);

      // 6. ROE
      const n3 = BigNetIncon.dividedBy(netWorth);
      const n4 = new BigNumber(100);
      const stockRoe = n3.multipliedBy(n4);

      // 7. STOCK
      const stockprice = stockPer.multipliedBy(stockEPS);
      const dumyText = new BigNumber(stockprice.toFixed(0));
      const pointText = dumyText.toFixed(0).toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

      dumyPercent = dumyText.minus(n2).dividedBy(n2).multipliedBy(n4).toFixed(2);
      setPercent(dumyPercent);

      const resultText = `${pointText}원\n${dumyPercent}%`

      setTotalMoney(FormatBinNumber(value));
      setNetIncon(FormatBinNumber(StocknetIncon));
      setPER(`${stockPer.toFixed(2).toString()}배`);
      setPBR(`${stockPbr.toFixed(2).toString()}배`);
      setEPS(`${FormatBinNumber(stockEPS.toFixed(0))}원`);
      setROE(`${stockRoe.toFixed(2).toString()}%`);
      setSTOCK(resultText);
    }
    fetchData();
  }, [crop, price])

  if ( title == "PER") { setTitle(`PER(주가 수익 비율)`); }
  else if ( title == "PBR") { setTitle(`PBR(주가 순자산 비율)`); }
  else if ( title == "EPS") { setTitle(`EPS(주당 순이익)`); }
  else if ( title == "ROE") { setTitle(`ROE(자기자본 이익율)`); }

  return (
    <>
      {STOCK != null ? <>
        <BodyView>
          <BodyTitle>
            <BodyTitleText>{title != null ? title : "투자 지표"}</BodyTitleText>
            <TouchableOpacity onPress={() => {
              setClick(!click);
              setTitle(null);
            }}>
              <Icon source={require("../../../../assets/image/Icon.png")} alt="icon" />
            </TouchableOpacity>
          </BodyTitle>
          { !click ? <CardList>
            <CardListOne>
              {totalMoney != null && <Cards title="시가총액" value={totalMoney} />}
              {netIncon != null && <Cards title="당기순이익" value={netIncon} />}
            </CardListOne>
            <CardListOne>
              {allMoney != null && <Cards title="자본총계" value={allMoney} />}
              {gainMoney != null && <Cards title="매출액" value={gainMoney} />}
            </CardListOne>
            <CardListOne>
              {per != null && <Cards title="PER" value={per} />}
              {pbr != null && <Cards title="PBR" value={pbr} />}
            </CardListOne>
            <CardListOne>
              {eps != null && <Cards title="EPS" value={eps} />}
              {roe != null && <Cards title="ROE" value={roe} />}
            </CardListOne>
          </CardList> : <Info title={title} />}

          <Reactangle
            source={require("../../../../assets/image/Rectangle.png")}
            alt="reactangle"
          />
        </BodyView>
        <FooterView>
          <FooterText>적정 주가</FooterText>
          <FooterBox>
            {percent != null &&  <FooterBoxText percent={percent}>{`${STOCK}`}</FooterBoxText>}
          </FooterBox>
        </FooterView>
      </> : <LoadingView><ActivityIndicator size="large" color="red" /></LoadingView>}
    </>
  );
};

export default FinancialPage;
