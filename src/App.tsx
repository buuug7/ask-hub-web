import React, { createContext, useState } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import QuestionsComponent from "./components/questions/Questions.component";
import QuestionComponent from "./components/questions/Question.component";
import UserProfileComponent from "./components/users/Profile.component";
import TagsComponent from "./components/tags/Tags.component";
import FullScreenLoading from "./components/Loading/FullScreenLoading";
import { AppContextInterface, User } from "./app.interface";
import { getSessionUser } from "./util";
import QuestionCreateComponent from "./components/questions/QuestionCreate.component";
import Navbar from "./components/Navbar/Navbar";

export const AppContext = createContext<AppContextInterface>({
  user: null,
  loading: false,
  updateUser: () => {},
  updateLoading: () => {},
});

function App() {
  const defaultUser = getSessionUser();
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState<boolean>(false);

  const contextValue = {
    user,
    loading,
    updateUser: (user: User) => setUser(user),
    updateLoading: (loading: boolean) => setLoading(loading),
  };

  /**
   * 超时自动关闭 loading
   */
  setTimeout(() => {
    setLoading(false);
  }, 30000);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        {loading && <FullScreenLoading />}
        <BrowserRouter>
          <Navbar />
          <Switch>
            <div className="container" style={{ maxWidth: "1200px" }}>
              <Route exact path="/login" children={<Login />} />
              <Route exact path="/logout" children={<Logout />} />
              <Route exact path="/questions" children={<QuestionsComponent />} />
              <Route exact path="/questions/create" children={<QuestionCreateComponent />} />
              <Route exact path="/questions/:id" children={<QuestionComponent />} />
              <Route exact path="/users/profile/:email" children={<UserProfileComponent />} />
              <Route exact path="/tags" children={<TagsComponent />} />
            </div>
          </Switch>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
