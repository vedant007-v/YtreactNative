import React from 'react';
import { StyleSheet, ImageSourcePropType } from 'react-native';
import { Card, Title, Paragraph, Button, CardProps } from 'react-native-paper';

// Define TypeScript interface for component props
interface NewsCardProps extends Omit<CardProps, 'mode' | 'elevation'> {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  article: {
    id: string;
    title: string;
    description: string;
    imageUrl: string | ImageSourcePropType;
    publishedAt?: Date; // Optional property
  };
  onReadLater?: () => void;
  onReadNow?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onReadLater,
  onReadNow,
  ...cardProps // Spread remaining Card props
}) => {
  return (
    <Card
      style={styles.card}
      {...cardProps}
      mode="elevated"
    >
      <Card.Cover
        source={typeof article.imageUrl === 'string'
          ? { uri: article.imageUrl }
          : article.imageUrl
        }
      />
      <Card.Content>
        <Title>{article.title}</Title>
        <Paragraph numberOfLines={2}>{article.description}</Paragraph>
        {article.publishedAt && (
          <Paragraph style={styles.timestamp}>
            {article.publishedAt.toLocaleDateString()}
          </Paragraph>
        )}
      </Card.Content>
      <Card.Actions>
        <Button onPress={onReadLater}>Read Later</Button>
        <Button onPress={onReadNow} mode="contained">Read Now</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});

export default NewsCard;