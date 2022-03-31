import React, {useRef, useState, createRef} from 'react';

import {BackHandler, Button, Text, TouchableOpacity, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

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

const ShoppingWebView = ({route}) => {
  const auth = useSelector(state => state.auth);

  const ref = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

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
  const handleOnMessage = ({nativeEvent}) => {
    if (nativeEvent.data === 'navigationStateChange') {
      console.log(nativeEvent);
      setCanGoBack(nativeEvent.canGoBack);
    } else {
      console.log('nativeEvent', nativeEvent);
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
