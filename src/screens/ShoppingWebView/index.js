import React, {useRef, useState, createRef} from 'react';

import {
  Alert,
  BackHandler,
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import api from '../../api';
import {config} from '../../constant';
import {resetNavigation} from '../../utils';

const INJECTED_CODE = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage('navigationStateChange');
      return res;
    }
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage('navigationStateChange');
  });
})();

true;
`;

const ShoppingWebView = ({navigation, route}) => {
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const ref = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  console.log('user', auth);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (ref.current && canGoBack) {
          ref.current.goBack();
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [canGoBack]),
  );
  const onPayment = async (body, imp_uid) => {
    body.imp_uid = imp_uid;
    body.sessionToken = sessionToken;
    try {
      const res = await api.post(`paymentupdate`, JSON.stringify(body), config);
      console.log('res,구매연동', res);
      Alert.alert('결제가 완료되었습니다.');
      resetNavigation(navigation, 'DrawerStack');
    } catch (e) {
      console.log('결제완료 에러 입니다', e);
      console.log('결제완료 에러 입니다', e.response);
    }
  };
  const onCheckIamPortPayment = async (imp_uid, body) => {
    // /payment/complete

    try {
      const res = await api.post('payment/complete', {imp_uid}, config);
      console.log('payment/complete res', res);
      onPayment(body, imp_uid);
    } catch (e) {
      console.log('payment/complete', e);
      console.log('payment/complete, e.res', e.response);
    }
  };

  const handleOnMessage = ({nativeEvent}) => {
    if (nativeEvent.data === 'navigationStateChange') {
      console.log(nativeEvent);
      setCanGoBack(nativeEvent.canGoBack);
    }
    //결제 관련
    else if (JSON?.parse(nativeEvent?.data)?.type === 'payment') {
      const {body, type} = JSON?.parse(nativeEvent?.data);
      // navigation.navigate('IamPortPayment', {
      //   paymentMethod,
      //   totalPrice,
      //   onComplete: (res) => {
      //     const { imp_success, imp_uid, merchant_uid, error_msg } = res;
      //     if (imp_success === 'true') {
      //       onCheckIamPortPayment(imp_uid);
      //       // onPayment('카드');
      //     } else {
      //       Alert.alert('결제에 실패하였습니다.', error_msg);
      //     }
      //   },
      // });
      navigation.navigate('IamPortPayment', {
        body,
        onComplete: res => {
          const {imp_success, imp_uid, merchant_uid, error_msg} = res;
          if (imp_success === 'true') {
            onCheckIamPortPayment(imp_uid, body);
          } else {
            Alert.alert('결제에 실패하였습니다.', error_msg);
          }
        },
      });
    }
  };
  const runFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({key : "value"}));
    window.user = ${JSON.stringify(auth?.user)};
})();`;

  return (
    <WebView
      source={{uri: route?.params?.item?.url}}
      // source={{uri: route?.params?.item?.url}}
      ref={ref}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onLoadStart={() => ref.current.injectJavaScript(INJECTED_CODE)}
      onNavigationStateChange={navState => {
        setCanGoBack(navState.canGoBack);
      }}
      onMessage={handleOnMessage}
      injectedJavaScriptBeforeContentLoaded={runFirst}
      onLoad={() => {
        ref.current.postMessage(JSON.stringify({auth}));
      }}
    />
  );
};
export default ShoppingWebView;
