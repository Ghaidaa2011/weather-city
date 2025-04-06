import { useEffect, useState } from "react";
//Extrernal Libraries
import moment from "moment/min/moment-with-locales";
//data
import { governments } from "../data/governments";
import { actGetWeather } from "../store/weather/weatherSlice";
//Store
import { useAppDispatch, useAppSelector } from "../store/hooks";
const useAppWeather = ({ locale }: { locale: string }) => {
  const { weather, loading } = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  const [city, setCity] = useState("Cairo");
  const selectCityHanlder = (city: string) => {
    setCity(city);
  };
  const [dateAndTime, setDateAndTime] = useState("");
  useEffect(() => {
    setDateAndTime(moment().format("dddd | D MMMM YYYY"));

    const promise = dispatch(actGetWeather({ city, locale }));
    return () => {
      promise.abort();
    };
  }, [locale, city, dispatch]);

  const translatedCity =
    governments.find((gov) => gov.en === city)?.[
      locale === "ar" ? "ar" : "en"
    ] || city;

  return { translatedCity, loading, weather, dateAndTime, selectCityHanlder };
};
export default useAppWeather;
