import {makeObservable, action, observable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {getPhotos, IPhoto} from 'shared/api';

const PER_PAGE = 20;

class PhotStore {
  photos: IPhoto[] = [];
  page: number = 1;
  query: string = 'ocean';
  loading: boolean = false;

  constructor() {
    makeObservable(this, {
      photos: observable,
      page: observable,
      query: observable,
      loading: observable,
      start: action.bound,
      add: action.bound,
      setQuery: action.bound,
    });
  }

  async start() {
    try {
      this.loading = true;
      const res = await getPhotos({
        params: {query: this.query, per_page: PER_PAGE, page: 1},
      });
      runInAction(() => {
        this.photos = res.photos;
        this.page = res.page;
      });
    } catch (e: any) {
      Alert.alert(e.message);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async add() {
    if (this.loading || this.page >= 10) {
      return;
    }
    try {
      this.loading = true;
      this.page++;
      const res = await getPhotos({
        params: {query: this.query, per_page: PER_PAGE, page: this.page},
      });
      runInAction(() => {
        this.photos.push(...res.photos);
        this.page = res.page;
      });
    } catch (e: any) {
      Alert.alert(e.message);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async setQuery(text: string) {
    this.query = text;
    this.start();
  }
}

const photosStore = new PhotStore();
export default photosStore;
