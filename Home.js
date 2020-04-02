
import React, { Component } from 'react';
import { View, Text, Image, Appearance } from 'react-native';
const colorScheme = Appearance.getColorScheme();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? 'black' : "white" }}>
        {colorScheme === 'dark' ?
          <Text style={{ fontSize: 24, color: 'white' }}>
            Hello World!
          </Text> :
          <Text onPress={()=>this.props.navigation.navigate('Browser')} style={{ fontSize: 24 }}>
            Hello World!
          </Text>
         
        }
        
      </View>
    );
  }
}
