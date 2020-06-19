import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Questions from "./components/questions/Questions";
import Question from "./components/questions/Question";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Link to={"/questions"} className="mr-2">
            questions
          </Link>
          <Link to={"/login"} className="mr-2">
            login
          </Link>
          <Link to={"/logout"}>logout</Link>
        </div>
        <Switch>
          <Route exact path="/login" children={<Login />} />
          <Route exact path="/logout" children={<Logout />} />
          <Route exact path="/questions" children={<Questions />} />
          <Route exact path="/questions/:id" children={<Question />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
