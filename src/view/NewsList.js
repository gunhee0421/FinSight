import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NewsItem from './NewsItem'; // NewsItem 컴포넌트를 임포트합니다.

const NewsList = ({ navigation }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/everything', {
          params: {
            q: query,
            from: '2024-05-29',
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>뉴스</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="검색할 키워드를 입력하세요"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="검색" onPress={fetchData} />
      </View>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView style={styles.newsListBlock}>
          {articles ? (
            articles.map((article) => (
              <NewsItem key={article.url} article={article} />
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
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
