import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootTabsScreenProps} from 'shared/types';

type Props = RootTabsScreenProps<'About'>;

export const AboutScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tickers')}
        style={styles.button}>
        <Text style={styles.buttonText}>Котировки</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#112233',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
