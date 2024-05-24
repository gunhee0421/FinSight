import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import axios from 'axios';

const App = () => {
    const [dataValue, setDataValue] = useState([]);
    const [date, setDate] = useState([]);
    const [loading, setLoading] = useState(true);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchData = async () => {
            const apikey = '0OZKTKEUJ7DLWIZIB0QG'; // 여기에 API 키를 입력하세요.
            const proxyUrl = 'https://proxy.cors.sh/';
            const initialApiUrl = `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/731Y001/D/20150101/20221231/0000001`;

            try {
                let response = await axios.get(proxyUrl + initialApiUrl, {
                    headers: {
                        "x-cors-api-key": `temp_07deaae3c2fb0e69a950527caffb89e7`,
                    }
                });

                if (response.data && response.data.StatisticSearch) {
                    const listTotalCount = parseInt(response.data.StatisticSearch.list_total_count);
                    const listCount = Math.ceil(listTotalCount / 100);

                    let rows = [];
                    for (let i = 0; i < listCount; i += 10) {
                        const requests = [];
                        for (let j = i; j < i + 10 && j < listCount; j++) {
                            const start = j * 100 + 1;
                            const end = (j + 1) * 100;
                            const paginatedUrl = `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/731Y001/D/20150101/20221231/0000001`;

                            requests.push(
                                axios.get(proxyUrl + paginatedUrl, {
                                    headers: {
                                        "x-cors-api-key": 'temp_07deaae3c2fb0e69a950527caffb89e7',
                                    }
                                })
                            );
                        }

                        try {
                            const responses = await Promise.all(requests);
                            responses.forEach(paginatedResponse => {
                                if (paginatedResponse.data && paginatedResponse.data.StatisticSearch && paginatedResponse.data.StatisticSearch.row) {
                                    rows = rows.concat(paginatedResponse.data.StatisticSearch.row);
                                }
                            });
                        } catch (error) {
                            console.error(`Error fetching data:`, error);
                        }

                        // 1초 지연
                        await delay(1000);
                    }

                    if (rows.length > 0) {
                        // 데이터 샘플링 및 유효성 검사
                        const step = Math.ceil(rows.length / 100); // 100개의 데이터 포인트만 표시
                        const dataValues = rows.filter((_, index) => index % step === 0)
                            .map((row) => {
                                const value = parseFloat(row.DATA_VALUE);
                                return isNaN(value) ? 0 : value;
                            });
                        const dates = rows.filter((_, index) => index % step === 0)
                            .map((row) => moment(row.TIME, 'YYYYMMDD').format('YYYY-MM-DD'));

                        setDataValue(dataValues);
                        setDate(dates);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 날짜 라벨 간격 조정
    const displayedDates = date.map((d, index) => (index % 10 === 0 ? d : ''));

    return (
        <ScrollView horizontal>
            <View>
                {loading ? (
                    <View><Text>Loading...</Text></View>
                ) : (
                    <LineChart
                        data={{
                            labels: displayedDates,
                            datasets: [
                                {
                                    data: dataValue,
                                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                    strokeWidth: 2 // optional
                                },
                            ],
                            legend: ["원/달러 환율"] // optional
                        }}
                        width={Dimensions.get('window').width * 2} // from react-native, width increased for better readability
                        height={400} // height increased for better readability
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={{
                            backgroundColor: '#626262FF',
                            backgroundGradientFrom: '#3F3F3FFF',
                            backgroundGradientTo: '#2c2c2c',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '3',
                                strokeWidth: '1',
                                stroke: '#3F3F3FFF',
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
