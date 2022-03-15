import "./wdyr"; // <--- first import
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProvider } from "context";
import "antd/dist/antd.css";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        <DevTools />
        <App />
      </AppProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
