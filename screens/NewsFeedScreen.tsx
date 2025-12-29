import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ListRenderItemInfo } from 'react-native';

// Define a TypeScript type for your article data
export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt?: Date;
  category?: string;
}

import NewsCard from '../components/NewsCard';

const NewsFeedScreen: React.FC = () => {
  // Type the state with Article[] (array of Article objects)
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API fetch with typed data
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
    // Navigation would go here
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Add a loading component */}
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
});

export default NewsFeedScreen;