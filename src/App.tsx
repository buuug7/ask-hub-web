import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogoutComponent from "./components/LogoutComponent";
import QuestionsComponent from "./components/QuestionsComponent";
import UserProfileComponent from "./components/UserProfileComponent";
import TagsComponent from "./components/TagsComponent";
import FullScreenLoading from "./components/FullScreenLoading";
import QuestionCreateComponent from "./components/QuestionCreateComponent";
import NavbarComponent from "./components/NavbarComponent";
import UiIndex from "./pages/ui/Index";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";

import "./App.scss";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loadingState } from "./app.state";

function LoadingGlobal() {
  const loading = useRecoilValue(loadingState);

  if (!loading) {
    return null;
  }

  return <FullScreenLoading />;
}

function AppBody() {
  return (
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
  );
}

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <LoadingGlobal />
          <NavbarComponent />
          <AppBody />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
