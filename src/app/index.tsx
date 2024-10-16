/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DriversScreen} from 'screen/Drivers';
import {DriverScreen} from 'screen/Driver';
import {RootStackParamList} from 'shared/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle: {backgroundColor: '#FFF'}}}>
        <Stack.Screen
          name="Drivers"
          options={{title: 'Главная'}}
          component={DriversScreen}
        />
        <Stack.Screen
          name="Driver"
          options={{title: 'Гонщик'}}
          component={DriverScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
