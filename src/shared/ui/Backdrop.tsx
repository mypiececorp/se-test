import {
  View,
  TouchableWithoutFeedback,
  ColorValue,
  StatusBar,
} from 'react-native';

export function Backdrop({
  onClose,
  backgroundColor,
}: {
  onClose?: () => void;
  backgroundColor?: ColorValue;
}) {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: backgroundColor ?? '#000',
          opacity: 0.8,
        }}>
        <StatusBar
          animated
          barStyle={'light-content'}
          backgroundColor={'#B7B6B9'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
