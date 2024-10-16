import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {client, IDriver, LIMIT} from 'shared/api';

export const fetchDrivers = createAsyncThunk(
  'data/fetchDrivres',
  async (params: {limit: number; offset: number}) => {
    const response = await client.get('drivers/', {
      params,
    });
    const data = await response.data.MRData;
    const drivers: IDriver[] = data.DriverTable.Drivers;
    return {data: drivers, limit: +data.limit, offset: +data.offset};
  },
);

interface MainStateInterface {
  data: IDriver[];
  params: {limit: number; offset: number};
  status: 'loading' | 'idle' | 'failed' | 'refetch';
}

const initialState: MainStateInterface = {
  data: [],
  params: {limit: LIMIT, offset: 0},
  status: 'idle',
};

export const mainSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IDriver[]>) => {
      state.data = action.payload;
    },
    setParams: (
      state,
      action: PayloadAction<{limit: number; offset: number}>,
    ) => {
      state.params = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<'loading' | 'idle' | 'failed' | 'refetch'>,
    ) => {
      state.status = action.payload;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(fetchDrivers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        if (action.meta.arg.offset > 0) {
          const newData = [...state.data, ...action.payload.data];
          state.data = newData;
        } else {
          state.data = action.payload.data;
        }
        state.params = {
          limit: action.payload.limit,
          offset: action.payload.offset,
        };
        state.status = 'idle';
      })
      .addCase(fetchDrivers.rejected, state => {
        state.status = 'failed';
        Alert.alert('Error', 'Что-то пошло не так!');
      });
  },
});

export const {setData, setParams, setStatus} = mainSlice.actions;

export default mainSlice.reducer;
