import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  ColorValue,
} from 'react-native';
import {Backdrop} from './Backdrop';
import {XClose} from 'shared/icons/svg';
import {PropsWithChildren, ReactNode} from 'react';
import {COLOR_MAIN} from 'shared/styles/colors';

type ButtonProps = {
  onPress?: () => void;
  title: string;
  loading?: boolean;
  color?: ColorValue;
  backgroundColor?: ColorValue;
};

interface PopupProps {
  visible: boolean;
  icon?: ReactNode | null;
  text?: string;
  title?: string;
  closeButton?: boolean;
  buttons?: ButtonProps[];
  onClose?: () => void;
}

export const Popup = (props: PropsWithChildren<PopupProps>) => {
  const {
    icon = null,
    visible,
    onClose = () => {},
    title,
    closeButton,
    text: description,
    buttons,
    children,
  } = props;

  return (
    <Modal
      style={{flex: 1}}
      visible={visible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Backdrop onClose={onClose} />
        <View style={[stylesModal.popup, {backgroundColor: '#FFF'}]}>
          {closeButton && (
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <TouchableOpacity style={{padding: 16}} onPress={onClose}>
                <XClose />
              </TouchableOpacity>
            </View>
          )}
          <View style={[stylesModal.view, {paddingTop: closeButton ? 4 : 20}]}>
            {icon ? <View style={{marginBottom: 16}}>{icon}</View> : null}
            {title && (
              <Text style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
            )}
            {description && (
              <Text style={[stylesModal.text]}>{description}</Text>
            )}
            {children}
            {buttons ? (
              <View style={{marginTop: 32, gap: 12, width: '100%'}}>
                {buttons?.map(button => (
                  <Button
                    key={button.title}
                    title={button.title}
                    onPress={button.onPress}
                    loading={button.loading}
                    color={button.color}
                    backgroundColor={button.backgroundColor}
                  />
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const Button = (props: ButtonProps) => {
  const {
    loading,
    color = 'mono700',
    onPress,
    title: rightButtonText,
    backgroundColor = 'mono100',
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[stylesModal.button, {backgroundColor}]}>
      {loading ? (
        <ActivityIndicator color={COLOR_MAIN} size={'small'} />
      ) : (
        <Text style={{fontSize: 16, color}}>{rightButtonText}</Text>
      )}
    </TouchableOpacity>
  );
};

const stylesModal = StyleSheet.create({
  popup: {
    marginHorizontal: 16,
    alignSelf: 'stretch',
    borderRadius: 20,
  },
  view: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  button: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
  },
});
