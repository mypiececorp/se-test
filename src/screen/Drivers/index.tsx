import {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  fetchDrivers,
  setParams,
  setStatus,
  useAppDispatch,
  useAppSelector,
} from 'shared/store';
import {COLOR_MAIN} from 'shared/styles/colors';
import {RootStackScreenProps} from 'shared/types';
import {DriverRow} from 'shared/ui/DriverRow';
import {RefreshControl} from 'shared/ui/RefreshControl';

type Props = RootStackScreenProps<'Drivers'>;
const TITLES = ['Name', 'Nationality'];
const START_PARAMS = {limit: 20, offset: 0};

export const DriversScreen = ({navigation}: Props) => {
  const {bottom} = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const driversData = useAppSelector(state => state.main);
  const drivers = driversData.data ?? [];

  const start = useCallback(() => {
    dispatch(setParams(START_PARAMS));
    dispatch(fetchDrivers(START_PARAMS));
  }, [dispatch]);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<ActivityIndicator color={COLOR_MAIN} />}
      contentContainerStyle={[styles.container, {paddingBottom: bottom + 16}]}
      keyExtractor={(_, index) => `ticker_${index}`}
      stickyHeaderIndices={[0]}
      data={drivers}
      refreshControl={
        <RefreshControl
          refreshing={driversData.status === 'refetch'}
          onRefresh={() => {
            dispatch(setStatus('refetch'));
            start();
          }}
        />
      }
      onEndReached={() => {
        if (drivers && driversData.status !== 'loading') {
          const limit = driversData.params.limit + 20;
          const offset = driversData.params.offset + 20;
          dispatch(fetchDrivers({limit, offset}));
        }
      }}
      ListHeaderComponent={
        <View style={styles.hearder}>
          {TITLES.map(item => (
            <Text key={item} style={[styles.title]}>
              {item}
            </Text>
          ))}
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => (
        <DriverRow
          onPress={() => {
            navigation.navigate('Driver', {id: item.driverId});
          }}
          item={item}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  hearder: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: 'grey',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});
