
import React, { Component } from 'react';
import { View, Text, Image, Appearance } from 'react-native';
import {WebView} from 'react-native-webview'
const colorScheme = Appearance.getColorScheme();

export default class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <WebView
         renderLoading={() => <ActivityIndicator size="large" color="#0000ff" /> }
            source={{uri:'http://45.79.111.106/rudo/rudo_privacy_policy.pdf'}}
            style={{ marginTop: 0 }}
        />
      </View>
    );
  }
}
