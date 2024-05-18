import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import axios from 'axios';
import { proxy } from "./src/api/API"; // proxy 설정이 포함된 경로

const App = () => {
  const [dataValue, setDataValue] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let rows = [];
      const apikey = '0OZKTKEUJ7DLWIZIB0QG'; // 여기에 API 키를 입력하세요.
      let url = `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/731Y001/D/20100101/20221231/0000001`;

      try {
        // 프록시를 사용하여 요청
          let response = await axios.get(`${proxy}${url}`); // 수정된 부분
        let result = response.data;
        let listTotalCount = parseInt(result.StatisticSearch.list_total_count);
        let listCount = Math.floor(listTotalCount / 100) + 1;

        for (let i = 0; i < listCount; i++) {
          let start = i * 100 + 1;
          let end = (i + 1) * 100;
          url = `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/731Y001/D/20100101/20221231/0000001`;
          response = await axios.get(`${proxy}${url}`); // 프록시를 사용하여 요청, 수정된 부분
          result = response.data;
          rows = rows.concat(result.StatisticSearch.row);
        }

        const dataValues = rows.map((row) => parseFloat(row.DATA_VALUE));
        const dates = rows.map((row) => moment(row.TIME, 'YYYYMMDD').format('YYYY-MM-DD'));

        setDataValue(dataValues);
        setDate(dates);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchData();
  }, []);

  return (
      <ScrollView>
        <View>
          {dataValue.length > 0 && (
              <LineChart
                  data={{
                    labels: date,
                    datasets: [
                      {
                        data: dataValue,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width} // from react-native
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
              />
          )}
        </View>
      </ScrollView>
  );
};

export default App;
