import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const DeliveryTracking = () => {
  useEffect(() => {
    let body = {};
  }, []);
  return <WebView source={{uri: 'https://www.naver.com/'}} />;
};

export default DeliveryTracking;
