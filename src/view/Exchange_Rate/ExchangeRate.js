import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import ToggleButton from './ToggleButton';
import LoadingIndicator from './LoadingIndicator';
import Chart from './chart';

const ExchangeRate = () => {
    const [exchangeData, setExchangeData] = useState([]);
    const [kospiData, setKospiData] = useState([]);
    const [kosdaqData, setKosdaqData] = useState([]);
    const [jpyData, setJpyData] = useState([]);
    const [eurData, setEurData] = useState([]);
    const [date, setDate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showExchange, setShowExchange] = useState(true);
    const [showKospi, setShowKospi] = useState(true);
    const [showKosdaq, setShowKosdaq] = useState(true);
    const [showJpy, setShowJpy] = useState(true);
    const [showEur, setShowEur] = useState(true);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const sampleData = (dataValues, step) => {
        return dataValues.filter((_, index) => index % step === 0);
    };

    const fetchData = async (type) => {
        setLoading(true);
        const apikey = '0OZKTKEUJ7DLWIZIB0QG';
        const proxyUrl = 'https://proxy.cors.sh/';
        const apiUrl = type === 'exchange'
            ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/731Y001/D/20150101/20221231/0000001`
            : type === 'kospi'
                ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/802Y001/D/20150101/20221231/0001000`
                : type === 'kosdaq'
                    ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/802Y001/D/20150101/20221231/0089000`
                    : type === 'jpy'
                        ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/731Y001/D/20150101/20221231/0000002`
                        : `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/1/100/731Y001/D/20150101/20221231/0000003`;

        try {
            let response = await axios.get(proxyUrl + apiUrl, {
                headers: {
                    "x-cors-api-key": 'temp_07deaae3c2fb0e69a950527caffb89e7',
                    "x-requested-with": "XMLHttpRequest"
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
                        const paginatedUrl = type === 'exchange'
                            ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/731Y001/D/20150101/20221231/0000001`
                            : type === 'kospi'
                                ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/802Y001/D/20150101/20221231/0001000`
                                : type === 'kosdaq'
                                    ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/802Y001/D/20150101/20221231/0089000`
                                    : type === 'jpy'
                                        ? `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/731Y001/D/20150101/20221231/0000002`
                                        : `https://ecos.bok.or.kr/api/StatisticSearch/${apikey}/json/kr/${start}/${end}/731Y001/D/20150101/20221231/0000003`;

                        requests.push(
                            axios.get(proxyUrl + paginatedUrl, {
                                headers: {
                                    "x-cors-api-key": 'temp_07deaae3c2fb0e69a950527caffb89e7',
                                    "x-requested-with": "XMLHttpRequest"
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

                    // 1초 지연 TooManyRequest 막기 위해 넣음
                    await delay(1000);
                }

                if (rows.length > 0) {
                    // 데이터 샘플링 및 유효성 검사
                    const step = Math.ceil(rows.length / 100); // 100개의 데이터 포인트만 표시
                    const sampledRows = sampleData(rows, step);
                    const dataValues = sampledRows.map((row) => {
                        const value = parseFloat(row.DATA_VALUE);
                        return isNaN(value) || !isFinite(value) ? 0 : value; // 유효한 숫자만 포함
                    });
                    const dates = sampledRows.map((row) => moment(row.TIME, 'YYYYMMDD').format('YYYY-MM-DD'));

                    if (type === 'exchange') {
                        setExchangeData(dataValues);
                    } else if (type === 'kospi') {
                        setKospiData(dataValues);
                    } else if (type === 'kosdaq') {
                        setKosdaqData(dataValues);
                    } else if (type === 'jpy') {
                        setJpyData(dataValues);
                    } else if (type === 'eur') {
                        setEurData(dataValues);
                    }
                    setDate(dates);
                }
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData('exchange');
        fetchData('kospi');
        fetchData('kosdaq');
        fetchData('jpy');
        fetchData('eur');
    }, []);

    const displayedDates = date.map((d, index) => (index % 10 === 0 ? d : ''));

    return (
        <ScrollView horizontal>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <ToggleButton onPress={() => setShowExchange(prev => !prev)}>Toggle Exchange</ToggleButton>
                    <ToggleButton onPress={() => setShowKospi(prev => !prev)}>Toggle Kospi</ToggleButton>
                    <ToggleButton onPress={() => setShowKosdaq(prev => !prev)}>Toggle Kosdaq</ToggleButton>
                    <ToggleButton onPress={() => setShowJpy(prev => !prev)}>Toggle JPY</ToggleButton>
                    <ToggleButton onPress={() => setShowEur(prev => !prev)}>Toggle EUR</ToggleButton>
                </View>
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    //차트 데이터가 로드 된 후에 차트를 로드해야지 오류가 발생하지 않기때문에 추가한 코드
                    exchangeData.length > 0 && kospiData.length > 0 && kosdaqData.length > 0 && jpyData.length > 0 && eurData.length > 0 ? (
                        <Chart
                            labels={displayedDates}
                            datasets={[
                                {
                                    data: showExchange ? exchangeData : [],
                                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                                    strokeWidth: 2
                                },
                                {
                                    data: showKospi ? kospiData : [],
                                    color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
                                    strokeWidth: 2
                                },
                                {
                                    data: showKosdaq ? kosdaqData : [],
                                    color: (opacity = 1) => `rgba(244, 65, 65, ${opacity})`,
                                    strokeWidth: 2
                                },
                                {
                                    data: showJpy ? jpyData : [],
                                    color: (opacity = 1) => `rgba(244, 215, 65, ${opacity})`,
                                    strokeWidth: 2
                                },
                                {
                                    data: showEur ? eurData : [],
                                    color: (opacity = 1) => `rgba(65, 105, 244, ${opacity})`,
                                    strokeWidth: 2
                                }
                            ]}
                            legend={[
                                showExchange ? "원/달러 환율" : "",
                                showKospi ? "KOSPI 지수" : "",
                                showKosdaq ? "KOSDAQ 지수" : "",
                                showJpy ? "원/엔 환율" : "",
                                showEur ? "원/유로 환율" : ""
                            ]}
                        />
                    ) : null
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3F3F3F',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default ExchangeRate;