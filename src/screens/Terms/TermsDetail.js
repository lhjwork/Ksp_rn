import React, {useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabel14, BoldLabelTitle} from '../../components/Labels';
import {WebView} from 'react-native-webview';

const TermsDetail = ({navigation, route}) => {
  const {title, content, url} = route?.params;
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
  const ref = useRef(null);
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
      source={{uri: url}}
      ref={ref}
      injectedJavaScriptBeforeContentLoaded={runFirst}
      injectedJavaScript={INJECTED_JAVASCRIPT}
    />
  );
};

export default TermsDetail;
