import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider } from "react-redux";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { logger } from "./middlewares";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById("root"));

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeAlt(applyMiddleware(logger, thunk));

const store = createStore(rootReducer, composedEnhancers);

root.render(
  <MantineProvider
    theme={{
      fontFamily: "Open Sans",
      black: "#313F42",
      colors: {
        blue: [
          "#f9e6ff",
          "#e2bafa",
          "#cc8df2",
          "#b661eb",
          "#a134e5",
          "#881acb",
          "#6a149f",
          "#4c0d73",
          "#2e0747",
          "#12011d",
        ],
      },
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <NotificationsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NotificationsProvider>
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
