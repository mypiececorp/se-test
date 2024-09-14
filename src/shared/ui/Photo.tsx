import {Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
const WIDTH_PHOTO = Dimensions.get('window').width / 2 - 20;

interface Props {
  url: string;
  onPress?: () => void;
}

export const Photos = ({onPress, url}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image src={url} style={styles.photo} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: WIDTH_PHOTO,
    height: WIDTH_PHOTO,
    borderRadius: 16,
    backgroundColor: '#778899',
  },
});
