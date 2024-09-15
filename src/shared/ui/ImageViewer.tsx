import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Backdrop} from './Backdrop';
import {XClose} from 'shared/icons/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLOR_MAIN} from 'shared/styles/colors';
import {PropsWithChildren, useState} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export const ImageViewer = ({
  image,
  onClose,
}: {
  image?: string;
  onClose?: () => void;
}) => {
  const {top} = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      transparent
      style={{flex: 1}}
      visible={!!image}
      animationType="slide">
      <Backdrop />
      <TouchableOpacity
        onPress={onClose}
        style={[styles.button, {top: top + 24}]}
        hitSlop={8}>
        <XClose size={24} color="#FFF" />
      </TouchableOpacity>
      <ZoomContainer>
        <Image
          onError={({nativeEvent}) =>
            Alert.alert(nativeEvent.error, undefined, [{onPress: onClose}])
          }
          onLoadEnd={() => setLoading(false)}
          onLoadStart={() => setLoading(true)}
          resizeMode="contain"
          src={image}
          style={styles.image}
        />
      </ZoomContainer>
      {loading && (
        <ActivityIndicator
          size={'large'}
          color={COLOR_MAIN}
          style={styles.loader}
        />
      )}
    </Modal>
  );
};

const {width, height} = Dimensions.get('screen');

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function ZoomContainer({children}: PropsWithChildren) {
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = clamp(
        startScale.value * event.scale,
        1,
        Math.min(width / 100, height / 100),
      );
    })
    .runOnJS(true);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX,
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })
    .runOnJS(true);

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(200)
    .onEnd(() => {
      scale.value = 1;
      translationX.value = 0;
      translationY.value = 0;
    });

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  const gesture = Gesture.Simultaneous(pinch, pan, tap);

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.box, boxAnimatedStyles]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 24,
    zIndex: 2,
  },
  image: {
    flex: 1,
    zIndex: 1,
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    right: '50%',
    bottom: '50%',
  },
  gestureContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    height: '100%',
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    position: 'absolute',
    left: '50%',
    top: '50%',
    pointerEvents: 'none',
  },
});
