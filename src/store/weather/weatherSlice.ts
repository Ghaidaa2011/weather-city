import { createSlice } from '@reduxjs/toolkit'
import actGetWeather from './actions/actGetWeather';
import { TWeather } from '../../types/weather.types';
import { TLoading } from '../../types/shared.types';
import { isString } from '../../types/guards';

export interface IWeatherState {
  weather: TWeather
  loading: TLoading;
  error: string | null;
}
const initialState: IWeatherState = {
  weather: {
    temp: 0,
    description: "",
    feelsLike: 0,
    icon: "",
  },
  loading: "idle",
  error: null,
}
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetWeather.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWeather.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.weather = action.payload;
    });
    builder.addCase(actGetWeather.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
})
export { actGetWeather }
export default weatherSlice.reducer

