import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import axios from 'axios';

const App = () => {
    const [dataValue, setDataValue] = useState([]);
    const [date, setDate] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let rows = [];
            const apikey = '0OZKTKEUJ7DLWIZIB0QG'; // 여기에 API 키를 입력하세요.
            const proxyUrl = 'https://proxy.cors.sh/';
            const apiUrl = `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/731Y001/D/20100101/20221231/0000001`;

            try {
                //폰에서는 proxy 없애야 동작함
                let response = await axios.get(proxyUrl + apiUrl, {
                    headers: {
                        "x-cors-api-key": `temp_26636be978b259b7e7a203bb4fce455c`,
                    }
                });

                if (response.data.StatisticSearch) {
                    let result = response.data;
                    let listTotalCount = parseInt(result.StatisticSearch.list_total_count);
                    let listCount = Math.floor(listTotalCount / 100) + 1;

                    for (let i = 0; i < listCount; i++) {
                        let start = i * 100 + 1;
                        let end = (i + 1) * 100;
                        let paginatedUrl = `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/731Y001/D/20100101/20221231/0000001`;
                        response = await axios.get(proxyUrl + paginatedUrl, {
                            headers: {
                                "x-cors-api-key": `temp_26636be978b259b7e7a203bb4fce455c`,
                            }
                        });
                        result = response.data;
                        rows = rows.concat(result.StatisticSearch.row);
                    }

                    // 데이터 샘플링
                    const step = Math.ceil(rows.length / 100); // 100개의 데이터 포인트만 표시
                    const dataValues = rows.filter((_, index) => index % step === 0).map((row) => parseFloat(row.DATA_VALUE));
                    const dates = rows.filter((_, index) => index % step === 0).map((row) => moment(row.TIME, 'YYYYMMDD').format('YYYY-MM-DD'));

                    setDataValue(dataValues);
                    setDate(dates);

                    console.log("Data Values:", dataValues);
                    console.log("Dates:", dates);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // 날짜 라벨 간격 조정
    const displayedDates = date.map((d, index) => (index % 10 === 0 ? d : ''));

    return (
        <ScrollView horizontal>
            <View>
                {dataValue.length > 0 ? (
                    <LineChart
                        data={{
                            labels: displayedDates,
                            datasets: [
                                {
                                    data: dataValue,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 2} // from react-native, width increased for better readability
                        height={400} // height increased for better readability
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
                                r: '3',
                                strokeWidth: '1',
                                stroke: '#ffa726',
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                ) : (
                    <View><Text>Loading...</Text></View>
                )}
            </View>
        </ScrollView>
    );
};

export default App;
