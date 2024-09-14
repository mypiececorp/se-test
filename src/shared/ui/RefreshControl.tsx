import React from 'react';
import {RefreshControl as RNRefreshControl} from 'react-native';
import {RefreshControlProps} from 'react-native';
import {COLOR_MAIN} from 'shared/styles/colors';

export const RefreshControl = ({...rest}: RefreshControlProps) => {
  return (
    <RNRefreshControl
      {...rest}
      tintColor={COLOR_MAIN}
      colors={[COLOR_MAIN]}
      progressBackgroundColor={'#FFF'}
    />
  );
};
