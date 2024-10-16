/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './src/app';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {persistor, store} from 'shared/store';
import {PersistGate} from 'redux-persist/integration/react';

const Wrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Wrapper);
