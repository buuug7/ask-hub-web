import { createContext, useState } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Logout from "./components/logout/Logout";
import QuestionsComponent from "./components/questions/Questions.component";
import QuestionComponent from "./components/questions/Question.component";
import UserProfileComponent from "./components/users/Profile.component";
import TagsComponent from "./components/tags/Tags.component";
import FullScreenLoading from "./components/loading/FullScreenLoading";

import { AppContextInterface, User } from "./app.interface";
import { getSessionUser } from "./util";
import QuestionCreateComponent from "./components/questions/QuestionCreate.component";
import Navbar from "./components/navbar/Navbar";
import UiIndex from "./pages/ui/Index";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/home/Home";

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
          <div className="container" style={{ maxWidth: "1200px" }}>
            <Switch>
              <Route exact path="/" children={<Home />} />
              <Route exact path="/login" children={<LoginPage />} />
              <Route exact path="/logout" children={<Logout />} />
              <Route exact path="/questions" children={<QuestionsComponent />} />
              <Route exact path="/questions/create" children={<QuestionCreateComponent />} />
              <Route exact path="/questions/view/:id" children={<QuestionComponent />} />
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
