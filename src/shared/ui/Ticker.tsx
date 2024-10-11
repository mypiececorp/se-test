import {useEffect} from 'react';
import {ColorValue, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IMarket} from 'shared/api';

const AnimationCell = ({
  value,
  color = '#000',
  width = 120,
}: {
  value: string;
  color?: ColorValue;
  width?: number;
}) => {
  const opacity = useSharedValue(1);
  const duration = 300;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(0, {duration}, () => {
      opacity.value = withTiming(1, {duration});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Animated.View style={[{width}, animatedStyle]}>
      <Text numberOfLines={1} style={{color}}>
        {value}
      </Text>
    </Animated.View>
  );
};

export const Ticker = ({item}: {item: IMarket}) => {
  const {displayName, markPrice, close, open, high} = item;
  const percent =
    ((parseFloat(close) - parseFloat(open)) / parseFloat(open)) * 100;

  return (
    <View style={{flexDirection: 'row'}}>
      <Text numberOfLines={1} style={{width: 120, fontWeight: '600'}}>
        {displayName}
      </Text>
      <AnimationCell value={markPrice} />
      <AnimationCell value={high} />
      <AnimationCell
        value={percent.toFixed(2) + '%'}
        color={percent >= 0 ? '#0ecb2d' : '#f34f4f'}
        width={72}
      />
    </View>
  );
};
