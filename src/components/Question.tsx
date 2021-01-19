import { useCallback, useEffect, useState } from "react";
import { http } from "../http";
import { Question as QuestionType } from "../app.types";
import dayjs from "dayjs";
import Answers from "./Answers";
import { ShowdownConverter } from "../util";
import { ReactComponent as PencilIcon } from "bootstrap-icons/icons/pencil.svg";
import Skeleton from "./Skeleton";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import SnackbarSubject from "../snackbar-subject";
import AnswerCreateUpdate from "./AnswerCreateUpdate";
import "./Question.scss";
import QuestionCreateUpdate from "./QuestionCreateUpdate";

type QuestionComponentProps = {
  id: string;
  showTags?: boolean;
  showActions?: boolean;
  defaultShowAnswers?: boolean;
};

function Question({
  id,
  showTags = false,
  showActions = false,
  defaultShowAnswers = false,
}: QuestionComponentProps) {
  const user = useRecoilValue(userState);
  const [question, setQuestion] = useState<QuestionType>();
  const [showAnswers, setShowAnswers] = useState(false);
  const [showCreateAnswer, setShowCreateAnswer] = useState(false);
  const [showUpdateView, setShowUpdateView] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [questionUpdated, setQuestionUpdated] = useState(0);
  const [isWatchByRequestUser, setIsWatchByRequestUser] = useState(false);
  const [watchCount, setWatchCount] = useState(0);

  // getQuestion
  const getQuestion = useCallback(async () => {
    const { data } = await http.get("/questions/" + id);
    setQuestion(data);
  }, [id, questionUpdated]); /* eslint react-hooks/exhaustive-deps: off */

  useEffect(() => {
    getQuestion().then(() => {});
  }, [getQuestion]);
  // getQuestion end

  useEffect(() => {
    if (defaultShowAnswers) {
      setShowAnswers(true);
    }
  }, [defaultShowAnswers]);

  // checkCanUpdate
  const checkCanUpdate = useCallback(async () => {
    if (!user) {
      return;
    }

    const { data } = await http.get(`/questions/${id}/canUpdate`);
    setCanUpdate(data);
  }, [id, user]);

  useEffect(() => {
    checkCanUpdate().then(() => {});
  }, [checkCanUpdate]);
  // checkCanUpdate end

  const queryWatchByRequestUser = useCallback(async () => {
    const { data } = await http.get(`/questions/${id}/isWatchByUser`);
    setIsWatchByRequestUser(data);
  }, [id, watchCount]);

  useEffect(() => {
    if (!user) {
      return;
    }
    queryWatchByRequestUser().then(() => {});
  }, [queryWatchByRequestUser, user]);

  // watch related
  const getQuestionWatchCount = useCallback(async () => {
    const { data } = await http.get(`/questions/${id}/watchCount`);
    setWatchCount(data);
  }, [id]);

  useEffect(() => {
    getQuestionWatchCount().then((r) => {});
  }, [getQuestionWatchCount]);
  // end watch related

  if (!question) {
    return <Skeleton type="v2" />;
  }

  return (
    <div className="Question">
      {!showUpdateView && (
        <>
          <a href={`/questions/view/${question.id}`} className="title">
            {question.title}
          </a>
          <div className="meta">
            <a href={`/users/${question.user?.email}`} className="user">
              {question.user?.name}
            </a>
            <div className="updatedAt">
              {dayjs(question.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>

          {showTags && (
            <div className="tags">
              {question.tags.map((item) => (
                <span key={item.id} className="item">
                  {item.name}
                </span>
              ))}
            </div>
          )}

          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: ShowdownConverter.makeHtml(question.description),
            }}
          />
        </>
      )}

      {showUpdateView && (
        <div className="mb-2">
          <QuestionCreateUpdate
            type="update"
            question={question}
            callback={() => {
              // TODO
              setShowUpdateView(false);
              setQuestionUpdated((prevState) => ++prevState);
            }}
          />
        </div>
      )}

      {showActions && (
        <div className="actions">
          <button
            className={`btn ${showAnswers ? "primary" : ""} mr-2`}
            onClick={() => {
              setShowAnswers((prevState) => {
                return !prevState;
              });
            }}
          >
            {question.answersCount} 个回答
          </button>
          <button
            className={`btn ${isWatchByRequestUser ? "primary" : ""} mr-2`}
            onClick={async () => {
              if (!user) {
                SnackbarSubject.next("请先登陆！");
                return;
              }
              const { data } = await http.post(`/questions/${id}/toggleWatch`);
              setWatchCount(data);
            }}
          >
            {watchCount} 关注
          </button>
          <button
            className={
              showCreateAnswer
                ? "btn primary"
                : "btn display-inline-flex justify-content-center align-items-center"
            }
            onClick={() => {
              if (!user) {
                SnackbarSubject.next("请先登录");
              }
              setShowCreateAnswer((prevState) => !prevState);
            }}
          >
            写回答
          </button>
          {canUpdate && (
            <button
              className={
                showUpdateView
                  ? "btn ml-2 primary"
                  : "btn ml-2 display-inline-flex justify-content-center align-items-center"
              }
              onClick={() => {
                setShowUpdateView((prevState) => !prevState);
              }}
            >
              <PencilIcon className="mr-1" />
              {showUpdateView ? "关闭修改问题" : "修改问题"}
            </button>
          )}
        </div>
      )}

      {user && showCreateAnswer && (
        <AnswerCreateUpdate
          type="create"
          questionId={id}
          callback={() => {
            setShowCreateAnswer(false);
            setShowAnswers(false);
            setQuestionUpdated((prevState) => ++prevState);
          }}
        />
      )}

      {showAnswers && (
        <>
          <hr />
          <div className="Answers">
            <h4>Answers</h4>
            <Answers questionId={id} />
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
