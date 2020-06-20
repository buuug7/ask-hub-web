import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import QuestionsComponent from "./components/questions/Questions.component";
import QuestionComponent from "./components/questions/Question.component";
import UserProfileComponent from "./components/users/Profile.component";
import TagsComponent from "./components/tags/Tags.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Link to={"/questions"} className="mr-2">
            questions
          </Link>
          <Link to={"/tags"} className="mr-2">
            tags
          </Link>
          <Link to={"/login"} className="mr-2">
            login
          </Link>
          <Link to={"/logout"}>logout</Link>
        </div>
        <Switch>
          <Route exact path="/login" children={<Login />} />
          <Route exact path="/logout" children={<Logout />} />
          <Route exact path="/questions" children={<QuestionsComponent />} />
          <Route exact path="/questions/:id" children={<QuestionComponent />} />
          <Route exact path="/users/profile/:email" children={<UserProfileComponent />} />
          <Route exact path="/tags" children={<TagsComponent />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
