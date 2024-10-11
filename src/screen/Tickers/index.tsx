import {useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import photosStore from 'shared/store';
import {COLOR_MAIN} from 'shared/styles/colors';
import {RootTabsScreenProps} from 'shared/types';
import {Ticker} from 'shared/ui/Ticker';

type Props = RootTabsScreenProps<'Tickers'>;

const TITLES = ['Name', 'Last', 'High', 'Percent'];

export const TickersScreen = observer(({}: Props) => {
  useFocusEffect(() => {
    const intervalId = setInterval(() => photosStore.start(), 5000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <ScrollView horizontal>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ActivityIndicator color={COLOR_MAIN} />}
        contentContainerStyle={styles.container}
        keyExtractor={(_, index) => `ticker_${index}`}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={styles.hearder}>
            {TITLES.map(item => (
              <Text
                style={[styles.title, {width: item === 'Percent' ? 72 : 120}]}>
                {item}
              </Text>
            ))}
          </View>
        }
        data={photosStore.markets}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => <Ticker item={item} />}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  hearder: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 4,
  },
  title: {
    width: 120,
    fontWeight: '600',
  },
});
