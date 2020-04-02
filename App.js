
import React, { Component } from 'react';
import { View, Text, Image, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import BrowserScreen from './Browser';

const colorScheme = Appearance.getColorScheme();
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Browser" component={BrowserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}
