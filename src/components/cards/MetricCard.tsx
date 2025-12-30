import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon = '📊', 
  color = '#2196F3' 
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    minWidth: 150,
    elevation: 3,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default MetricCard;