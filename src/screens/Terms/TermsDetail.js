import React from 'react';
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
      injectedJavaScriptBeforeContentLoaded={runFirst}

      // source={{uri: route?.params?.item?.url}}
      // // source={{uri: route?.params?.item?.url}}
      // ref={ref}
      // injectedJavaScript={INJECTED_JAVASCRIPT}
      // onLoadStart={() => ref.current.injectJavaScript(INJECTED_CODE)}
      // onNavigationStateChange={navState => {
      //     setCanGoBack(navState.canGoBack);
      // }}
      // onMessage={handleOnMessage}
      // injectedJavaScriptBeforeContentLoaded={runFirst}
      // onLoad={() => {
      //     ref.current.postMessage(JSON.stringify({auth}));
      // }}
    />
  );
};

export default TermsDetail;
