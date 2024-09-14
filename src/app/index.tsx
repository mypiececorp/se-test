/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ImageViewer} from 'shared/ui/ImageViewer';
import {Photos} from 'shared/ui/Photo';
import {RefreshControl} from 'shared/ui/RefreshControl';
import {getPhotos, IPhoto} from './entities/photos';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const App = () => {
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [photosData, setPhotosData] = useState<IPhoto[]>([]);
  const {top, bottom} = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      try {
        const res = await getPhotos({params: {query: 'ocean', per_page: 20}});
        console.log(JSON.stringify(res.photos, null, 4));
        setPhotosData(res.photos);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={{flex: 1, marginTop: top}}>
      <ImageViewer image={photoUrl} onClose={() => setPhotoUrl(undefined)} />
      <FlatList
        contentContainerStyle={[
          styles.container,
          {paddingBottom: bottom + 24, paddingTop: 24},
        ]}
        showsVerticalScrollIndicator={false}
        data={photosData}
        numColumns={2}
        columnWrapperStyle={{gap: 8}}
        keyExtractor={(_, index) => `${index}_photos`}
        renderItem={({item}) => (
          <Photos
            url={item.src.medium}
            onPress={() => setPhotoUrl(item.src.large)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 8,
  },
});
