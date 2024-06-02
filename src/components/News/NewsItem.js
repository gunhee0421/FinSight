// NewsItem.js 파일은 뉴스 항목을 표시하기 위한 구성요소(Component)를 구현하는 코드입니다.
//  각 뉴스 아이템은 이미지 썸네일, 제목, 설명으로 구성되어 있고, 이미지를 클릭하면 해당 뉴스 기사의 URL로 연결됩니다.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'; 

// NewsItem 컴포넌트는 article 객체를 prop으로 받아옵니다.
const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;

  return (
    <View style={styles.newsItemBlock}>
      {/* urlToImage가 존재할 경우에만 이미지 표시. */}
      {urlToImage && (
        <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.thumbnail}>
          {/* 썸네일 이미지 표시. uri를 사용하여 이미지 주소를 지정. */}
          <Image source={{ uri: urlToImage }} style={styles.image} />
        </TouchableOpacity>
      )}
      {/* 뉴스 제목과 설명 */}
      <View style={styles.contents}>
        <Text style={styles.title}>{title}</Text> 
        <Text style={styles.description}>{description}</Text> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newsItemBlock: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  thumbnail: {
    marginRight: 10,
  },
  image: {
    width: 160,
    height: 100,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default NewsItem;
