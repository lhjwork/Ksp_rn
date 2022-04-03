import React, {useEffect, useState} from 'react';

import {WebView} from 'react-native-webview';

const DeliveryTracking = () => {
  return (
    <WebView
      source={{
        uri: 'http://info.sweettracker.co.kr/tracking/5?t_key=9UXmhSfurZgTKuplPj53zA&t_code=01&t_invoice=6026700539577',
      }}
    />
  );
};

export default DeliveryTracking;
