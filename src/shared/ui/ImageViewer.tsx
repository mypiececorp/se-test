import {Image, Modal, TouchableOpacity} from 'react-native';
import {Backdrop} from './Backdrop';
import {XClose} from 'shared/icons/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
        style={{position: 'absolute', top: top + 24, right: 24, zIndex: 2}}
        hitSlop={8}>
        <XClose size={24} color="#FFF" />
      </TouchableOpacity>
      <Image resizeMode="contain" src={image} style={{flex: 1}} />
    </Modal>
  );
};
