// NewsItem.js 파일은 뉴스 항목을 표시하기 위한 구성요소(Component)를 구현하는 코드입니다.
//  각 뉴스 아이템은 이미지 썸네일, 제목, 설명으로 구성되어 있고, 이미지를 클릭하면 해당 뉴스 기사의 URL로 연결됩니다.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'; 
import styled from 'styled-components/native';

// NewsItem 컴포넌트는 article 객체를 prop으로 받아옵니다.
const NewsItem = ({ article }) => {

  console.log(article);

  const { title, description, url, urlToImage } = article;

  return (
    <NewItemBlock>
      {urlToImage && (
        <Thumbnail onTouchEnd={() => Linking.openURL(url)}>
          <NewsImage source={{ uri: urlToImage }}/>
        </Thumbnail>
      )}
      <Contents>
        <Title>{title}</Title> 
        <Description>{description}</Description> 
      </Contents>
    </NewItemBlock>
  );
};

const NewItemBlock = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`
const Thumbnail = styled.View`
  margin-right: 10px;
`
const NewsImage = styled.Image`
  width: 160px;
  height: 100px;
`
const Contents = styled.View`
  flex: 1;
  justify-content: center;
`
const Title = styled.Text`
  border: 1px solid pink;
  font-weight: bold;
  color: black;
  font-size: 16;
`
const Description = styled.Text`
  border: 1px solid pink;
  font-size: 14px;
  color: black;
  margin-top: 5px;
`

export default NewsItem;
