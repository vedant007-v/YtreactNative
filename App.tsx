import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer, NavigationContainerProps } from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

// Import screens with proper typing
import NewsFeedScreen from './screens/NewsFeedScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';

// Define types for navigation parameters
export type RootDrawerParamList = {
  NewsFeed: undefined; // No parameters expected
  Settings: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

// Type the screen options
const screenOptions: DrawerNavigationOptions = {
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

const App: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="NewsFeed" 
          screenOptions={screenOptions}
        >
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

export default App;