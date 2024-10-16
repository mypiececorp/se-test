import {useEffect} from 'react';
import {
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IDriver} from 'shared/api';

const AnimationCell = ({
  value,
  color = '#000',
  style,
}: {
  value: string;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
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
    <Animated.View style={[{flex: 1}, animatedStyle]}>
      <Text numberOfLines={1} style={[{color}, style]}>
        {value}
      </Text>
    </Animated.View>
  );
};

export const DriverRow = ({
  item,
  onPress,
}: {
  item: IDriver;
  onPress?: () => void;
}) => {
  const {familyName, givenName, nationality} = item;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <AnimationCell
        style={{fontWeight: '600'}}
        value={`${familyName} ${givenName}`}
      />
      <AnimationCell value={nationality ?? ''} />
    </TouchableOpacity>
  );
};
