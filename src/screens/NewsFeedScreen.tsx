// src/screens/NewsFeedScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator, 
  Text 
} from 'react-native';
import NewsCard from '../components/NewsCard';

// Define the article type locally
interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt?: Date;
  category?: string;
}

// REMOVE props from the component definition
const NewsFeedScreen: React.FC = () => {  // No props here
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const mockData: Article[] = [
      {
        id: '1',
        title: 'Getting Started with React Native',
        description: 'A comprehensive guide to building your first mobile app.',
        imageUrl: 'https://picsum.photos/700/400?random=1',
        publishedAt: new Date('2024-01-15'),
        category: 'Tutorial',
      },
      {
        id: '2',
        title: 'Mastering TypeScript in React Native',
        description: 'Learn how to add type safety to your mobile apps.',
        imageUrl: 'https://picsum.photos/700/400?random=2',
        publishedAt: new Date('2024-01-10'),
        category: 'Advanced',
      },
    ];
    
    setTimeout(() => {
      setArticles(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleReadNow = (articleId: string) => {
    console.log(`Reading article: ${articleId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#1e88e5" />
        <Text style={styles.loadingText}>Loading articles...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onReadNow={() => handleReadNow(article.id)}
            onReadLater={() => console.log('Saved for later:', article.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});

export default NewsFeedScreen;