import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from 'recoil';
import theme from "./lib/theme";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./globalStyle";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        {/* @ts-ignore */}
        <ThemeProvider theme={theme}>
          {/* @ts-ignore */}
          <GlobalStyle />
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
