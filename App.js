import { StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';
import Home from './src/view/Home/Home';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { SearchView } from './src/view/Serch/SerchStyle';
import Search from './src/view/Serch/Search';
import Page1 from "./src/view/Home/Page1";
import Page2 from "./src/view/Home/Page2";
import Page3 from "./src/view/Home/Page3";

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
        <Stack.Screen name='page1' component={Page1} options={{headerShown: false, }} />
        <Stack.Screen name='page2' component={Page2} options={{headerShown: false, }} />
        <Stack.Screen name='page3' component={Page3} options={{headerShown: false, }} />
        <Stack.Screen name="home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


