import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "util/globalStyle";
import theme from "util/theme";
import { AuthProvider } from "context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />
          <AuthProvider>
            <App />
          </AuthProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
