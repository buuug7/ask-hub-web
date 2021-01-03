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
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { loadingState, snackbarTextState } from "./app.state";
import Snackbar from "./components/Snackbar";
import { useEffect, useState } from "react";

function FullScreenLoadingWrap() {
  const loading = useRecoilValue(loadingState);

  if (!loading) {
    return null;
  }

  return <FullScreenLoading />;
}

function SnackbarWrap() {
  const [text, setText] = useRecoilState(snackbarTextState);

  useEffect(() => {
    if (!text) {
      return;
    }

    const snackbarDom = document.querySelector(".snackbar");
    snackbarDom?.classList.add("show");
    setTimeout(() => {
      if (snackbarDom) {
        snackbarDom.classList.remove("show");
      }
    }, 3000);
  });

  return <Snackbar text={text} />;
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
          <FullScreenLoadingWrap />
          <NavbarComponent />
          <AppBody />
          <SnackbarWrap />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
