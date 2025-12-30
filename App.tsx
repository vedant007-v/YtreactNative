import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Platform,
} from 'react-native';

// UPDATED IMPORTS: Mixed structure based on your setup
import NewsFeedScreen from './src/screens/NewsFeedScreen';      // In root: /screens/
import DashboardScreen from './src/screens/DashboardScreen'; // In src: /src/screens/
import SettingsScreen from './src/screens/SettingsScreen';   // In src: /src/screens/
import AboutScreen from './src/screens/AboutScreen';         // In src: /src/screens/

// Define types for navigation parameters
export type RootDrawerParamList = {
  Dashboard: undefined;
  NewsFeed: undefined;
  Settings: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Splash Screen Component (unchanged)
  const SplashScreen = () => {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <View style={styles.splashContent}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>User Insights Dashboard</Text>
          <Text style={styles.tagline}>Analyzing User Data</Text>
          <View style={styles.loadingIndicator}>
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
          </View>
        </View>
        <Text style={styles.footerText}>© 2024 Your Company</Text>
      </SafeAreaView>
    );
  };

  // Main App Navigation
  const MainApp = () => {
    const screenOptions = {
      drawerStyle: {
        backgroundColor: '#f8f9fa',
        width: 280,
      },
      drawerActiveTintColor: '#1e88e5',
      drawerInactiveTintColor: '#555',
      headerStyle: {
        backgroundColor: '#1e88e5',
      },
      headerTintColor: '#fff',
    };

    return (
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Dashboard"
            screenOptions={screenOptions}
          >
            <Drawer.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                drawerLabel: '📊 Dashboard',
                title: 'User Analytics Dashboard',
              }}
            />
            <Drawer.Screen
              name="NewsFeed"
              component={NewsFeedScreen}
              options={{ drawerLabel: '📰 News Feed' }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ drawerLabel: '⚙️ Settings' }}
            />
            <Drawer.Screen
              name="About"
              component={AboutScreen}
              options={{ drawerLabel: 'ℹ️ About' }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  };

  return isLoading ? <SplashScreen /> : <MainApp />;
};

// Styles (unchanged)
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 8 },
    }),
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 30,
  },
  loadingIndicator: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
    opacity: 0.6,
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
});

export default App;