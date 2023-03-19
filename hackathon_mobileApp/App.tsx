import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import StackNavigation from './src/config/stack_navigation';
import Home from './src/screens/home';
// import Login from './src/screens/login';

function App() {
  return <StackNavigation />;
  // return <Home />;
}

export default App;
