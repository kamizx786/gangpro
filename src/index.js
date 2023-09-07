import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./styles/styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import Spinner from "./components/spinner/Spinner";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

Sentry.init({
  dsn: "https://385bae5d0bff4530be6336b4c10abd22@o395280.ingest.sentry.io/6702757",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// return <button onClick={methodDoesNotExist}>Break the world</button>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />

      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
