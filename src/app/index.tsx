/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AboutScreen} from 'screen/About';
import {TickersScreen} from 'screen/Tickers';
import {RootTabParamList} from 'shared/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator sceneContainerStyle={{backgroundColor: '#FFF'}}>
        <Tab.Screen
          name="About"
          options={{title: 'О приложении'}}
          component={AboutScreen}
        />
        <Tab.Screen
          name="Tickers"
          options={{title: 'Котировки', lazy: true}}
          component={TickersScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
