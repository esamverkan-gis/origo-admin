import React from "react";
import { render } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./redux/configureStore";
import GlobalStyle from './css/client.css';
import App from "./App";
import "./css/index.css";
import './css/normalize.css';
import './css/client.css.js';
//import './polyfills';

const initialState = {
  origoAdmin: {}
};

const store = configureStore(initialState);

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
    <GlobalStyle />
  </ReduxProvider>,
  document.getElementById("root")
);
