import React, {useRef, useState, useEffect} from 'react';
import {View, ScrollView, BackHandler} from 'react-native';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabel14, BoldLabelTitle} from '../../components/Labels';
import {WebView} from 'react-native-webview';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const TermsDetail = ({navigation, route}) => {
  const {title, content, url} = route?.params;
  const auth = useSelector(state => state.auth);
  const [canGoBack, setCanGoBack] = useState(false);
  const [urls, setUrls] = useState('');
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setUrls(url);
      setTimeout(() => {
        setIsLoading(true);
      }, 300);
    }, [navigation, url]),
  );
  // useEffect(() => {
  //   console.log(url);
  //   setUrls(url);
  // }, [route, navigation, url]);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setIsLoading(false);
        setUrls('');
        if (ref.current && canGoBack) {
          // ref.current.goBack();
          return false;
          // navigation.goBack();
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [canGoBack, route?.params]),
  );
  const runFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  const INJECTED_CODE = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage('navigationStateChange');
      return res;
    }
  }
  window.isNativeApp = true;
  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage('navigationStateChange');
  });
})();

true;
`;
  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({key : "value"}));
    window.isNativeApp = true;
})();`;

  const handleOnMessage = ({nativeEvent}) => {
    if (nativeEvent.data === 'navigationStateChange') {
      setCanGoBack(nativeEvent.canGoBack);
    }
  };

  return (
    isLoading && (
      <WebView
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={false}
        originWhitelist={['*']}
        source={{uri: urls}}
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
    )
  );
};

export default TermsDetail;
