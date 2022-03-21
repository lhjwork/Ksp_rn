import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  useColorScheme,
  SafeAreaView,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigations/RootStack';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import BackHandler from 'react-native/Libraries/Utilities/BackHandler';
// import 'react-native-gesture-handler';

const App = () => {
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('알림', '어플리케이션을 종료하시겠습니까?', [
  //       {
  //         text: '취소',
  //         onPress: () => null,
  //       },
  //       {text: '종료', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };
  //
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );
  //
  //   return () => backHandler.remove();
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar translucent={false} hidden={true} />
          <NavigationContainer>
            {/* <StatusBar showHideTransition="fade" /> */}
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
