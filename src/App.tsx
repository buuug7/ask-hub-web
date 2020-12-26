import { createContext, useState } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import LogoutComponent from "./components/LogoutComponent";
import QuestionsComponent from "./components/questions/Questions.component";
import QuestionComponent from "./components/questions/Question.component";
import UserProfileComponent from "./components/UserProfileComponent";
import TagsComponent from "./components/TagsComponent";
import FullScreenLoading from "./components/FullScreenLoading";

import { AppContextInterface, User } from "./app.interface";
import { getSessionUser } from "./util";
import QuestionCreateComponent from "./components/questions/QuestionCreate.component";
import NavbarComponent from "./components/NavbarComponent";
import UiIndex from "./pages/ui/Index";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import QuestionPage from "./pages/QuestionPage";

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
          <NavbarComponent />
          <div className="container" style={{ maxWidth: "1200px" }}>
            <Switch>
              <Route exact path="/" children={<HomePage />} />
              <Route exact path="/login" children={<LoginPage />} />
              <Route exact path="/logout" children={<LogoutComponent />} />
              <Route exact path="/questions" children={<QuestionsComponent />} />
              <Route exact path="/questions/create" children={<QuestionCreateComponent />} />
              <Route exact path="/questions/view/:id" children={<QuestionPage />} />
              <Route exact path="/users/profile/:email" children={<UserProfileComponent />} />
              <Route exact path="/tags" children={<TagsComponent />} />
              <Route exact path="/ui" children={<UiIndex />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
