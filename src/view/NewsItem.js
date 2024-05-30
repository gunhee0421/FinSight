import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <View style={styles.newsItemBlock}>
      {urlToImage && (
        <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.thumbnail}>
          <Image source={{ uri: urlToImage }} style={styles.image} />
        </TouchableOpacity>
      )}
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


