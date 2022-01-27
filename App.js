import React from 'react';
import {View, StatusBar, useColorScheme} from 'react-native';
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
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
