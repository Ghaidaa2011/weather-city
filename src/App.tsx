import { Box, Button, Container } from "@mui/material";
//Components
import Weather from "./components/Weather";
import ComboBox from "./components/ComboBox";
//Custom Hooks
import useLanguage from "./hooks/useLanguage";
import useAppWeather from "./hooks/useAppWeather";

function App() {
  const { changeLanguageHandler, locale } = useLanguage();
  const { dateAndTime, loading, selectCityHanlder, translatedCity, weather } =
    useAppWeather({ locale });
  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: { xs: "20%", sm: "15%", md: "5%" },
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
    >
      <ComboBox selectCityHanlder={selectCityHanlder} />
      <Box sx={{ width: "100%" }}>
        <Weather
          weather={weather}
          dateAndTime={dateAndTime}
          city={translatedCity}
          loading={loading}
        />
        <Box sx={{ width: "100%", textAlign: "end" }}>
          <Button
            onClick={changeLanguageHandler}
            variant="text"
            color="inherit"
            sx={{ marginTop: "10px" }}
          >
            {locale == "en" ? "Arabic" : "إنجليزي"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
