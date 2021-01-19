import { BrowserRouter, Switch, Route } from "react-router-dom";
import Questions from "./components/Questions";
import Tags from "./components/Tags";
import FullScreenLoading from "./components/FullScreenLoading/Index";
import Navbar from "./components/Navbar";
import UiIndex from "./pages/ui/Index";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import SnackbarWrap from "./components/Snackbar";

import "./App.scss";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loadingState } from "./app.state";
import QuestionCreatePage from "./pages/QuestionCreatePage";
import UserProfilePage from "./pages/UserProfilePage";
import MyRelatedIndex from "./pages/my-related/Index";

function FullScreenLoadingWrap() {
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
        <Route exact path="/questions" children={<Questions />} />
        <Route exact path="/questions/create" children={<QuestionCreatePage />} />
        <Route exact path="/questions/view/:id" children={<QuestionPage />} />
        <Route exact path="/tags" children={<Tags />} />
        <Route exact path="/users/:email" children={<UserProfilePage />} />
        <Route exact path="/my-related" children={<MyRelatedIndex />} />
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
          <Navbar />
          <AppBody />
          <SnackbarWrap />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
