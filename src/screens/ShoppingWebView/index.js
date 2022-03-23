import React from 'react';

import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const ShoppingWebView = ({navigation, route}) => {
  const {item} = route?.params;
  return <WebView source={{uri: item?.url}} />;
};

export default ShoppingWebView;
