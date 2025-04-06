// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Translations
import "./i18n.ts";
//Styles
import "./index.css";
//App
import App from "./App.tsx";
//Store
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
//Theme
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: { fontFamily: "IBM, Arial, sans-serif" },
});
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>

  // </StrictMode>
);
