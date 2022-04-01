import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';

const DeliveryTracking = () => {
  useEffect(() => {
    let body = {};
    axios.get('http://info.sweettracker.co.kr', body);
  }, []);
  return <WebView source={{uri: 'https://www.naver.com/'}} />;
};

export default DeliveryTracking;
