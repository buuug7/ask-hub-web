import { useCallback, useEffect, useState } from "react";
import { http } from "../http";
import { Question } from "../app.types";
import dayjs from "dayjs";
import AnswersComponent from "./AnswersComponent";
import { ShowdownConverter } from "../util";
import { useHistory } from "react-router-dom";
import { ReactComponent as PencilIcon } from "bootstrap-icons/icons/pencil.svg";
import SkeletonComponent from "./SkeletonComponent";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import SnackbarSubject from "../snackbar-subject";
import AnswerCreateOrUpdateComponent from "./AnswerCreateOrUpdateComponent";
import "./QuestionComponent.scss";
import QuestionCreateOrUpdateComponent from "./QuestionCreateOrUpdateComponent";

type QuestionComponentProps = {
  id: string;
  showTags?: boolean;
  showActions?: boolean;
  defaultShowAnswers?: boolean;
};

function QuestionComponent({
  id,
  showTags = false,
  showActions = false,
  defaultShowAnswers = false,
}: QuestionComponentProps) {
  const history = useHistory();
  const user = useRecoilValue(userState);
  const [question, setQuestion] = useState<Question>();
  const [showAnswers, setShowAnswers] = useState(false);
  const [showCreateAnswer, setShowCreateAnswer] = useState(false);
  const [showUpdateView, setShowUpdateView] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [questionUpdated, setQuestionUpdated] = useState(0);

  const getQuestion = useCallback(async () => {
    const { data } = await http.get("/questions/" + id);
    setQuestion(data);
  }, [id, questionUpdated]);

  const checkCanUpdate = useCallback(async () => {
    const { data } = await http.get(`/questions/${id}/canUpdate`);
    setCanUpdate(data);
  }, [id]);

  useEffect(() => {
    getQuestion().then(() => {
      if (defaultShowAnswers) {
        setShowAnswers(true);
      }
    });

    checkCanUpdate().then(() => {});
  }, [getQuestion, defaultShowAnswers]);

  if (!question) {
    return <SkeletonComponent type="v2" />;
  }

  return (
    <div className="QuestionComponent">
      {!showUpdateView && (
        <>
          <a
            href="#!"
            className="title"
            onClick={() => {
              history.push(`/questions/view/${question.id}`);
            }}
          >
            {question.title}
          </a>
          <div className="meta">
            <a
              href="#!"
              className="user"
              onClick={() => {
                history.push(`/users/${question.user?.email}`);
              }}
            >
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
          <QuestionCreateOrUpdateComponent
            createOrUpdate="update"
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
          <button className="btn mr-2">关注</button>
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
        <AnswerCreateOrUpdateComponent
          createOrUpdate="create"
          questionId={id}
          cb={() => {
            setShowCreateAnswer(false);
            setShowAnswers(false);
          }}
        />
      )}

      {showAnswers && (
        <>
          <hr />
          <div className="Answers">
            <h4>Answers</h4>
            <AnswersComponent questionId={id} />
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionComponent;
