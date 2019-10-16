import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import TodoListContainer from "./TodoList/TodoListContainer";
import Login from "./LoginInformation/Login";
import Register from "./LoginInformation/Register";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={TodoListContainer} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/signin" component={Login} />
    </Switch>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
