// Global
import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
// Store
import { store, history } from "./redux/store";
// Components
import Home from "./pages/Home";
// Stylesheet
import "@clayui/css/lib/css/atlas.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
