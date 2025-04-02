import { Box, Divider, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { TWeather } from "../types/weather.types";
import { useTranslation } from "react-i18next";
import Loading from "./Loading";

interface IWeatherProps {
  weather: TWeather;
  dateAndTime: string;
  city: string;
  loading: boolean;
}
const Weather = ({ weather, dateAndTime, city, loading }: IWeatherProps) => {
  const { temp, description, feelsLike, icon } = weather;
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        background: "rgb(28 52 91 / 36%)",
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
      }}
    >
      {/* city name and date */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "end",
          gap: 3,
          padding: "0 20px",
        }}
      >
        <Typography variant="h3">{city}</Typography>
        <Typography variant="h6"> {dateAndTime} </Typography>
      </Box>
      {/* ===city name and date=== */}
      <Divider
        variant="fullWidth"
        sx={{ borderColor: "white", margin: "5px 0px" }}
      />
      {/* Degree and Description */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        {/* Degree */}
        {loading ? (
          <Loading />
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h1" style={{ fontWeight: "100" }}>
                {temp}
                <sup style={{ fontSize: "3rem" }}>°</sup>
              </Typography>
              {icon && <img src={icon} alt="weatherStatus" />}
            </Box>
            <Typography variant="subtitle1">{description}</Typography>
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">
                {t("feelsLike")}: {feelsLike}
              </Typography>
            </Box>
          </Box>
        )}
        {/* ===Degree=== */}

        <Box>
          <CloudIcon
            sx={{ fontSize: { xs: "6rem", sm: "8rem", md: "12rem" } }}
          />
        </Box>
      </Box>
      {/* ===Main Description=== */}
    </Box>
  );
};
export default Weather;
