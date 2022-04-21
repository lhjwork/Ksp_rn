import React, {useRef, useState, useEffect} from 'react';
import {View, ScrollView, BackHandler} from 'react-native';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabel14, BoldLabelTitle} from '../../components/Labels';
import {WebView} from 'react-native-webview';
import {CommonActions, useFocusEffect} from '@react-navigation/native';

const TermsDetail = ({navigation, route}) => {
  const {title, content, url} = route?.params;
  const [canGoBack, setCanGoBack] = useState(false);

  const ref = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (ref.current && canGoBack) {
          // ref.current.goBack();
          if (route?.params?.notLogin) {
            navigation.navigate('SignUpAgree');
          } else {
            navigation.navigate('ShoppingMall');
          }
          // navigation.goBack();
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
      console.log(nativeEvent);
      setCanGoBack(nativeEvent.canGoBack);
    }
  };
  return (
    // <ScrollView style={{backgroundColor: '#fff'}}>
    //   <HeaderCompnent
    //     onPressLeftBtn={() => navigation.goBack()}
    //     antStyle={{color: '#000'}}
    //     rightView={false}
    //   />
    //   <View style={{marginHorizontal: 24}}>
    //     <BoldLabelTitle
    //       text={title}
    //       style={{marginTop: 27.5, marginBottom: 23}}
    //     />
    //     <BoldLabel14 text={content} style={{color: '#555'}} />
    //   </View>
    // </ScrollView>
    <WebView
      includeDiskFiles={false}
      originWhitelist={['*']}
      setSupportMultipleWindows={true}
      // startInLoadingState={true}
      cacheEnabled={false}
      allowsInlineMediaPlayback
      javaScriptEnabled
      scalesPageToFit
      mediaPlaybackRequiresUserAction={false}
      javaScriptEnabledAndroid
      useWebkit
      incognito
      source={{uri: url}}
      ref={ref}
      onNavigationStateChange={navState => {
        setCanGoBack(navState.canGoBack);
      }}
      onMessage={handleOnMessage}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onLoadStart={() => ref.current.injectJavaScript(INJECTED_CODE)}
      injectedJavaScriptBeforeContentLoaded={runFirst}
      onShouldStartLoadWithRequest={event => {
        return action(event.url);
      }}
    />
  );
};

export default TermsDetail;
