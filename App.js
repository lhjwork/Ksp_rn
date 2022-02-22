import React from 'react';
import {View, StatusBar, useColorScheme, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigations/RootStack';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
// import 'react-native-gesture-handler';

const App = () => {
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
