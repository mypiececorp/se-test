import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Drivers: undefined;
  Driver: {id: string};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
