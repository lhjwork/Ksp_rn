import React, {useEffect, useState} from 'react';

import {WebView} from 'react-native-webview';
import {SWEET_TRACKER_API} from '../../key';

const DeliveryTracking = ({route}) => {
  const {t_invoice, t_code} = route.params;

  return (
    <WebView
      source={{
        uri: `http://info.sweettracker.co.kr/tracking/5?t_key=${SWEET_TRACKER_API}&t_code=${t_code}&t_invoice=${t_invoice}`,
      }}
    />
  );
};

export default DeliveryTracking;
