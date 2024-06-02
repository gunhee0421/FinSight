import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsList = ({ navigation }) => {
  // articles: 뉴스 기사 데이터를 저장하는 상태.
  // loading: 데이터 로딩 여부를 나타내는 상태.
  // query: 사용자가 입력하는 검색 쿼리를 저장하는 상태.
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  // fetchData 함수는 API를 호출하여 뉴스 데이터를 가져오는 비동기 함수
  const fetchData = async () => {
    if (!query) return; // 검색어가 없으면 함수를 종료
    setLoading(true); // 로딩 상태를 true
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/everything', {
          params: {
            q: query, // 사용자가 입력한 검색어
            from: '2024-05-29', // 검색 시작 날짜
            sortBy: 'popularity', // 결과를 인기도 순으로 정렬
            apiKey: 'd2c59ad03aa64c6ab4b98bc563945db3' // API 키
          }
        }
      );
      setArticles(response.data.articles); // 응답으로 받은 기사 데이터를 상태에 저장
    } catch (e) {
      console.error(e); 
    }
    setLoading(false); // 데이터 로딩이 완료되면 로딩 상태 false
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>뉴스</Text> 
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="검색할 키워드를 입력하세요"
          value={query}
          onChangeText={setQuery} // 입력 필드 값이 변경될 때마다 query 상태를 업데이트
        />
        <Button title="검색" onPress={fetchData} /> {/* 검색 버튼. 클릭 시 fetchData 함수를 호출 */}
      </View>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" /> {/* 로딩 중일 때 로딩 인디케이터를 표시 */}
        </View>
      ) : (
        <ScrollView style={styles.newsListBlock}>
          {articles ? (
            articles.map((article) => (
              <NewsItem key={article.url} article={article} /> // 각 기사에 대해 NewsItem 컴포넌트를 렌더링
            ))
          ) : (
            <Text>검색 결과가 없습니다.</Text> 
          )}
        </ScrollView>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  newsListBlock: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsList;
