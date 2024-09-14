/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ImageViewer} from 'shared/ui/ImageViewer';
import {Photos} from 'shared/ui/Photo';
import {RefreshControl} from 'shared/ui/RefreshControl';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import photosStore from 'shared/store';
import {observer} from 'mobx-react-lite';
import {COLOR_MAIN} from 'shared/styles/colors';
import {Round} from 'shared/ui/Round';

const QUERY_DATA = ['ocean', 'flower', 'nature', 'travel', 'summer', 'winter'];

export const App = observer(() => {
  const [photoUrl, setPhotoUrl] = useState<string>();
  const {top, bottom} = useSafeAreaInsets();

  useEffect(() => {
    photosStore.start();
  }, []);

  return (
    <View style={[styles.view, {marginTop: top}]}>
      <ImageViewer image={photoUrl} onClose={() => setPhotoUrl(undefined)} />
      <FlatList
        contentContainerStyle={[
          styles.container,
          {paddingBottom: bottom, paddingTop: 24},
        ]}
        showsVerticalScrollIndicator={false}
        data={photosStore.photos}
        numColumns={2}
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              marginBottom: 8,
              gap: 8,
            }}>
            {QUERY_DATA.map(item => (
              <Round
                active={item === photosStore.query}
                text={item}
                onPress={photosStore.setQuery}
              />
            ))}
          </ScrollView>
        }
        columnWrapperStyle={{gap: 8, paddingHorizontal: 16}}
        keyExtractor={(_, index) => `${index}_photos`}
        onEndReached={() => {
          photosStore.add();
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              photosStore.start();
            }}
          />
        }
        ListFooterComponent={
          <View style={styles.loader}>
            {photosStore.loading ? (
              <ActivityIndicator size={'small'} color={COLOR_MAIN} />
            ) : null}
          </View>
        }
        renderItem={({item}) => (
          <Photos
            url={item.src.medium}
            onPress={() => setPhotoUrl(item.src.large)}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    gap: 8,
  },
  loader: {
    height: 24,
  },
});
