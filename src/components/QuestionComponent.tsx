import { useCallback, useEffect, useState } from "react";
import { http } from "../http";
import { Question } from "../app.interface";
import dayjs from "dayjs";
import AnswersComponent from "./AnswersComponent";
import { ShowdownConverter } from "../util";
import { useHistory } from "react-router-dom";
import "./QuestionComponent.scss";
import { ReactComponent as PencilIcon } from "bootstrap-icons/icons/pencil-fill.svg";

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
  const [question, setQuestion] = useState<Question>();
  const [showAnswers, setShowAnswers] = useState(false);

  const getQuestion = useCallback(async () => {
    const { data } = await http.get("/questions/" + id);
    setQuestion(data);
  }, [id]);

  useEffect(() => {
    getQuestion().then(() => {
      if (defaultShowAnswers) {
        setShowAnswers(true);
      }
    });
  }, [getQuestion]);

  if (!question) {
    return <div>Loading</div>;
  }

  return (
    <div className="QuestionComponent">
      <a
        className="title"
        onClick={() => {
          history.push(`/questions/view/${question.id}`);
        }}
      >
        {question.title}
      </a>
      <div className="meta">
        <a
          className="user"
          onClick={() => {
            history.push(`/users/${question.user?.email}`);
          }}
        >
          {question.user?.name}
        </a>
        <div className="updatedAt">{dayjs(question.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
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

      {showActions && (
        <div className="actions">
          <button
            className={`Button ${showAnswers ? "ButtonPrimary" : ""} mr-2`}
            onClick={() => {
              setShowAnswers((prevState) => {
                return !prevState;
              });
            }}
          >
            {question.answersCount} 个回答
          </button>
          <button className="Button mr-2">关注</button>
          <button className="Button display-inline-flex justify-content-center align-items-center">
            <PencilIcon className="mr-1" /> 写回答
          </button>
        </div>
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
