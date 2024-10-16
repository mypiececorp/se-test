import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import mainSlice, {
  fetchDrivers,
  setData,
  setParams,
  setStatus,
} from './slices/mainSlice';

export {fetchDrivers, setData, setParams, setStatus};

export const reducersObj = {
  main: mainSlice,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: Object.keys(reducersObj),
};
const rootReducer = combineReducers(reducersObj);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({serializableCheck: false}),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export {store, persistor, useAppDispatch, useAppSelector};
