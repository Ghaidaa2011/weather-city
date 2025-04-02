// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n.ts";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: { fontFamily: "IBM, Arial, sans-serif" },
});
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  // </StrictMode>
);
