import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List, Switch } from 'react-native-paper';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>App Settings</List.Subheader>
        
        <List.Item
          title="Dark Mode"
          description="Enable dark theme for the app"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={() => setIsDarkMode(!isDarkMode)}
            />
          )}
        />
        
        <List.Item
          title="Push Notifications"
          description="Receive app notifications"
          left={() => <List.Icon icon="bell" />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={() => setNotifications(!notifications)}
            />
          )}
        />
        
        <List.Item
          title="App Version"
          description="v1.0.0"
          left={() => <List.Icon icon="information" />}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default SettingsScreen;