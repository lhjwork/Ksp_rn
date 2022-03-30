import React, {useRef, useState} from 'react';

import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

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
      console.log(nativeEvent.data);
    }
  };
  const runFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <WebView
      source={{uri: route?.params?.item?.url}}
      ref={ref}
      onLoadStart={() => ref.current.injectJavaScript(INJECTED_CODE)}
      onNavigationStateChange={navState => {
        setCanGoBack(navState.canGoBack);
      }}
      onMessage={handleOnMessage}
      injectedJavaScriptBeforeContentLoaded={runFirst}
    />
  );
};
export default ShoppingWebView;
