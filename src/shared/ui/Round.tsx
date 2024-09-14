import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLOR_MAIN} from 'shared/styles/colors';

interface Props {
  text: string;
  onPress: (value: string) => void;
  active: boolean;
}

export const Round = ({text, onPress, active}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: active ? COLOR_MAIN : '#F6F7F8'},
      ]}
      onPress={() => onPress(text)}>
      <Text style={{fontSize: 16, color: active ? '#FFF' : '#000'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});
