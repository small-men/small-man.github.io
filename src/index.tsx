import "./wdyr"; // <--- first import
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProvider } from "context";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <DevTools />
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
