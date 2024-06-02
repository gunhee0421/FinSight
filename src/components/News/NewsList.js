import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NewsItem from './NewsItem';
import styled from 'styled-components/native';

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
        const response = await axios.get(
          'https://newsapi.org/v2/everything', {
            params: {
              q: title, // 사용자가 입력한 검색어
              from: '2024-05-29', // 검색 시작 날짜
              sortBy: 'popularity', // 결과를 인기도 순으로 정렬
              apiKey: 'd2c59ad03aa64c6ab4b98bc563945db3' // API 키
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
  }, [])
  return (
    <Container>
      {loading ? (
        <ItemContainer>
          <ActivityIndicator size="large" />
        </ItemContainer>
      ) : (
        <NewsContainer>
          {articles && (
            articles.map((article) => (
              <NewsItem key={article.url} article={article} />
            ))
          )}
        </NewsContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  height: 100vh;
  flex: 1;
  padding-top: 10px;
`
const NewsContainer = styled.View`
  height: 100vh;
  flex: 1;
`
const ItemContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default NewsList;
