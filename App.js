import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/view/Home';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { SearchView } from './src/view/Serch/SerchStyle';
import Search from './src/view/Serch/Search';

const Stack = createStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="search" component={Search}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}