import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Card, Button, Paragraph } from 'react-native-paper';

const AboutScreen = () => {
  const openGitHub = () => {
    Linking.openURL('https://github.com/yourusername');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>News Feed App</Text>
          <Paragraph style={styles.paragraph}>
            This is a simple React Native application built to demonstrate:
          </Paragraph>
          <Text style={styles.bullet}>• Drawer Navigation</Text>
          <Text style={styles.bullet}>• Card Components</Text>
          <Text style={styles.bullet}>• State Management</Text>
          <Text style={styles.bullet}>• Responsive Layouts</Text>
          
          <Paragraph style={[styles.paragraph, { marginTop: 20 }]}>
            Built with React Native, React Navigation, and React Native Paper.
          </Paragraph>
        </Card.Content>
        
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={openGitHub}>
            View on GitHub
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  actions: {
    justifyContent: 'center',
    paddingVertical: 16,
  },
});

export default AboutScreen;