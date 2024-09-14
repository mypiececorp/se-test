import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Backdrop} from './Backdrop';
import {XClose} from 'shared/icons/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLOR_MAIN} from 'shared/styles/colors';

export const ImageViewer = ({
  image,
  onClose,
}: {
  image?: string;
  onClose?: () => void;
}) => {
  const {top} = useSafeAreaInsets();

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
      <Image resizeMode="contain" src={image} style={styles.image} />
      <ActivityIndicator
        size={'large'}
        color={COLOR_MAIN}
        style={styles.loader}
      />
    </Modal>
  );
};

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
});
