import React from "react";
import ReactDOM from "react-dom";
import App from "main/App";
import Auth0ProviderWithHistory from "main/components/Auth/Auth0ProviderWithHistory";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
          <App />
        </ToastProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
