//React
import { useEffect, useState } from "react";
//Types
import { TWeather } from "../types/weather.types";
//Extrernal Libraries
import axios from "axios";
import moment from "moment/min/moment-with-locales";
//data
import { governments } from "../data/governments";
const useAppWeather = ({ locale }: { locale: string }) => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<TWeather>({
    temp: 0,
    description: "",
    feelsLike: 0,
    icon: "",
  });
  const [city, setCity] = useState("Cairo");
  const selectCityHanlder = (city: string) => {
    setCity(city);
  };
  const [dateAndTime, setDateAndTime] = useState("");
  useEffect(() => {
    setDateAndTime(moment().format("dddd | D MMMM YYYY"));
    const controller = new AbortController();
    const API_KEY = import.meta.env.VITE_API_KEY;
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},EG&lang=${locale}&appid=${API_KEY}`,
          {
            signal: controller.signal,
          }
        );
        const temp = Math.floor(response.data.main.temp - 273.15);
        const feelsLike = Math.floor(response.data.main.feels_like - 273.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;

        setWeather({
          temp,
          feelsLike,
          description,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getWeatherData();
    return () => {
      controller.abort();
    };
  }, [locale, city]);
  const translatedCity =
    governments.find((gov) => gov.en === city)?.[
      locale === "ar" ? "ar" : "en"
    ] || city;
  return { translatedCity, loading, weather, dateAndTime, selectCityHanlder };
};
export default useAppWeather;
