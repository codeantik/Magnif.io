import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Loginpage from "./Components/Loginpage/Loginpage";
import Register from "./Components/Registerpage/Register";

import "./style.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login"  title="Login" >
          <Loginpage />
        </Route>
        <Route exact path = "/register" title="Register">
          <Register />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}
