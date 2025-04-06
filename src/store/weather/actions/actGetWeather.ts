import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosErrorHandler } from "../../../utils/index";

const actGetWeather = createAsyncThunk(
  "weather/actGetWeather",
  async ({ city, locale }: { city: string, locale: string }, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    const API_KEY = import.meta.env.VITE_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},EG&lang=${locale}&appid=${API_KEY}`,
        {
          signal
        }
      );
      const temp = Math.floor(data.main.temp - 273.15);
      const feelsLike = Math.floor(data.main.feels_like - 273.15);
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      return { temp, feelsLike, description, icon: `https://openweathermap.org/img/wn/${icon}@2x.png` };

    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actGetWeather;