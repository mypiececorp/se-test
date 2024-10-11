import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  About: undefined;
  Tickers: undefined;
};

export type RootTabsScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;
