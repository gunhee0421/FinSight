import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LoadingView } from '../../view/Serch/SerchStyle';
import axios from 'axios';
import NewsItem from './NewsItem';
import styled from 'styled-components/native';
import { key } from '../../api/API';

const NewsList = ({ navigation, title }) => {
  // articles: 뉴스 기사 데이터를 저장하는 상태.
  // loading: 데이터 로딩 여부를 나타내는 상태.
  // query: 사용자가 입력하는 검색 쿼리를 저장하는 상태.
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(title);

  // fetchData 함수는 API를 호출하여 뉴스 데이터를 가져오는 비동기 함수
  useEffect(() => {
    const fetchData = async () => {
      if (!query) return; // 검색어가 없으면 함수를 종료
      setLoading(true); // 로딩 상태를 true
      try {
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
        const formattedToday = today.toISOString().slice(0, 10);
        const formattedSevenDaysAgo = sevenDaysAgo.toISOString().slice(0, 10);

        const response = await axios.get(
          'https://newsapi.org/v2/everything', {
            params: {
              q: title,
              from: formattedSevenDaysAgo,
              to: formattedToday,
              sortBy: 'popularity',
              apiKey: 'd2c59ad03aa64c6ab4b98bc563945db3'
            }
          }
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.error(e); 
      }
      setLoading(false);
    };
    fetchData();
  }, [title])
  return (
    <Container>
      {loading ? (
        <LoadingView>
          <ActivityIndicator size="large" color="red"/>
        </LoadingView>
      ) : (
        <NewsContainer>
          {articles ? (
            articles.map((article, index) => (
              <NewsItem key={`${article.url}-${index}`} article={article} />
            ))
          ): <Text>뉴스가 없습니다.</Text>}
        </NewsContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 10px;
`
const NewsContainer = styled.View`
  flex: 1;
`
const ItemContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default NewsList;
