import React from "react";
import { Route, Switch } from "react-router-dom";
import { PageNotFound } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMain from './containers/AdminMain/AdminMain';
import About from './components/About/AboutPage'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/origoadmin" component={AdminMain} />
        <Route path="origoadmin/about" component={About} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
