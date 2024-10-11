import {makeObservable, action, observable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {getPhotos, IMarket} from 'shared/api';

class GraphocStore {
  markets: IMarket[] = [];
  loading: boolean = false;

  constructor() {
    makeObservable(this, {
      markets: observable,
      loading: observable,
      start: action.bound,
    });
  }

  async start() {
    try {
      this.loading = true;
      const res = await getPhotos();
      runInAction(() => {
        this.markets = res;
      });
    } catch (e: any) {
      Alert.alert(e.message);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const photosStore = new GraphocStore();
export default photosStore;
